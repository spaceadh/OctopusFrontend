import { LendingStatsData } from '../context/lending-store';

export const mockLendingStatsData: LendingStatsData = {
  LendingOrgName: 'Octopus Inc.',
  totalLoanIssued: 1000000,
  totalLoanRepaid: 500000,
  totalInterestAccrued: 100000,
  totalBorrowers: 100,
  averageLoanSize: 10000,
  repaymentRate: 50,
  defaultRate: 5,
  activeLoans: 50,
  country: 'Kenya',
  _id: '1',
  LendingRole: 'Admin',
  LendingOrgEmail: 'admin@octopus.com',
  LendingOrgWebsite: 'https://www.octopus.com',
  LendingOrgAddress: '123 Octopus St, Nairobi, Kenya',
  LendingOrgCallSupportEmail: 'support@octopus.com',
  LendingOrgCallSupportPhone: '+254 700 000 000',
  status: true,
  isSubscribed: true,
  createdAt: new Date(),
  inactiveLoans: 50,
};

export const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
  },
];

export const mockConfirmAuth = async (token: string): Promise<boolean> => {
  console.log('[Mock] Confirming authentication with token:', token);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
};

export const mockFetchLendingStatsDetails = async (
  token: string
): Promise<LendingStatsData> => {
  console.log('[Mock] Fetching lending stats with token:', token);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockLendingStatsData;
};

export const mockGetProducts = async (): Promise<any> => {
  console.log('[Mock] Fetching products...');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { products: mockProducts };
};
