import { RouteObject } from 'react-router-dom'

const SaccoDashboard = () => <div>Sacco Dashboard</div>

const saccoRoutes: RouteObject[] = [
  {
    path: 'sacco',
    element: <SaccoDashboard />,
    // Add sacco-related routes here
  },
]

export default saccoRoutes
