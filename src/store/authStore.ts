import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';
import { consoleLogger } from '@/utils/logger';
import { loginUser, registerUser, saveUserTokens, getUserDetails, logoutUser, verifyUserSession } from '@/apis/auth';

export type User = {
  id: string;
  _id: string;
  email: string;
  profileImageUrl: string;
  name: string; // Changed from nickName to name
  role: string;
  language: string;
  theme:string;
  subscriptions: string[];
};

// Define the props interface
interface AuthProviderProps {
  children: ReactNode;
}

export type AuthContextType = {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  register: (formData: any) => Promise<void>; // Renamed and updated signature
  getUser: (accessToken: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export interface AuthStoreState {
  user: User | null;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
}

export interface AuthStoreActions {
  setUser: (user: User | null) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}


const initialState: AuthStoreState = {
  user: null,
  accessToken: '',
  refreshToken: '',
  isLoading: true,
};


export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user) => set((state) => ({ ...state, user })),
      setAccessToken: (accessToken) => set((state) => ({ ...state, accessToken })),
      setRefreshToken: (refreshToken) => set((state) => ({ ...state, refreshToken })),
      setIsLoading: (isLoading) => set({ isLoading }),
      reset: () => set(initialState),
    }),
    {
      name: 'auth-store',
      storage: {
        getItem: (name: string) => {
          // Only use cookies for persistence
          const value = Cookies.get(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: any) => {
          Cookies.set(name, JSON.stringify(value), { expires: 30 });
        },
        removeItem: (name: string) => {
          Cookies.remove(name);
        },
      },
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoading: state.isLoading,
      }),
      version: 1,
    }
  )
);

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    user,
    accessToken,
    refreshToken,
    isLoading,
    setUser,
    setAccessToken,
    setRefreshToken,
    setIsLoading,
    reset,
  } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (refreshToken) return;
        const token = Cookies.get('refresh_token') || '';
        if (!token) {
          setIsLoading(false);
          return;
        }
        const response = await verifyUserSession(token);
        const { user, token: newToken } = response;
        if (newToken) {
          Cookies.remove('refresh_token');
          Cookies.set('refresh_token', newToken, { expires: 30 });
          setRefreshToken(newToken);
        }
        setUser(user);
      } catch (error) {
        consoleLogger(`Session verification failed: ${JSON.stringify((error as Error).message)}`, "error", "AuthContext");
        setUser(null);
        setRefreshToken('');
        toast.error('Session expired. Please log in again.');
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, [setUser, setIsLoading, setRefreshToken, refreshToken]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const ip = await fetch('https://api.ipify.org?format=json')
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => data.ip)
        .catch(() => 'unknown');
      const deviceInfo = {
        userAgent,
        platform,
        ip,
        isActivated: localStorage.getItem('NotificationPermission') ?? 'granted',
      };
      const { tokens, user, merchant, staff, paymentMethods } = response;
      setUser(user);
      Cookies.set('theme', user.theme, { expires: 30 });
      Cookies.remove('access_token');
      Cookies.set('access_token', tokens.accessToken, { expires: 7 });
      Cookies.set('refresh_token', tokens.refreshToken, { expires: 30 });
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
    } catch (error) {
      consoleLogger(`Login error: ${JSON.stringify((error as Error).message)}`, "error", "AuthContext");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: any) => {
    setIsLoading(true);
    try {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const ip = await fetch('https://api.ipify.org?format=json')
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => data.ip)
        .catch(() => 'unknown');
      const { email, password, businessName, name, phone } = formData;
      const deviceInfo = {
        userAgent,
        platform,
        ip,
        isActivated: localStorage.getItem('NotificationPermission') ?? 'unknown',
      };
      const response = await registerUser({ email, password, businessName, name, phone });
      const { tokens, user } = response;
      setUser(user);
      await saveUserTokens(deviceInfo, tokens.accessToken);
      Cookies.remove('access_token');
      Cookies.set('access_token', tokens.accessToken, { expires: 7 });
      setAccessToken(tokens.accessToken);
      Cookies.set('refresh_token', tokens.refreshToken, { expires: 30 });
      setRefreshToken(tokens.refreshToken);
    } catch (error) {
      consoleLogger(`Register error: ${JSON.stringify((error as Error).message)}`, "error", "AuthContext");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (accessToken: string) => {
    try {
      const response = await getUserDetails(accessToken);
      const { tokens, user, merchant, staff, paymentMethods } = response;
      setUser(user);
      Cookies.set('theme', user.theme, { expires: 30 });
      Cookies.remove('access_token');
      Cookies.set('access_token', tokens.accessToken, { expires: 7 });
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      Cookies.set('refresh_token', tokens.refreshToken, { expires: 30 });
    } catch (error) {
      consoleLogger(`Get user details error: ${JSON.stringify((error as Error).message)}`, "error", "AuthContext");
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      reset();
      queryClient.clear();
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      setUser(null);
      setAccessToken('');
      setRefreshToken('');
      Cookies.remove('theme');
    } catch (error) {
      consoleLogger(`Logout error: ${JSON.stringify((error as Error).message)}`, "error", "AuthContext");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        register,
        getUser,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};