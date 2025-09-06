import { Outlet } from 'react-router-dom'

export const DashboardLayout = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <Outlet />
      </div>
    </main>
  )
}