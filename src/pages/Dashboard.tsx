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
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Projects", value: "24", change: "+3", icon: FolderKanban, color: "from-blue-500 to-cyan-400" },
  { label: "Total Clients", value: "156", change: "+12", icon: Users, color: "from-purple-500 to-pink-400" },
  { label: "Revenue (MTD)", value: "$84.5K", change: "+18%", icon: DollarSign, color: "from-green-500 to-emerald-400" },
  { label: "Growth", value: "32%", change: "+5%", icon: TrendingUp, color: "from-orange-500 to-yellow-400" },
];

const recentProjects = [
  { name: "Skyline Tower Visualization", client: "Apex Developers", service: "Architecture", status: "In Progress", icon: Building2 },
  { name: "TechStart Website Redesign", client: "TechStart Inc", service: "Web Dev", status: "Review", icon: Globe },
  { name: "Summer Campaign 2025", client: "Fashion Brand Co", service: "Social", status: "Active", icon: Share2 },
  { name: "Brand Identity Refresh", client: "Green Energy Ltd", service: "Design", status: "Planning", icon: Palette },
];

const upcomingTasks = [
  { title: "Client presentation - Skyline Tower", time: "Today, 2:00 PM", priority: "high" },
  { title: "Review website wireframes", time: "Today, 4:30 PM", priority: "medium" },
  { title: "Social media content approval", time: "Tomorrow, 10:00 AM", priority: "low" },
  { title: "Team standup meeting", time: "Tomorrow, 11:00 AM", priority: "medium" },
];

export default function Dashboard() {
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
          {stats.map((stat, index) => (
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
              <div className="font-serif text-3xl font-bold mb-1">{stat.value}</div>
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
              {recentProjects.map((project, index) => (
                <div
                  key={project.name}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <project.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{project.name}</div>
                    <div className="text-sm text-muted-foreground">{project.client}</div>
                  </div>
                  <div className="hidden sm:block text-sm text-muted-foreground">{project.service}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "In Progress" ? "bg-blue-500/20 text-blue-400" :
                    project.status === "Review" ? "bg-yellow-500/20 text-yellow-400" :
                    project.status === "Active" ? "bg-green-500/20 text-green-400" :
                    "bg-purple-500/20 text-purple-400"
                  }`}>
                    {project.status}
                  </div>
                </div>
              ))}
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
              {upcomingTasks.map((task, index) => (
                <div
                  key={task.title}
                  className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                      task.priority === "high" ? "bg-red-400" :
                      task.priority === "medium" ? "bg-yellow-400" :
                      "bg-green-400"
                    }`} />
                    <div>
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{task.time}</div>
                    </div>
                  </div>
                </div>
              ))}
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
            { label: "New Project", icon: FolderKanban, href: "/dashboard/projects/new" },
            { label: "Add Client", icon: Users, href: "/dashboard/clients/new" },
            { label: "Create Invoice", icon: DollarSign, href: "/dashboard/billing/new" },
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
