import { Outlet } from 'react-router-dom'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar'
import { Header } from '../lending-components/header'
import { Main } from '../lending-components/main'
import { TopNav } from '../lending-components/top-nav'
import { ProfileDropdown } from '../lending-components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '../lending-components/config-drawer'
import {
  BellIcon,
  HomeIcon,
  LineChartIcon,
  Package2Icon,
  PackageIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'
import { SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

const topNav = [
  {
    title: 'Overview',
    href: '/app/lending',
    isActive: true,
  },
  {
    title: 'Customers',
    href: '#',
    isActive: false,
  },
  {
    title: 'Products',
    href: '#',
    isActive: false,
  },
  {
    title: 'Settings',
    href: '#',
    isActive: false,
  },
];

export function LendingLayout() {
  const location = useLocation();
  const getIsActive = (path: string) => location.pathname === path;
  return (
    <LayoutProvider>
      <SearchProvider>
        <SidebarProvider>
          <Sidebar>
            <div
              className="flex h-full flex-col justify-between"
              data-testid="sidebar-scroll-container"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 p-4">
                  <Package2Icon className="h-6 w-6" />
                  <span className="font-semibold">Lending Co</span>
                </div>
                <SidebarMenu>
                  <SidebarMenuButton
                    href="/app/lending"
                    isActive={getIsActive('/app/lending')}
                    icon={<HomeIcon />}
                  >
                    Dashboard
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    href="/app/lending/loans"
                    isActive={getIsActive('/app/lending/loans')}
                    icon={<UsersIcon />}
                  >
                    Loans
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    href="/app/lending/borrowers"
                    isActive={getIsActive('/app/lending/borrowers')}
                    icon={<PackageIcon />}
                  >
                    Borrowers
                  </SidebarMenuButton>
                  <SidebarMenuButton href="#" icon={<LineChartIcon />}>
                    Analytics
                  </SidebarMenuButton>
                </SidebarMenu>
              </div>
              <div className="flex flex-col gap-4 p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <SidebarMenuButton
                      icon={<SettingsIcon />}
                      className="mt-auto"
                    >
                      Settings
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p>This is the settings dialog.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Sidebar>
          <SidebarInset>
            <Header>
              <TopNav links={topNav} />
              <div className="ms-auto flex items-center gap-2">
                <Search />
                <ThemeSwitch />
                <ConfigDrawer />
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <BellIcon className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
                <ProfileDropdown />
              </div>
            </Header>
            <Main>
              <Outlet />
            </Main>
          </SidebarInset>
        </SidebarProvider>
      </SearchProvider>
    </LayoutProvider>
  );
}