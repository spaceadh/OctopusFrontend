import { SubscriptionGuard } from '@/app/providers/SubscriptionGuard'
import { RouteObject } from 'react-router-dom'

// Example page components (to be created)
const PropertiesDashboard = () => <div>Properties Dashboard</div>
const PropertyList = () => <div>Property List</div>

const propertiesRoutes: RouteObject[] = [
  {
    path: 'properties',
    element: (
      <SubscriptionGuard product="PROPERTIES">
        <PropertiesDashboard />
      </SubscriptionGuard>
    ),
    children: [
      {
        index: true,
        element: <PropertyList />,
      },
      // Add other properties-related routes here
    ],
  },
]

export default propertiesRoutes
