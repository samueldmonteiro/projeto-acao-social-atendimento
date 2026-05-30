import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LayoutDashboardIcon, FolderIcon, UsersIcon, BarChart3Icon, MonitorPlayIcon } from 'lucide-react';
import type { UserSafe } from '@/types/user.type';
import logo from '@/assets/logo-simple.png';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: 'Beneficiários',
      url: '/beneficiarios',
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: 'Serviços',
      url: '/categorias',
      icon: (
        <FolderIcon
        />
      ),
    },
    {
      title: 'Métricas',
      url: '/metricas',
      icon: (
        <BarChart3Icon
        />
      ),
    },
    {
      title: 'Painel',
      url: '/painel',
      icon: (
        <MonitorPlayIcon
        />
      ),
    },
  ],
};

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: UserSafe | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/" />}
            >
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-6 h-6" />
                <span className="text-base font-semibold">
                  Ação Social - Anhanguera
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
