import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard";
import { 
  FolderKanban, 
  Users, 
  DollarSign, 
  TrendingUp,
  Building2,
  Globe,
  Share2,
  Palette,
  ArrowUpRight,
  Clock,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboardStats, useRecentProjects, useUpcomingTasks } from "@/hooks/useDashboardStats";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const serviceIcons: Record<string, typeof Building2> = {
  architecture: Building2,
  web: Globe,
  social: Share2,
  design: Palette,
};

const statusLabels: Record<string, string> = {
  planning: "Planning",
  in_progress: "In Progress",
  review: "Review",
  completed: "Completed",
};

const statusColors: Record<string, string> = {
  planning: "bg-purple-500/20 text-purple-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  review: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-green-500/20 text-green-400",
};

const priorityColors: Record<string, string> = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

function formatCurrency(amount: number) {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: recentProjects, isLoading: projectsLoading } = useRecentProjects();
  const { data: upcomingTasks, isLoading: tasksLoading } = useUpcomingTasks();

  const statCards = [
    { 
      label: "Active Projects", 
      value: stats?.activeProjects?.toString() || "0", 
      change: "+3", 
      icon: FolderKanban, 
      color: "from-blue-500 to-cyan-400" 
    },
    { 
      label: "Total Clients", 
      value: stats?.totalClients?.toString() || "0", 
      change: "+12", 
      icon: Users, 
      color: "from-purple-500 to-pink-400" 
    },
    { 
      label: "Revenue (MTD)", 
      value: formatCurrency(stats?.monthlyRevenue || 0), 
      change: "+18%", 
      icon: DollarSign, 
      color: "from-green-500 to-emerald-400" 
    },
    { 
      label: "Pending Tasks", 
      value: stats?.pendingTasks?.toString() || "0", 
      change: "+5%", 
      icon: TrendingUp, 
      color: "from-orange-500 to-yellow-400" 
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-3xl font-semibold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Here's what's happening across your agency today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-400">{stat.change}</span>
              </div>
              {statsLoading ? (
                <Skeleton className="h-9 w-20 mb-1" />
              ) : (
                <div className="font-serif text-3xl font-bold mb-1">{stat.value}</div>
              )}
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Recent Projects</h2>
              <Link to="/dashboard/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {projectsLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                    <Skeleton className="w-10 h-10 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                ))
              ) : recentProjects && recentProjects.length > 0 ? (
                recentProjects.map((project) => {
                  const ServiceIcon = serviceIcons[project.service_type] || Building2;
                  return (
                    <div
                      key={project.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ServiceIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{project.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{project.service_type}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status] || "bg-blue-500/20 text-blue-400"}`}>
                        {statusLabels[project.status] || project.status}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No projects yet. Create your first project to get started.
                </div>
              )}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Upcoming</h2>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {tasksLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl bg-secondary/30">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))
              ) : upcomingTasks && upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${priorityColors[task.priority] || "bg-yellow-400"}`} />
                      <div>
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {task.due_date 
                            ? format(new Date(task.due_date), "MMM d, yyyy")
                            : "No due date"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No upcoming tasks
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "New Project", icon: FolderKanban, href: "/dashboard/projects" },
            { label: "Add Client", icon: Users, href: "/dashboard/clients" },
            { label: "Create Invoice", icon: DollarSign, href: "/dashboard/invoices" },
            { label: "View Reports", icon: TrendingUp, href: "/dashboard/analytics" },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="glass-panel p-4 text-center hover-lift group cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-sm font-medium">{action.label}</div>
            </Link>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
