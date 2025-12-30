import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, MessageSquare,
  AlertCircle, Clock, CheckCircle, User, Flag, Loader2
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
import { useTickets, useCreateTicket } from "@/hooks/useTickets";
import { useClients } from "@/hooks/useClients";
import { useTicketsRealtime } from "@/hooks/useRealtimeSubscription";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    client_id: "",
    priority: "medium" as const,
  });

  // Real-time subscription
  useTicketsRealtime();

  // Data hooks
  const { data: tickets = [], isLoading } = useTickets();
  const { data: clients = [] } = useClients();
  const createTicket = useCreateTicket();

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticket_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === "open").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved" || t.status === "closed").length,
  };

  const handleSubmit = async () => {
    if (!formData.subject) {
      toast.error("Subject is required");
      return;
    }

    try {
      await createTicket.mutateAsync({
        subject: formData.subject,
        description: formData.description || null,
        client_id: formData.client_id || null,
        priority: formData.priority,
        status: "open",
      });
      toast.success("Ticket created");
      setIsCreateDialogOpen(false);
      setFormData({ subject: "", description: "", client_id: "", priority: "medium" });
    } catch (error) {
      toast.error("Failed to create ticket");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <Button variant="pillowy" className="gap-2">
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
                <Label>Subject *</Label>
                <Input 
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select value={formData.client_id} onValueChange={(v) => setFormData(prev => ({ ...prev, client_id: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>{client.company_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={formData.priority} onValueChange={(v: any) => setFormData(prev => ({ ...prev, priority: v }))}>
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
                <Textarea 
                  placeholder="Detailed description of the issue..." 
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="pillowy-secondary" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button variant="pillowy" onClick={handleSubmit} disabled={createTicket.isPending}>
                  {createTicket.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Ticket"}
                </Button>
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

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="glass-card p-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No tickets found</h3>
          <p className="text-muted-foreground mb-4">Create your first support ticket</p>
          <Button variant="pillowy" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Ticket
          </Button>
        </div>
      )}

      {filteredTickets.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {filteredTickets.map((ticket, index) => {
            const StatusIcon = statusConfig[ticket.status]?.icon || AlertCircle;
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
                    <span className="font-mono text-sm text-muted-foreground">{ticket.ticket_number}</span>
                    <Badge variant="outline" className={`gap-1 ${statusConfig[ticket.status]?.color || ""}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[ticket.status]?.label || ticket.status}
                    </Badge>
                    <Badge variant="outline" className={priorityColors[ticket.priority]}>
                      <Flag className="h-3 w-3 mr-1" />
                      {ticket.priority}
                    </Badge>
                  </div>
                  <h4 className="font-medium">{ticket.subject}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {(ticket as any).clients?.company_name || "No client"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {ticket.assigned_to ? (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary/20 text-primary">
                        {ticket.assigned_to.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Button variant="pillowy-secondary" size="sm" className="gap-1">
                      <User className="h-3 w-3" />
                      Assign
                    </Button>
                  )}
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Updated</p>
                    <p>{new Date(ticket.updated_at).toLocaleDateString()}</p>
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
      )}
    </div>
  );
}