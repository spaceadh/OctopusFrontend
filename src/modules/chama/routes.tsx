import { RouteObject } from 'react-router-dom'

const ChamaDashboard = () => <div>Chama Dashboard</div>

const chamaRoutes: RouteObject[] = [
  {
    path: 'chama',
    element: <ChamaDashboard />,
    // Add chama-related routes here
  },
]

export default chamaRoutes
