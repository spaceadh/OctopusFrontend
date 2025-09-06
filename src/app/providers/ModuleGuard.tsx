import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/authStore';
import toast from 'react-hot-toast';

interface ModuleGuardProps {
  moduleName: string;
}

export const ModuleGuard = ({ moduleName }: ModuleGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user) {
    // This case should ideally be handled by a general ProtectedRoute
    // Redirect to login if no user is found
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasSubscription = user.subscriptions?.includes(moduleName);
  // const hasSubscription = true; // Temporarily allow access to all modules

  if (!hasSubscription) {
    // User does not have the required subscription, redirect to check-in
    // You can also show an "Access Denied" page here
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
