import { Home, Users, Settings } from 'lucide-react'

export const adminSidebarLinks = [
  {
    href: '/app/admin',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/app/admin/users',
    label: 'Users Management',
    icon: Users,
  },
  {
    href: '/app/admin/settings',
    label: 'Settings',
    icon: Settings,
  },
]
