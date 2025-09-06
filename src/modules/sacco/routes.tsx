import { RouteObject, Outlet } from 'react-router-dom'
import SaccoDashboardPage from './pages/DashboardPage'
import MembersListPage from './pages/MembersListPage'
import LoansListPage from './pages/LoansListPage'

const saccoRoutes: RouteObject[] = [
  {
    path: 'sacco',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <SaccoDashboardPage />,
      },
      {
        path: 'members',
        element: <MembersListPage />,
      },
      {
        path: 'loans',
        element: <LoansListPage />,
      },
      // Add sacco-related routes here
    ],
  },
]

export default saccoRoutes
