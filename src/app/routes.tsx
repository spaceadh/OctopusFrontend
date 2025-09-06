import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './layout/ProtectedRoute';
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';
import CheckInPage from '@/modules/checkin/pages/CheckInPage';
import { CheckInLayout } from './layout/CheckInLayout';
import { ModuleGuard } from './providers/ModuleGuard';
import { AdminGuard } from './providers/AdminGuard';
import { LendingLayout } from '@/modules/lending/layout/LendingLayout';

import lendingRoutes from '@/modules/lending/routes';
import adminRoutes from '@/modules/admin/routes';
import ForgotPasswordPage from '@/modules/auth/pages/ForgotPassword';
import OTPPage from '@/modules/auth/pages/OTPPage';

export const router = createBrowserRouter([
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
  {
    path: '/otp',
    element: <OTPPage />,
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
        children: [
          {
            element: <AdminGuard />,
            children: adminRoutes,
          },
          {
            element: <ModuleGuard moduleName="lending" />,
            children: [
              {
                element: <LendingLayout />,
                children: lendingRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
]);