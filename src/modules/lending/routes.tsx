import { RouteObject, Outlet, Navigate } from 'react-router-dom'
import { Dashboard } from './pages/DashboardPage'
import LoansListPage from './pages/LoansListPage'
import BorrowersListPage from './pages/BorrowersListPage'
import { useAuth } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import DataLoader  from '@/modules/lending/context/DataLoader';

const lendingRoutes: RouteObject[] = [
  {
    path: 'lending',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <DataLoader path="/dashboard">
          <Dashboard />
        </DataLoader>,
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
]

export default lendingRoutes
