import { Home, Landmark, Users } from 'lucide-react'

export const lendingSidebarLinks = [
  {
    href: '/app/lending',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/app/lending/loans',
    label: 'Loans Management',
    icon: Landmark,
  },
  {
    href: '/app/lending/borrowers',
    label: 'Borrowers Management',
    icon: Users,
  },
]
