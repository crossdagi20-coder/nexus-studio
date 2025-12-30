import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, Upload, Receipt,
  DollarSign, TrendingDown, CheckCircle, Clock, X,
  CreditCard, Building2, Car, Coffee, Plane, Package, Loader2
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
import { useExpenses, useCreateExpense } from "@/hooks/useExpenses";
import { useProjects } from "@/hooks/useProjects";
import { useExpensesRealtime } from "@/hooks/useRealtimeSubscription";
import { toast } from "sonner";

const categoryIcons: Record<string, any> = {
  Software: CreditCard,
  Travel: Plane,
  Office: Package,
  Meals: Coffee,
  Transport: Car,
  Other: Building2,
};

const statusColors: Record<string, string> = {
  pending: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25",
  approved: "bg-primary/15 text-primary border-primary/25",
  rejected: "bg-destructive/15 text-destructive border-destructive/25",
  reimbursed: "bg-gnexus-success/15 text-gnexus-success border-gnexus-success/25",
};

export default function Expenses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    vendor: "",
    expense_date: new Date().toISOString().split('T')[0],
    project_id: "",
    notes: "",
  });

  // Real-time subscription
  useExpensesRealtime();

  // Data hooks
  const { data: expenses = [], isLoading } = useExpenses();
  const { data: projects = [] } = useProjects();
  const createExpense = useCreateExpense();

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = 
      (expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: expenses.reduce((acc, e) => acc + e.amount, 0),
    pending: expenses.filter(e => e.status === "pending").reduce((acc, e) => acc + e.amount, 0),
    approved: expenses.filter(e => e.status === "approved").reduce((acc, e) => acc + e.amount, 0),
    reimbursed: expenses.filter(e => e.status === "reimbursed").reduce((acc, e) => acc + e.amount, 0),
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.amount) {
      toast.error("Category and amount are required");
      return;
    }

    try {
      await createExpense.mutateAsync({
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description || null,
        vendor: formData.vendor || null,
        expense_date: formData.expense_date,
        project_id: formData.project_id || null,
      });
      toast.success("Expense added");
      setIsAddDialogOpen(false);
      setFormData({
        category: "",
        amount: "",
        description: "",
        vendor: "",
        expense_date: new Date().toISOString().split('T')[0],
        project_id: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add expense");
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
          <h1 className="text-3xl font-serif font-bold">Expenses</h1>
          <p className="text-muted-foreground mt-1">Track and manage business expenses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="pillowy" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Meals">Meals</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="pl-9" 
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input 
                  placeholder="What was this expense for?"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vendor</Label>
                  <Input 
                    placeholder="Vendor name"
                    value={formData.vendor}
                    onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input 
                    type="date" 
                    value={formData.expense_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, expense_date: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project (Optional)</Label>
                <Select value={formData.project_id} onValueChange={(v) => setFormData(prev => ({ ...prev, project_id: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Link to project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Receipt</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="pillowy-secondary" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button variant="pillowy" onClick={handleSubmit} disabled={createExpense.isPending}>
                  {createExpense.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Expense"}
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
              <TrendingDown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-warning/10">
              <Clock className="h-5 w-5 text-gnexus-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.pending.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.approved.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10">
              <DollarSign className="h-5 w-5 text-gnexus-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.reimbursed.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Reimbursed</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search expenses..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="reimbursed">Reimbursed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Software">Software</SelectItem>
            <SelectItem value="Travel">Travel</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
            <SelectItem value="Meals">Meals</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Empty State */}
      {filteredExpenses.length === 0 && (
        <div className="glass-card p-8 text-center">
          <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No expenses found</h3>
          <p className="text-muted-foreground mb-4">Add your first expense to get started</p>
          <Button variant="pillowy" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      )}

      {/* Expenses List */}
      {filteredExpenses.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          {filteredExpenses.map((expense, index) => {
            const CategoryIcon = categoryIcons[expense.category] || Package;
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="glass-card p-4 flex items-center gap-4 hover:border-primary/20 transition-all"
              >
                <div className="p-3 rounded-xl bg-secondary/50">
                  <CategoryIcon className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{expense.description || expense.category}</h4>
                    {expense.receipt_url && (
                      <Receipt className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{expense.vendor || "No vendor"}</span>
                    <span>•</span>
                    <span>{expense.category}</span>
                    {(expense as any).projects?.name && (
                      <>
                        <span>•</span>
                        <span>{(expense as any).projects.name}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(expense.expense_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>

                  <Badge variant="outline" className={statusColors[expense.status]}>
                    {expense.status}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Expense</DropdownMenuItem>
                      {expense.receipt_url && (
                        <DropdownMenuItem>View Receipt</DropdownMenuItem>
                      )}
                      {expense.status === "pending" && (
                        <>
                          <DropdownMenuItem className="text-gnexus-success gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive gap-2">
                            <X className="h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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