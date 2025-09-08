import React from 'react';
import { useNavigate, Navigate, } from 'react-router-dom';
import { useAuth } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import {
  mockConfirmAuth,
  mockFetchLendingStatsDetails,
  mockGetProducts,
} from '@/modules/lending/apis/mock-data';
import { useQuery } from '@tanstack/react-query';
import {  LendingStatsData, useSetLendingStatsData } from '@/modules/lending/context/lending-store';
import { toast } from 'react-hot-toast';
type DataLoaderProps = {
  children: React.ReactNode;
  path: string;
};

export function DataLoader({ children, path }: DataLoaderProps) {
  console.log(`[DataLoader] Mounted for path: ${path}`);
  const { isAuthenticated, refreshToken } = useAuth();
  const setLendingStatsData = useSetLendingStatsData();
  const navigate = useNavigate();

  // 1. Auth check
  const { data: authResult, isLoading: isLoadingAuth } = useQuery({
    queryKey: ['auth-check', refreshToken],
    queryFn: () => mockConfirmAuth(refreshToken || ''),
    retry: false,
  });

  const handlingLendingStatsData = async (refreshToken: string) => {
    if (!refreshToken) return;
    try {
      console.log('[DataLoader] Fetching lending stats data...');
      const response = await mockFetchLendingStatsDetails(refreshToken);
      console.log('[DataLoader] Fetched lending stats:', response);
      setLendingStatsData(response as LendingStatsData);
      return response;
    } catch (error) {
      console.error('[DataLoader] Error fetching lending stats:', error);
      toast.error('Failed to fetch lending stats');
      throw error;
    }
  };

  // 2. Route-specific data fetch (example: borrowers/products/loans)
  const { data: resourceData, isLoading: isLoadingData } = useQuery({
    queryKey: ['route-data', path],
    queryFn: () => {
      console.log(`[DataLoader] Starting data fetch for path: ${path}`);
      if (path === '/dashboard') {
        return handlingLendingStatsData(refreshToken || '');
      }
      if (path === '/loans') {
        console.log('[DataLoader] Fetching loans...');
        return fetch('/api/loans').then(res => res.json());
      }
      if (path === '/borrowers') {
        console.log('[DataLoader] Fetching borrowers...');
        return mockGetProducts();
      }
      console.log(`[DataLoader] No data fetch configured for path: ${path}`);
      return Promise.resolve(null);
    },
    enabled: !!authResult, // only run after auth passes
  });

  console.log(`[DataLoader] Loading states: isLoadingAuth=${isLoadingAuth}, isLoadingData=${isLoadingData}`);
  console.log(`[DataLoader] Auth result for enabled flag: !!authResult=${!!authResult}`);
  console.log(`[DataLoader] Data: authResult=`, authResult, `resourceData=`, resourceData);

  // React.useEffect(() => {
  //   if (authResult === false) {
  //     console.log('[DataLoader] Authentication failed, navigating to login.');
  //     navigate('/login', { replace: true });
  //   }
  // }, [authResult, navigate]);

  if (isLoadingAuth || isLoadingData) {
    console.log('[DataLoader] Rendering loading skeleton...');
    return (
      <div className="min-h-screen bg-[rgb(212,175,55)]/20 flex items-center justify-center p-4">
        <div className="card bg-base-200 rounded-2xl shadow-sm border border-base-300 w-full max-w-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Skeleton className="h-16 w-16 rounded-full bg-[rgb(212,175,55)]/30 animate-pulse" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4 mx-auto bg-[rgb(212,175,55)]/30 animate-pulse" />
            <Skeleton className="h-4 w-1/2 mx-auto bg-[rgb(212,175,55)]/30 animate-pulse" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32 bg-[rgb(212,175,55)]/30 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('[DataLoader] User not authenticated, navigating to login.');
    return <Navigate to="/login" replace />;
  }

  console.log('[DataLoader] Rendering children.');
  // Optionally, pass loaded data down via React.cloneElement or context
  return <>{children}</>;
};