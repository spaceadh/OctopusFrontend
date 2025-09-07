// Routing configuration
import { RouteObject, Outlet } from 'react-router-dom';
import { Dashboard } from './pages/DashboardPage';
import LoansListPage from './pages/LoansListPage';
import BorrowersListPage from '@/modules/lending/pages/BorrowersListPage';
import { DataLoader } from '@/modules/lending/context/DataLoader';

export const lendingRoutes: RouteObject[] = [
  {
    path: 'lending',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <DataLoader path="/dashboard">
            <Dashboard />
          </DataLoader>
        ),
      },
      {
        path: 'loans',
        element: (
          <DataLoader path="/loans">
            <LoansListPage />
          </DataLoader>
        ),
      },
      {
        path: 'borrowers',
        element: (
          <DataLoader path="/borrowers">
            <BorrowersListPage />
          </DataLoader>
        ),
      },
    ],
  },
];

export default lendingRoutes;