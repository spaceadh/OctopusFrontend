import { createBrowserRouter } from 'react-router-dom';
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
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ErrorPage } from '@/pages/ErrorPage';

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'check-in',
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
                // element: <LendingLayout />,
                children: lendingRoutes,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);