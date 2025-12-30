import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Building2,
  Globe,
  Share2,
  Palette,
  MoreHorizontal,
  Calendar,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "kanban";
type ServiceType = "all" | "architecture" | "web" | "social" | "design";
type StatusType = "all" | "planning" | "in_progress" | "review" | "completed";

const mockProjects = [
  { 
    id: "1", 
    name: "Skyline Tower Visualization", 
    client: "Apex Developers",
    service: "architecture" as const,
    status: "in_progress" as const,
    priority: "high" as const,
    dueDate: "2025-02-15",
    progress: 65,
  },
  { 
    id: "2", 
    name: "TechStart Website Redesign", 
    client: "TechStart Inc",
    service: "web" as const,
    status: "review" as const,
    priority: "medium" as const,
    dueDate: "2025-01-20",
    progress: 90,
  },
  { 
    id: "3", 
    name: "Summer Campaign 2025", 
    client: "Fashion Brand Co",
    service: "social" as const,
    status: "in_progress" as const,
    priority: "high" as const,
    dueDate: "2025-03-01",
    progress: 40,
  },
  { 
    id: "4", 
    name: "Brand Identity Refresh", 
    client: "Green Energy Ltd",
    service: "design" as const,
    status: "planning" as const,
    priority: "low" as const,
    dueDate: "2025-04-10",
    progress: 15,
  },
  { 
    id: "5", 
    name: "Marina Bay Residences", 
    client: "Coastal Properties",
    service: "architecture" as const,
    status: "completed" as const,
    priority: "medium" as const,
    dueDate: "2024-12-01",
    progress: 100,
  },
  { 
    id: "6", 
    name: "E-commerce Platform", 
    client: "Retail Solutions",
    service: "web" as const,
    status: "in_progress" as const,
    priority: "urgent" as const,
    dueDate: "2025-01-30",
    progress: 55,
  },
];

const serviceIcons = {
  architecture: Building2,
  web: Globe,
  social: Share2,
  design: Palette,
};

const serviceColors = {
  architecture: "from-blue-500 to-cyan-400",
  web: "from-purple-500 to-pink-400",
  social: "from-orange-500 to-yellow-400",
  design: "from-green-500 to-emerald-400",
};

const statusColors = {
  planning: "bg-purple-500/20 text-purple-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  review: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-green-500/20 text-green-400",
};

const priorityColors = {
  low: "bg-slate-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export default function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [serviceFilter, setServiceFilter] = useState<ServiceType>("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesService = serviceFilter === "all" || project.service === serviceFilter;
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-semibold">Projects</h1>
            <p className="text-muted-foreground">Manage all your agency projects</p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="glass-panel p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>

            {/* Service Filter */}
            <Select value={serviceFilter} onValueChange={(v) => setServiceFilter(v as ServiceType)}>
              <SelectTrigger className="w-full lg:w-44 bg-secondary/50 border-border/50">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="architecture">Architecture</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="design">Graphic Design</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusType)}>
              <SelectTrigger className="w-full lg:w-40 bg-secondary/50 border-border/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "grid" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewMode === "list" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const ServiceIcon = serviceIcons[project.service];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-panel p-6 hover-lift cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${serviceColors[project.service]} flex items-center justify-center`}>
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-secondary rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <h3 className="font-semibold mb-1 line-clamp-1">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.client}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[project.status])}>
                      {project.status.replace("_", " ")}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>

                  {/* Priority indicator */}
                  <div className={cn("absolute top-0 right-6 w-1 h-8 rounded-b-full", priorityColors[project.priority])} />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Project</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Service</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Progress</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Due Date</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => {
                  const ServiceIcon = serviceIcons[project.service];
                  return (
                    <tr key={project.id} className="border-b border-border/30 hover:bg-secondary/30 transition-colors cursor-pointer">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-2 h-2 rounded-full", priorityColors[project.priority])} />
                          <span className="font-medium">{project.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{project.client}</td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <ServiceIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="capitalize">{project.service}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", statusColors[project.status])}>
                          {project.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-primary rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">
                        {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="p-4">
                        <button className="p-2 hover:bg-secondary rounded-lg">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="glass-panel p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
