import { RouteObject, Outlet } from 'react-router-dom'
import { Dashboard } from './pages/DashboardPage'
import LoansListPage from './pages/LoansListPage'
import BorrowersListPage from './pages/BorrowersListPage'

const lendingRoutes: RouteObject[] = [
  {
    path: 'lending',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'loans',
        element: <LoansListPage />,
      },
      {
        path: 'borrowers',
        element: <BorrowersListPage />,
      },
      // Add lending-related routes here
    ],
  },
]

export default lendingRoutes
