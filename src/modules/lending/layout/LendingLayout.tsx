import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { Sidebar,SidebarProvider,SidebarInset,} from '@/components/ui/sidebar'
import { Header } from '../lending-components/header'
import { Main } from '../lending-components/main'
import { TopNav } from '../lending-components/top-nav'
import { ProfileDropdown } from '../lending-components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '../lending-components/config-drawer'
import {Bell, BellIcon,HomeIcon,Package2Icon,PackageIcon,Settings,SettingsIcon,UsersIcon, Link,} from 'lucide-react'
import { SidebarMenu, SidebarMenuButton } from '@/components/ui/sidebar'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { sidebarData } from '@/modules/lending/pages/dashboard/sidebar-data'
import { CommandMenu } from '../lending-components/command-menu'
import { Logo } from '@/assets/logo'
import { useAuthStore } from '@/context/authStore'

// TopNav derived from sidebarData
const topNav = sidebarData.productMenus
  .flatMap((group) =>
    group.items.flatMap((item) =>
      'url' in item
        ? [item]
        : ('items' in item && Array.isArray(item.items))
        ? item.items.filter((subItem) => 'url' in subItem)
        : []
    )
  )
  .map((item) => ({
    title: item.title,
    href: item.url!,
    isActive: false,
  }));



export function LendingLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const updatedTopNav = topNav.map((link) => ({
    ...link,
    isActive: location.pathname === link.href,
  }));

  return (
    <LayoutProvider>
      <SearchProvider>
        <div className="min-h-screen bg-[rgb(212,175,55)]/20 flex">
          {/* Sidebar */}
          <aside className="bg-base-200 w-64 p-4 flex flex-col justify-between border-r border-base-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-2">
                <Logo className="w-8 h-8" />
                <span className="font-semibold text-base-content">Lending Co</span>
              </div>
              <nav className="space-y-2">
                {sidebarData.productMenus.map((group) =>
                  group.items.map((item, index) => (
                    <div key={`${group.title}-${index}`}>
                      {'url' in item ? (
                        <Link
                          to={item.url}
                          className={`btn btn-ghost w-full justify-start h-12 rounded-xl ${
                            location.pathname === item.url
                              ? 'bg-[rgb(212,175,55)]/20 text-[rgb(212,175,55)]'
                              : 'text-base-content hover:bg-base-300'
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          {item.title}
                        </Link>
                      ) : (
                        <div className="collapse collapse-arrow">
                          <input
                            type="checkbox"
                            className="peer"
                            defaultChecked={item.items?.some((subItem) => subItem.url === location.pathname)}
                          />
                          <div className="collapse-title flex items-center gap-2 text-base-content font-medium">
                            <item.icon className="h-5 w-5" />
                            {item.title}
                          </div>
                          <div className="collapse-content space-y-2 pl-4">
                            {item.items?.map((subItem) => (
                              <Link
                                key={subItem.url}
                                to={subItem.url}
                                className={`btn btn-ghost w-full justify-start h-10 rounded-xl ${
                                  location.pathname === subItem.url
                                    ? 'bg-[rgb(212,175,55)]/20 text-[rgb(212,175,55)]'
                                    : 'text-base-content hover:bg-base-300'
                                }`}
                              >
                                <subItem.icon className="h-4 w-4" />
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </nav>
            </div>
            <div className="p-2">
              <button
                className="btn btn-ghost w-full justify-start h-12 rounded-xl text-base-content hover:bg-base-300"
                onClick={() => navigate('/settings')}
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
            </div>
          </aside>
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="bg-base-200 border-b border-base-300 p-4 flex items-center justify-between">
              <TopNav links={updatedTopNav} />
              <div className="flex items-center gap-2">
                <CommandMenu />
                <ThemeSwitch />
                <ConfigDrawer />
                <button className="btn btn-ghost btn-circle h-8 w-8">
                  <Bell className="h-4 w-4 text-base-content" />
                  <span className="sr-only">Toggle notifications</span>
                </button>
                <ProfileDropdown />
              </div>
            </header>
            <Main className="flex-1 p-4 sm:p-6 md:p-8">
              <Outlet />
            </Main>
          </div>
        </div>
      </SearchProvider>
    </LayoutProvider>
  );
}