import { Button } from "./ui/button";
import { Bell, AppWindow } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  links: SidebarLink[];
}

export function Sidebar({ links }: SidebarProps) {
  const { pathname } = useLocation();
  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/app" className="flex items-center gap-2 font-semibold text-primary">
            <AppWindow className="h-6 w-6" />
            <span className="">Octopus</span>
          </a>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === link.href && "bg-primary/10 text-primary"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}