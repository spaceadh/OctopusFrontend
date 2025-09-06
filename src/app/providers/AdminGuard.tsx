import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/authStore';

export const AdminGuard = () => {
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

  const isAdmin = user.role === 'octopus-administrator';

  if (!isAdmin) {
    // User is not an admin, redirect to the main check-in page
    // You could also show a dedicated "Access Denied" page
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
