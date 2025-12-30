import { motion } from "framer-motion";
import { 
  BarChart3, Users, Briefcase, DollarSign, TrendingUp, 
  Eye, MousePointer, Clock, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const metrics = [
  { label: "Page Views", value: "24,521", change: "+18%", icon: Eye },
  { label: "Unique Visitors", value: "8,432", change: "+12%", icon: Users },
  { label: "Avg. Session", value: "4m 32s", change: "+8%", icon: Clock },
  { label: "Conversion Rate", value: "3.2%", change: "+0.5%", icon: TrendingUp },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-serif font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance metrics and insights</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <metric.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className="text-xs text-gnexus-success flex items-center">
                    <ArrowUpRight className="h-3 w-3" />
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4">Traffic Overview</h3>
          <div className="h-48 flex items-center justify-center text-muted-foreground">
            <BarChart3 className="h-12 w-12" />
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-serif text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {["/dashboard", "/projects", "/clients", "/invoices"].map((page, i) => (
              <div key={page} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="font-mono text-sm">{page}</span>
                <span className="text-muted-foreground">{(1000 - i * 200).toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
