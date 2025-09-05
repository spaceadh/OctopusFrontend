import { RouteObject } from 'react-router-dom'

const LendingDashboard = () => <div>Lending Dashboard</div>

const lendingRoutes: RouteObject[] = [
  {
    path: 'lending',
    element: <LendingDashboard />,
    // Add lending-related routes here
  },
]

export default lendingRoutes
