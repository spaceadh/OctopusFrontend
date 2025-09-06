import { RouteObject, Outlet } from 'react-router-dom'
import ChamaDashboardPage from './pages/DashboardPage'
import MembersListPage from './pages/MembersListPage'
import ContributionsListPage from './pages/ContributionsListPage'

const chamaRoutes: RouteObject[] = [
  {
    path: 'chama',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <ChamaDashboardPage />,
      },
      {
        path: 'members',
        element: <MembersListPage />,
      },
      {
        path: 'contributions',
        element: <ContributionsListPage />,
      },
      // Add chama-related routes here
    ],
  },
]

export default chamaRoutes
