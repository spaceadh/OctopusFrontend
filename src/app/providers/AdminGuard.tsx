import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';

export const AdminGuard = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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

  const isAdmin = user.role === 'octopus-administrator';

  if (!isAdmin) {
    return <Navigate to="/check-in" replace />;
  }

  return <Outlet />;
};
