import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, Download, Send,
  DollarSign, Clock, CheckCircle, AlertCircle, FileText,
  Eye, Printer, Copy
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

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  projectName: string;
  status: "draft" | "sent" | "viewed" | "paid" | "overdue";
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    clientName: "TechCorp Industries",
    projectName: "Website Redesign",
    status: "paid",
    issueDate: "2024-12-15",
    dueDate: "2025-01-15",
    subtotal: 8500,
    tax: 680,
    total: 9180,
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    clientName: "Design Studio Pro",
    projectName: "Brand Identity Package",
    status: "sent",
    issueDate: "2024-12-28",
    dueDate: "2025-01-28",
    subtotal: 4200,
    tax: 336,
    total: 4536,
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    clientName: "StartUp Nexus",
    projectName: "Mobile App Development",
    status: "overdue",
    issueDate: "2024-12-01",
    dueDate: "2024-12-31",
    subtotal: 15000,
    tax: 1200,
    total: 16200,
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    clientName: "Global Ventures",
    projectName: "Marketing Campaign",
    status: "draft",
    issueDate: "2025-01-02",
    dueDate: "2025-02-02",
    subtotal: 3500,
    tax: 280,
    total: 3780,
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    clientName: "Urban Architecture",
    projectName: "3D Visualization",
    status: "viewed",
    issueDate: "2024-12-20",
    dueDate: "2025-01-20",
    subtotal: 6000,
    tax: 480,
    total: 6480,
  },
];

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  draft: { color: "bg-muted text-muted-foreground", icon: FileText, label: "Draft" },
  sent: { color: "bg-primary/15 text-primary border-primary/25", icon: Send, label: "Sent" },
  viewed: { color: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25", icon: Eye, label: "Viewed" },
  paid: { color: "bg-gnexus-success/15 text-gnexus-success border-gnexus-success/25", icon: CheckCircle, label: "Paid" },
  overdue: { color: "bg-destructive/15 text-destructive border-destructive/25", icon: AlertCircle, label: "Overdue" },
};

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: mockInvoices.reduce((acc, inv) => acc + inv.total, 0),
    paid: mockInvoices.filter(inv => inv.status === "paid").reduce((acc, inv) => acc + inv.total, 0),
    pending: mockInvoices.filter(inv => inv.status === "sent" || inv.status === "viewed").reduce((acc, inv) => acc + inv.total, 0),
    overdue: mockInvoices.filter(inv => inv.status === "overdue").reduce((acc, inv) => acc + inv.total, 0),
  };

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
            <Button className="gap-2">
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp Industries</SelectItem>
                      <SelectItem value="design">Design Studio Pro</SelectItem>
                      <SelectItem value="startup">StartUp Nexus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="brand">Brand Identity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Line Items</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Description" className="flex-1" />
                    <Input placeholder="Qty" className="w-20" type="number" defaultValue="1" />
                    <Input placeholder="Rate" className="w-28" type="number" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Line Item
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes for the client..." rows={2} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>Create & Send</Button>
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

      {/* Invoices Table */}
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
              <th>Project</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th className="text-right">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, index) => {
              const StatusIcon = statusConfig[invoice.status].icon;
              return (
                <motion.tr 
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-secondary/30"
                >
                  <td>
                    <span className="font-mono font-medium">{invoice.invoiceNumber}</span>
                  </td>
                  <td>{invoice.clientName}</td>
                  <td className="text-muted-foreground">{invoice.projectName}</td>
                  <td>
                    <Badge variant="outline" className={`gap-1 ${statusConfig[invoice.status].color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[invoice.status].label}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground">
                    {new Date(invoice.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className={invoice.status === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                    {new Date(invoice.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
    </div>
  );
}
