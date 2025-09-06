import { RouteObject } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';

const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: <AdminDashboard />,
    // Add more admin-related routes here
  },
];

export default adminRoutes;
