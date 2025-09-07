import React from 'react';
import { useNavigate, Navigate, } from 'react-router-dom';
import { useAuth } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { confirmAuth, fetchLendingStatsDetails } from '@/modules/lending/apis/lending-auth';
import { getProducts } from '@/modules/lending/apis/products';
import { useQuery } from '@tanstack/react-query';
import {  LendingStatsData, useSetLendingStatsData } from '@/modules/lending/context/lending-store';
import { toast } from 'react-hot-toast';
type DataLoaderProps = {
  children: React.ReactNode;
  path: string;
};

export function DataLoader({ children, path }: DataLoaderProps) {
  const { isAuthenticated, refreshToken } = useAuth();
  const setLendingStatsData = useSetLendingStatsData();
  const navigate = useNavigate();

  // 1. Auth check
  const { data: authResult, isLoading: isLoadingAuth } = useQuery({
    queryKey: ['auth-check', refreshToken],
    queryFn: () => confirmAuth(refreshToken),
    retry: false,
  });

  const handlingLendingStatsData = async (refreshToken: string) => {
    if (!refreshToken) return;
    let response;
    try {
      response = await fetchLendingStatsDetails(refreshToken);
      setLendingStatsData(response);
    } catch (error) {
      console.error('Error fetching lending stats:', error);
      toast.error('Failed to fetch lending stats');
    }
    setLendingStatsData(response);
  };

  // 2. Route-specific data fetch (example: borrowers/products/loans)
  const { data: resourceData, isLoading: isLoadingData } = useQuery({
    queryKey: ['route-data', path],
    queryFn: () => {
      if (path === '/dashboard') {
        return handlingLendingStatsData(refreshToken);
      }
      if (path === '/loans') {
        return fetch('/api/loans').then(res => res.json());
      }
      if (path === '/borrowers') {
        return getProducts();
      }
      return Promise.resolve(null);
    },
    enabled: !!authResult?.success, // only run after auth passes
  });

  React.useEffect(() => {
    if (authResult && !authResult.success) {
      navigate('/login', { replace: true });
    }
  }, [authResult, navigate]);

  if (isLoadingAuth || isLoadingData) {
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
    return <Navigate to="/login" replace />;
  }

  // Optionally, pass loaded data down via React.cloneElement or context
  return children;
};