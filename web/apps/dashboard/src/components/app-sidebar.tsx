'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, Rotate3D, TowerControl } from 'lucide-react';
import SerialCard from './cards/serial-card';

const BAUD_RATES = [9600, 19200, 38400, 57600, 115200];
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Orientation',
    url: '/orientation',
    icon: Rotate3D,
  },

  {
    title: 'Control',
    url: '/control',
    icon: TowerControl,
  },
];

export function AppSidebar(): React.ReactNode {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-1 mb-2 p-5">
            Arm stabilizer
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SerialCard className="mt-4" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
