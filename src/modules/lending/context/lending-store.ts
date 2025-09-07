import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { consoleLogger } from '@/utils/logger';

export interface LendingStatsData {
  _id: string;
  LendingRole: string;
  LendingOrgName: string;
  LendingOrgCallSupportPhone: string;
  country: string | 'Kenya'; 
  status: boolean | true;
  isSubscribed: boolean | true;
  createdAt: Date;
}

interface LendingStoreState {
  lendingStatsData: LendingStatsData[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

interface LendingStoreActions {
  setLendingStatsData: (data: LendingStatsData) => void;
  reset: () => void;
  clearStorage: () => void;
}

const initialState: LendingStoreState = {
  lendingStatsData: [],
  isLoading: false,
  error: null,
  lastFetched: null,
};

// Custom storage adapter for js-cookie
const cookieStorage = {
  getItem: (name: string) => {
    const value = Cookies.get(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: any) => {
    Cookies.set(name, JSON.stringify(value), {
      expires: 7, // Cookie expires in 7 days
      secure: true, // Use secure cookies in production (HTTPS only)
      sameSite: 'Strict', // Prevent CSRF
    });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};

export const useLendingBoundStore = create<LendingStoreState & LendingStoreActions>()(
  persist(
    (set) => ({
      ...initialState,
      setLendingStatsData: (data) => {
        set({
          lendingStatsData: [data],
          error: null,
          lastFetched: Date.now(),
        });
      },
      reset: () => set(initialState),
      clearStorage: () => {
        cookieStorage.removeItem('lending-store');
        set(initialState);
      },
    }),
    {
      name: 'lending-store',
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        lendingStatsData: state.lendingStatsData,
        lastFetched: state.lastFetched,
      }),
      version: 1,
    }
  )
);


export const useLendingStore = () => useLendingBoundStore((s) => s.lendingStatsData);
export const useSetLendingStatsData = () => useLendingBoundStore((s) => s.setLendingStatsData);
export const useClientsLoading = () => useLendingBoundStore(state => state.isLoading);
export const useClearClientsStorage = () => useLendingBoundStore(state => state.clearStorage);