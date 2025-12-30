import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Building2,
  Globe,
  Share2,
  Palette,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Clients", url: "/dashboard/clients", icon: Users },
];

const serviceNavItems = [
  { title: "Architecture", url: "/dashboard/architecture", icon: Building2 },
  { title: "Web Development", url: "/dashboard/web", icon: Globe },
  { title: "Social Media", url: "/dashboard/social", icon: Share2 },
  { title: "Graphics", url: "/dashboard/graphics", icon: Palette },
];

const operationsNavItems = [
  { title: "Documents", url: "/dashboard/documents", icon: FileText },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
];

const bottomNavItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help", url: "/dashboard/help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { role } = useAuth();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ item }: { item: typeof mainNavItems[0] }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={item.url}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200",
            isActive(item.url)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium">{item.title}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r border-border/50 bg-sidebar">
      <div className="p-4 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0"
          >
            <span className="text-lg font-bold text-primary-foreground">G</span>
          </motion.div>
          {!collapsed && (
            <div>
              <span className="font-serif text-xl font-semibold">Gnexus</span>
              <span className="block text-xs text-muted-foreground capitalize">{role || "User"}</span>
            </div>
          )}
        </Link>
      </div>

      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Main</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Services Navigation */}
        <SidebarGroup className="mt-6">
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Services</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceNavItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Operations Navigation */}
        <SidebarGroup className="mt-6">
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Operations</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {operationsNavItems.map((item) => (
                <NavItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4 border-t border-border/50">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <NavItem key={item.url} item={item} />
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
