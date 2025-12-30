import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, MessageSquare,
  AlertCircle, Clock, CheckCircle, User, Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "waiting" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  client: string;
  assignee?: string;
  createdAt: string;
  lastUpdate: string;
}

const mockTickets: Ticket[] = [
  { id: "1", ticketNumber: "TKT-001", subject: "Website not loading on mobile", description: "Users reporting issues with mobile view", status: "open", priority: "high", client: "TechCorp", createdAt: "2025-01-02T10:00:00", lastUpdate: "2025-01-02T10:00:00" },
  { id: "2", ticketNumber: "TKT-002", subject: "Logo update request", description: "Need to update the header logo", status: "in_progress", priority: "medium", client: "Design Studio", assignee: "JD", createdAt: "2025-01-01T14:00:00", lastUpdate: "2025-01-02T09:00:00" },
  { id: "3", ticketNumber: "TKT-003", subject: "Invoice clarification needed", description: "Question about line items on last invoice", status: "waiting", priority: "low", client: "StartUp Nexus", assignee: "SC", createdAt: "2024-12-30T11:00:00", lastUpdate: "2025-01-01T15:00:00" },
  { id: "4", ticketNumber: "TKT-004", subject: "Urgent: Server downtime", description: "Production server is not responding", status: "resolved", priority: "urgent", client: "Global Ventures", assignee: "MR", createdAt: "2024-12-29T08:00:00", lastUpdate: "2024-12-29T12:00:00" },
  { id: "5", ticketNumber: "TKT-005", subject: "Feature request: Dark mode", description: "Client requesting dark mode option", status: "open", priority: "low", client: "Urban Architecture", createdAt: "2024-12-28T16:00:00", lastUpdate: "2024-12-28T16:00:00" },
];

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  open: { color: "bg-primary/15 text-primary border-primary/25", icon: AlertCircle, label: "Open" },
  in_progress: { color: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25", icon: Clock, label: "In Progress" },
  waiting: { color: "bg-gnexus-purple/15 text-gnexus-purple border-gnexus-purple/25", icon: Clock, label: "Waiting" },
  resolved: { color: "bg-gnexus-success/15 text-gnexus-success border-gnexus-success/25", icon: CheckCircle, label: "Resolved" },
  closed: { color: "bg-muted text-muted-foreground", icon: CheckCircle, label: "Closed" },
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25",
  high: "bg-destructive/15 text-destructive border-destructive/25",
  urgent: "bg-destructive text-white",
};

export default function Tickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockTickets.length,
    open: mockTickets.filter(t => t.status === "open").length,
    inProgress: mockTickets.filter(t => t.status === "in_progress").length,
    resolved: mockTickets.filter(t => t.status === "resolved" || t.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage client support requests</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Create Support Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Brief description of the issue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp</SelectItem>
                      <SelectItem value="design">Design Studio</SelectItem>
                      <SelectItem value="startup">StartUp Nexus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Detailed description of the issue..." rows={4} />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create Ticket</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><MessageSquare className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10"><AlertCircle className="h-5 w-5 text-destructive" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.open}</p>
              <p className="text-sm text-muted-foreground">Open</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-warning/10"><Clock className="h-5 w-5 text-gnexus-warning" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10"><CheckCircle className="h-5 w-5 text-gnexus-success" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.resolved}</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {filteredTickets.map((ticket, index) => {
          const StatusIcon = statusConfig[ticket.status].icon;
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="glass-card p-4 flex items-center gap-4 hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm text-muted-foreground">{ticket.ticketNumber}</span>
                  <Badge variant="outline" className={`gap-1 ${statusConfig[ticket.status].color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {statusConfig[ticket.status].label}
                  </Badge>
                  <Badge variant="outline" className={priorityColors[ticket.priority]}>
                    <Flag className="h-3 w-3 mr-1" />
                    {ticket.priority}
                  </Badge>
                </div>
                <h4 className="font-medium">{ticket.subject}</h4>
                <p className="text-sm text-muted-foreground mt-1">{ticket.client}</p>
              </div>

              <div className="flex items-center gap-4">
                {ticket.assignee ? (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/20 text-primary">{ticket.assignee}</AvatarFallback>
                  </Avatar>
                ) : (
                  <Button variant="outline" size="sm" className="gap-1">
                    <User className="h-3 w-3" />
                    Assign
                  </Button>
                )}
                <div className="text-right text-sm text-muted-foreground">
                  <p>Updated</p>
                  <p>{new Date(ticket.lastUpdate).toLocaleDateString()}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Assign</DropdownMenuItem>
                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                    <DropdownMenuItem className="text-gnexus-success">Mark Resolved</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
