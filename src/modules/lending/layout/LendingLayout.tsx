import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { LayoutProvider } from '@/context/layout-provider';
import { SearchProvider } from '@/context/search-provider';
import { useAuthStore } from '@/context/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import Logo  from '@/assets/octopus.jpeg'
import { ProfileDropdown } from '@/modules/lending/lending-components/profile-dropdown';
import { CommandMenu } from '@/modules/lending/lending-components/command-menu';
import { TopNav } from '../lending-components/top-nav';
import { ConfigDrawer } from '../lending-components/config-drawer';
import { Main } from '../lending-components/main';
import { sidebarData } from '@/modules/lending/pages/dashboard/sidebar-data';
import { Bell, Settings, Menu, X } from 'lucide-react';
import { ThemeSwitch } from '@/components/theme-switch';
import { useLendingBoundStore } from '../context/lending-store';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

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
  const { lendingStatsData, isLoading, error } = useLendingBoundStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile and set initial sidebar state
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On desktop, sidebar should be open by default
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile, isSidebarOpen]);

  const updatedTopNav = topNav.map((link) => ({
    ...link,
    isActive: location.pathname === link.href,
  }));

  return (
    <LayoutProvider>
      <SearchProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-background flex">
            {/* Mobile Sidebar Backdrop */}
            {isMobile && isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside
              className={cn(
                "fixed lg:relative z-50 flex flex-col bg-base-200 border-r border-base-300 transition-all duration-300 ease-in-out h-screen justify-between overflow-hidden",
                isSidebarOpen ? "translate-x-0 w-56" : "-translate-x-full lg:translate-x-0 lg:w-56",
                isMobile ? "inset-y-0 left-0" : "h-full"
              )}
            >
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={Logo} alt="Octopus Logo" className="h-8 w-8 mr-2" />
                    <span className="font-semibold text-base-content">
                      {isLoading ? <Skeleton className="h-4 w-20" /> : lendingStatsData?.LendingOrgName}
                    </span>
                  </div>
                  <button
                    className="btn btn-ghost btn-circle lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <X className="h-6 w-6 text-base-content" />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
                <nav className="space-y-2">
                  {sidebarData.productMenus.map((group) =>
                    group.items.map((item, index) => (
                      <div key={`${group.title}-${index}`}>
                        {'url' in item ? (
                          <Link
                            to={item.url}
                            className={cn(
                              "btn btn-ghost w-full justify-start h-12 rounded-xl",
                              location.pathname === item.url
                                ? "bg-primary text-primary-content"
                                : "text-base-content hover:bg-base-300"
                            )}
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="ml-2">{item.title}</span>
                          </Link>
                        ) : (
                          <div className="collapse collapse-arrow">
                            <input
                              type="checkbox"
                              className="peer"
                              defaultChecked={item.items?.some((subItem) => subItem.url === location.pathname)}
                            />
                            <div className="collapse-title flex items-center gap-2 text-base-content font-medium p-0 min-h-0 h-12">
                              <item.icon className="h-5 w-5" />
                              <span className="ml-2">{item.title}</span>
                            </div>
                            <div className="collapse-content space-y-2 pl-4">
                              {item.items?.map((subItem) => (
                                <Link
                                  key={subItem.url}
                                  to={subItem.url}
                                  className={cn(
                                    "btn btn-ghost w-full justify-start h-10 rounded-xl",
                                    location.pathname === subItem.url
                                      ? "bg-primary text-primary-content"
                                      : "text-base-content hover:bg-base-300"
                                  )}
                                  onClick={() => setIsSidebarOpen(false)}
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span className="ml-2">{subItem.title}</span>
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
                  onClick={() => {
                    navigate('/settings');
                    setIsSidebarOpen(false);
                  }}
                >
                  <Settings className="h-5 w-5" />
                  <span className="ml-2">Settings</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className={cn(
              "flex-1 flex flex-col overflow-hidden transition-all duration-300",
              isSidebarOpen && !isMobile ? "lg:ml-56" : "lg:ml-0"
            )}>
              <header className="bg-base-200 border-b border-base-300 p-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center">
                  <button
                    className="btn btn-ghost btn-circle mr-2 lg:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <Menu className="h-6 w-6 text-base-content" />
                    <span className="sr-only">Toggle sidebar</span>
                  </button>
                  <TopNav links={updatedTopNav} />
                </div>
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
              <Main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
                <Outlet />
              </Main>
            </div>
          </div>
        </SidebarProvider>
      </SearchProvider>
    </LayoutProvider>
  );
}