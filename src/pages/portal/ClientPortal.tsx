import { motion } from "framer-motion";
import { 
  Briefcase, FileText, MessageSquare, DollarSign, 
  Clock, CheckCircle, ExternalLink, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const projects = [
  { id: "1", name: "Website Redesign", status: "in_progress", progress: 65, dueDate: "2025-01-15" },
  { id: "2", name: "Mobile App Development", status: "in_progress", progress: 30, dueDate: "2025-02-01" },
];

const invoices = [
  { id: "1", number: "INV-2025-001", amount: 9180, status: "paid", dueDate: "2025-01-15" },
  { id: "2", number: "INV-2025-002", amount: 4536, status: "pending", dueDate: "2025-01-28" },
];

const deliverables = [
  { id: "1", name: "Homepage Design v3", project: "Website Redesign", status: "pending_approval" },
  { id: "2", name: "Logo Variations", project: "Brand Identity", status: "approved" },
];

export default function ClientPortal() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">G</span>
            </div>
            <div>
              <h1 className="font-serif font-bold">Gnexus Portal</h1>
              <p className="text-xs text-muted-foreground">TechCorp Industries</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Sign Out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-serif font-bold mb-1">Welcome back!</h2>
          <p className="text-muted-foreground">Here's an overview of your projects and deliverables.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Briefcase className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gnexus-warning/10"><Clock className="h-5 w-5 text-gnexus-warning" /></div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gnexus-success/10"><DollarSign className="h-5 w-5 text-gnexus-success" /></div>
              <div>
                <p className="text-2xl font-bold">$9,180</p>
                <p className="text-sm text-muted-foreground">Paid</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10"><FileText className="h-5 w-5 text-destructive" /></div>
              <div>
                <p className="text-2xl font-bold">$4,536</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold">Your Projects</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="p-4 bg-secondary/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">Due {new Date(project.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="outline" className="bg-gnexus-warning/15 text-gnexus-warning">In Progress</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Deliverables */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-serif text-lg font-semibold mb-4">Pending Approval</h3>
            <div className="space-y-3">
              {deliverables.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.project}</p>
                  </div>
                  {item.status === "pending_approval" ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-gnexus-success/15 text-gnexus-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Invoices */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="font-serif text-lg font-semibold mb-4">Recent Invoices</h3>
            <div className="space-y-3">
              {invoices.map(invoice => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-mono text-sm">{invoice.number}</p>
                    <p className="text-xs text-muted-foreground">Due {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${invoice.amount.toLocaleString()}</span>
                    {invoice.status === "paid" ? (
                      <Badge variant="outline" className="bg-gnexus-success/15 text-gnexus-success">Paid</Badge>
                    ) : (
                      <Button size="sm">Pay Now</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 text-center"
        >
          <MessageSquare className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4">Our team is here to assist you with any questions.</p>
          <Button className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Open Support Ticket
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
