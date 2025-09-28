import { Home, Users, DollarSign, BarChart3, Wrench, Megaphone, Star, User, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const categories = [
  { title: "All Apps", url: "/", icon: Home },
  { title: "HR", url: "/category/hr", icon: Users },
  { title: "Finance", url: "/category/finance", icon: DollarSign },
  { title: "Sales", url: "/category/sales", icon: BarChart3 },
  { title: "IT", url: "/category/it", icon: Wrench },
  { title: "Marketing", url: "/category/marketing", icon: Megaphone },
];

const quickLinks = [
  { title: "My Dashboard", url: "/dashboard", icon: User },
  { title: "Favorites", url: "/favorites", icon: Star },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (active: boolean) =>
    active ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"}>
      <SidebarContent className="bg-sidebar">
        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-sidebar-foreground/60 font-medium">
            {!collapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={category.url}
                      className={getNavClass(isActive(category.url))}
                      title={collapsed ? category.title : undefined}
                    >
                      <category.icon className="h-4 w-4" />
                      {!collapsed && <span>{category.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-sidebar-foreground/60 font-medium">
            {!collapsed && "Quick Links"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={link.url}
                      className={getNavClass(isActive(link.url))}
                      title={collapsed ? link.title : undefined}
                    >
                      <link.icon className="h-4 w-4" />
                      {!collapsed && <span>{link.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}