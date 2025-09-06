import { Outlet, useLocation } from 'react-router-dom'

import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { adminSidebarLinks } from '@/modules/admin/sidebar'
import { chamaSidebarLinks } from '@/modules/chama/sidebar'
import { lendingSidebarLinks } from '@/modules/lending/sidebar'
import { propertiesSidebarLinks } from '@/modules/properties/sidebar'
import { saccoSidebarLinks } from '@/modules/sacco/sidebar'

const moduleLinks: { [key: string]: any[] } = {
  admin: adminSidebarLinks,
  chama: chamaSidebarLinks,
  lending: lendingSidebarLinks,
  properties: propertiesSidebarLinks,
  sacco: saccoSidebarLinks,
}

export const ModuleLayout = () => {
  const { pathname } = useLocation()
  const moduleName = pathname.split('/')[2]
  const links = moduleLinks[moduleName] || []

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar links={links} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
