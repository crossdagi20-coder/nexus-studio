import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, FolderKanban, Users, Calendar, Clock,
  FileText, Receipt, TrendingUp, BarChart3, Settings, 
  HelpCircle, Image, Share2, MessageSquare, UserCog,
  Briefcase, ChevronRight, PanelLeft
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/dashboard/projects", icon: Briefcase },
  { title: "Task Board", url: "/dashboard/tasks", icon: FolderKanban },
  { title: "Timeline", url: "/dashboard/timeline", icon: Calendar },
  { title: "Clients", url: "/dashboard/clients", icon: Users },
];

const financialItems = [
  { title: "Time Tracking", url: "/dashboard/time", icon: Clock },
  { title: "Invoices", url: "/dashboard/invoices", icon: FileText },
  { title: "Expenses", url: "/dashboard/expenses", icon: Receipt },
  { title: "Revenue", url: "/dashboard/revenue", icon: TrendingUp },
];

const creativeItems = [
  { title: "Social Hub", url: "/dashboard/social", icon: Share2 },
  { title: "Assets", url: "/dashboard/assets", icon: Image },
  { title: "Tickets", url: "/dashboard/tickets", icon: MessageSquare },
];

const adminItems = [
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Team", url: "/dashboard/team", icon: UserCog },
  { title: "CMS", url: "/dashboard/cms", icon: PanelLeft },
];

const bottomNavItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { role } = useAuth();
  const collapsed = state === "collapsed";

  const isActive = (url: string) => {
    if (url === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(url);
  };

  const NavItem = ({ item }: { item: { title: string; url: string; icon: any } }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={item.url}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
            isActive(item.url)
              ? "bg-primary/10 text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          }`}
        >
          <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive(item.url) ? "text-primary" : ""}`} />
          {!collapsed && <span className="text-sm font-medium truncate">{item.title}</span>}
          {isActive(item.url) && !collapsed && <ChevronRight className="h-3 w-3 ml-auto text-primary" />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r border-border/50 sidebar-glass" collapsible="icon">
      <div className="p-4 border-b border-border/30">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center glow-sm">
            <span className="text-lg font-bold text-white">G</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-serif font-bold gradient-text">Gnexus</h2>
              <p className="text-xs text-muted-foreground capitalize">{role || "Agency"}</p>
            </div>
          )}
        </Link>
      </div>

      <SidebarContent className="px-2 py-4 scrollbar-thin">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">Main</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => <NavItem key={item.url} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">Financial</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {financialItems.map((item) => <NavItem key={item.url} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">Creative</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {creativeItems.map((item) => <NavItem key={item.url} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          {!collapsed && <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 px-3 mb-2">Admin</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {adminItems.map((item) => <NavItem key={item.url} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-border/30">
        <SidebarMenu className="space-y-1">
          {bottomNavItems.map((item) => <NavItem key={item.url} item={item} />)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
