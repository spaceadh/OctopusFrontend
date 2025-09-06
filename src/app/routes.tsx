import { createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './layout/DashboardLayout';
import ProtectedRoute from './layout/ProtectedRoute';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import CheckInPage from '@/modules/dashboard/pages/CheckInPage';
import { CheckInLayout } from './layout/CheckInLayout';
import { ModuleGuard } from './providers/ModuleGuard';
import { AdminGuard } from './providers/AdminGuard';

import propertiesRoutes from '@/modules/properties/routes';
import saccoRoutes from '@/modules/sacco/routes';
import chamaRoutes from '@/modules/chama/routes';
import lendingRoutes from '@/modules/lending/routes';
import adminRoutes from '@/modules/admin/routes';
import ForgotPasswordPage from '@/modules/auth/pages/ForgotPassword';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  // Protected routes
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <CheckInLayout />,
        children: [
          {
            index: true,
            element: <CheckInPage />,
          },
        ],
      },
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          {
            element: <AdminGuard />,
            children: adminRoutes,
          },
          {
            element: <ModuleGuard moduleName="property" />,
            children: propertiesRoutes,
          },
          {
            element: <ModuleGuard moduleName="sacco" />,
            children: saccoRoutes,
          },
          {
            element: <ModuleGuard moduleName="chama" />,
            children: chamaRoutes,
          },
          {
            element: <ModuleGuard moduleName="lending" />,
            children: lendingRoutes,
          },
        ],
      },
    ],
  },
]);