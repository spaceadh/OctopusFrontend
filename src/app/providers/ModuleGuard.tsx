import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, useAuthStore } from '@/context/authStore';
import toast from 'react-hot-toast';

interface ModuleGuardProps {
  moduleName: string;
}

export function ModuleGuard({ moduleName }: { moduleName: string }) {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[rgb(212,175,55)]/20">
        <div className="loading loading-spinner text-[rgb(212,175,55)]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasSubscription = user.subscriptions?.includes(moduleName);

  if (!hasSubscription) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}