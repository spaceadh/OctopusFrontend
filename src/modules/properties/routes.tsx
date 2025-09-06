import { SubscriptionGuard } from '@/app/providers/SubscriptionGuard'
import { RouteObject, Outlet } from 'react-router-dom'
import PropertiesDashboardPage from './pages/DashboardPage'
import PropertiesListPage from './pages/PropertiesListPage'

const propertiesRoutes: RouteObject[] = [
  {
    path: 'properties',
    element: (
      <SubscriptionGuard product="PROPERTIES">
        <Outlet />
      </SubscriptionGuard>
    ),
    children: [
      {
        index: true,
        element: <PropertiesDashboardPage />,
      },
      {
        path: 'listing',
        element: <PropertiesListPage />,
      },
      // Add other properties-related routes here
    ],
  },
]

export default propertiesRoutes
