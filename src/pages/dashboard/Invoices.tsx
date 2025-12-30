import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, Download, Send,
  DollarSign, Clock, CheckCircle, AlertCircle, FileText,
  Eye, Printer, Copy, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuSeparator,
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
import { useInvoices, useCreateInvoice } from "@/hooks/useInvoices";
import { useClients } from "@/hooks/useClients";
import { useProjects } from "@/hooks/useProjects";
import { useInvoicesRealtime } from "@/hooks/useRealtimeSubscription";
import { toast } from "sonner";

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  draft: { color: "bg-muted text-muted-foreground", icon: FileText, label: "Draft" },
  sent: { color: "bg-primary/15 text-primary border-primary/25", icon: Send, label: "Sent" },
  viewed: { color: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25", icon: Eye, label: "Viewed" },
  paid: { color: "bg-gnexus-success/15 text-gnexus-success border-gnexus-success/25", icon: CheckCircle, label: "Paid" },
  overdue: { color: "bg-destructive/15 text-destructive border-destructive/25", icon: AlertCircle, label: "Overdue" },
  cancelled: { color: "bg-muted text-muted-foreground", icon: AlertCircle, label: "Cancelled" },
};

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_id: "",
    project_id: "",
    due_date: "",
    notes: "",
  });

  // Real-time subscription
  useInvoicesRealtime();

  // Data hooks
  const { data: invoices = [], isLoading } = useInvoices();
  const { data: clients = [] } = useClients();
  const { data: projects = [] } = useProjects();
  const createInvoice = useCreateInvoice();

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoice_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.reduce((acc, inv) => acc + inv.total, 0),
    paid: invoices.filter(inv => inv.status === "paid").reduce((acc, inv) => acc + inv.total, 0),
    pending: invoices.filter(inv => inv.status === "sent" || inv.status === "viewed").reduce((acc, inv) => acc + inv.total, 0),
    overdue: invoices.filter(inv => inv.status === "overdue").reduce((acc, inv) => acc + inv.total, 0),
  };

  const handleSubmit = async () => {
    if (!formData.due_date) {
      toast.error("Due date is required");
      return;
    }

    try {
      const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
      await createInvoice.mutateAsync({
        invoice_number: invoiceNumber,
        client_id: formData.client_id || null,
        project_id: formData.project_id || null,
        due_date: formData.due_date,
        notes: formData.notes || null,
        status: "draft",
        subtotal: 0,
        total: 0,
      });
      toast.success("Invoice created");
      setIsCreateDialogOpen(false);
      setFormData({ client_id: "", project_id: "", due_date: "", notes: "" });
    } catch (error) {
      toast.error("Failed to create invoice");
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
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Invoices</h1>
          <p className="text-muted-foreground mt-1">Create and manage client invoices</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="pillowy" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select value={formData.client_id} onValueChange={(v) => setFormData(prev => ({ ...prev, client_id: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>{client.company_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select value={formData.project_id} onValueChange={(v) => setFormData(prev => ({ ...prev, project_id: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Due Date *</Label>
                  <Input 
                    type="date" 
                    value={formData.due_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Additional notes for the client..." 
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="pillowy-secondary" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button variant="pillowy" onClick={handleSubmit} disabled={createInvoice.isPending}>
                  {createInvoice.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Invoice"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.total.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Invoiced</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10">
              <CheckCircle className="h-5 w-5 text-gnexus-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.paid.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Paid</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-warning/10">
              <Clock className="h-5 w-5 text-gnexus-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.pending.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.overdue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 md:flex-row md:items-center"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search invoices..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="viewed">Viewed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="glass-card p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No invoices found</h3>
          <p className="text-muted-foreground mb-4">Create your first invoice to get started</p>
          <Button variant="pillowy" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
      )}

      {/* Invoices Table */}
      {filteredInvoices.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Status</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th className="text-right">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice, index) => {
                const StatusIcon = statusConfig[invoice.status]?.icon || FileText;
                return (
                  <motion.tr 
                    key={invoice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="hover:bg-secondary/30"
                  >
                    <td>
                      <span className="font-mono font-medium">{invoice.invoice_number}</span>
                    </td>
                    <td>{(invoice as any).clients?.company_name || "-"}</td>
                    <td>
                      <Badge variant="outline" className={`gap-1 ${statusConfig[invoice.status]?.color || ""}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[invoice.status]?.label || invoice.status}
                      </Badge>
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(invoice.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className={invoice.status === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                      {new Date(invoice.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="text-right font-semibold">${invoice.total.toLocaleString()}</td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Printer className="h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {invoice.status === 'draft' && (
                            <DropdownMenuItem className="gap-2">
                              <Send className="h-4 w-4" />
                              Send to Client
                            </DropdownMenuItem>
                          )}
                          {invoice.status !== 'paid' && (
                            <DropdownMenuItem className="gap-2 text-gnexus-success">
                              <CheckCircle className="h-4 w-4" />
                              Mark as Paid
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="gap-2">
                            <Copy className="h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}