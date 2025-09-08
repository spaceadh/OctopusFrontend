import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

interface ModuleGuardProps {
  moduleName: string;
}

export function ModuleGuard({ moduleName }: ModuleGuardProps) {
  const { user } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [loadingTimeout, setLoadingTimeout] = React.useState<NodeJS.Timeout | null>(null);

  // Set a timeout to show the loading skeleton if auth check takes too long
  React.useEffect(() => {
    setLoadingTimeout(setTimeout(() => setLoading(true), 300));

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);
  
  const isLoading = loading && !user;
  if (isLoading) {
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

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasSubscription = user.subscriptions?.includes(moduleName);

  if (!hasSubscription) {
    return <Navigate to="/check-in" replace />;
  }

  return <Outlet />;
}