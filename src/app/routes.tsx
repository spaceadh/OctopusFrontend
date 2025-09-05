import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from './layout/DashboardLayout'

import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from './layout/DashboardLayout'

import propertiesRoutes from '@/modules/properties/routes'
import saccoRoutes from '@/modules/sacco/routes'
import chamaRoutes from '@/modules/chama/routes'
import lendingRoutes from '@/modules/lending/routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      // TODO: Add a proper dashboard home page
      { index: true, element: <div>Dashboard Home</div> },
      // Module routes will be spread here
      ...propertiesRoutes,
      ...saccoRoutes,
      ...chamaRoutes,
      ...lendingRoutes,
    ],
  },
])
