import axios from 'axios';
import { ProtectedAPIUtil, PublicAPIUtil }  from '@/utils/apiClient';
const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:5000/api';

export const lendingModuleendpoint = `${API_URL}/lending`;

export const confirmAuth = async (accessToken: string) => {
    try {
      const api = ProtectedAPIUtil(accessToken);
      // const response = await api.post(`${lendingModuleendpoint}/auth/confirm-subscription`, { token: accessToken });
      // return response.data;
      return { success: true, message: 'Token is valid' }; // Mock response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Error confirming token');
    }
};


export const fetchLendingStatsDetails = async (accessToken: string) => {
  try {
    const api = ProtectedAPIUtil(accessToken);
    // const response = await api.get(`${lendingModuleendpoint}/stats/getLendingStatsDetails`, {});
    const response = await mockfetchLendingStatsDetails();
    // return response.data;
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Error fetching lending stats');
  }
};

// Mock function to simulate fetching lending stats details
export const mockfetchLendingStatsDetails = async () => {
  return {
      LendingRole: 'Lender',
      LendingOrgName: 'Acme Lending',
      LendingOrgCallSupportPhone: '+254712345678',
      country: 'Kenya',
      status: true,
      isSubscribed: true,
      createdAt: new Date(),
  };
};
