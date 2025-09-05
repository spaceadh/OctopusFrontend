import axios from 'axios';
import {ProtectedAPIUtil, PublicAPIUtil}  from '../utils/apiClient';
const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:5000/api';

// Function to register a new user
export const registerUser = async (userData: any) => {
  try {
    const { name, email, password,businessName,phone } = userData;
    const api = PublicAPIUtil();
    const response = await api.post(`${API_URL}/auth/register`, { businessName, email, password,phone, name });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error registering user');
  }
};

export const saveUserTokens = async (deviceInfo: any,accessToken:string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const { userAgent, platform, ip, FCMToken,isActivated } = deviceInfo;
    const response = await api.post(`${API_URL}/auth/save-token`, { userAgent, platform, ip, FCMToken,isActivated,role: 'merchant' });
    return response.data;
  }catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error saving user');
  }
}

export const getUserDetails = async (accessToken:string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const response = await api.get(`${API_URL}/auth/getUserDetails`, {});
    return response.data;
  }catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error saving user');
  }
}

// Function to login a user
export const loginUser = async (userData: any) => {
    try {
      const { email, password } = userData;
      const api = PublicAPIUtil();
      const response = await api.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error login user');
    }
};

export const forgetPassword = async (userData: any) => {
    try {
      const { email } = userData;
      const api = PublicAPIUtil();
      const response = await api.post(`${API_URL}/auth/forget_password`, { email});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error login user');
    }
};

export const confirmToken = async (userData: any) => {
    try {
      const { token } = userData;
      const api = PublicAPIUtil();
      const response = await api.post(`${API_URL}/auth/confirm-token`, { token });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error login user');
    }
};

// Function to logout a user
export const logoutUser = async () => {
  try {
    const api = PublicAPIUtil();
    const response = await api.post(`${API_URL}/auth/logout`, {});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error logout user');
  }
};

export const verifyUserSession = async (accessToken:string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const response = await api.post(`${API_URL}/auth/verify`, {});
    return response.data;
  } catch (error) {
    // console.log('Error verify user', error); 
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error verify user');
  }
};

export const forgotPassword = async (email:string) => {
  try {
    const api = PublicAPIUtil();
    const response = await api.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error verifying forgot password');
  }
}

export const resetPassword = async (userData: any) => {
    try {
      const api = PublicAPIUtil();
      const response = await api.post(`${API_URL}/auth/reset-password`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error resetting password');
    }
};

export const getOauthAuthorization = async (accessToken:string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const response = await api.get(`${API_URL}/auth/oauth-authorization`, {});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error getting OAuth authorization');
  }
}

export const hasCompletedOnboarding = async (accessToken: string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const response = await api.post(`${API_URL}/auth/complete-onboarding`, {});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error completing onboarding');
  }
}

export const FinishAuthorization = async (formData:any, accessToken:string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    const { role, name, phone, businessName } = formData;
    const response = await api.post(`${API_URL}/auth/complete-authorization`, {
      role,name,phone,businessName
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error getting OAuth authorization');
  }
}

// Function to check business name availability
export const checkBusinessNameAvailability = async (businessName: string) => {
  try {
    const api = PublicAPIUtil();
    const response = await api.get(`${API_URL}/auth/check-business-name/${businessName}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error checking business name availability');
  }
};