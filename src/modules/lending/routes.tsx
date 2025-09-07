import { RouteObject, Outlet } from 'react-router-dom';
import { Dashboard } from './pages/DashboardPage';
import LoansListPage from './pages/LoansListPage';
import BorrowersListPage from '@/modules/lending/pages/BorrowersListPage';
import { DataLoader } from '@/modules/lending/context/DataLoader';
import { LendingLayout } from '@/modules/lending/layout/LendingLayout';

export const lendingRoutes: RouteObject[] = [
  {
    path: 'lending',
    element: <LendingLayout />,
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