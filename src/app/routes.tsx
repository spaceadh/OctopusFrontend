import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from './layout/DashboardLayout'
import ProtectedRoute from './layout/ProtectedRoute' // Import ProtectedRoute
import LoginPage from '@/modules/auth/pages/LoginPage' // Placeholder for Login Page
import RegisterPage from '@/modules/auth/pages/RegisterPage' // Placeholder for Register Page
import CheckInPage from '@/modules/dashboard/pages/CheckInPage' // Import CheckInPage

import propertiesRoutes from '@/modules/properties/routes'
import saccoRoutes from '@/modules/sacco/routes'
import chamaRoutes from '@/modules/chama/routes'
import lendingRoutes from '@/modules/lending/routes'

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
  // Protected routes
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <CheckInPage /> },
          // Module routes will be spread here
          ...propertiesRoutes,
          ...saccoRoutes,
          ...chamaRoutes,
          ...lendingRoutes,
        ],
      },
    ],
  },
])