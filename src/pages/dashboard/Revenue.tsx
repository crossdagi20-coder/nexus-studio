import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Briefcase,
  ArrowUpRight, ArrowDownRight, Calendar, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stats = [
  { label: "Total Revenue", value: "$128,450", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Active Projects", value: "24", change: "+3", up: true, icon: Briefcase },
  { label: "New Clients", value: "8", change: "+2", up: true, icon: Users },
  { label: "Avg. Project Value", value: "$5,352", change: "-2.1%", up: false, icon: TrendingUp },
];

const revenueData = [
  { month: "Jul", value: 18000 },
  { month: "Aug", value: 22000 },
  { month: "Sep", value: 19500 },
  { month: "Oct", value: 28000 },
  { month: "Nov", value: 25000 },
  { month: "Dec", value: 32000 },
];

const topClients = [
  { name: "TechCorp Industries", revenue: 45000, projects: 3 },
  { name: "Design Studio Pro", revenue: 38000, projects: 5 },
  { name: "StartUp Nexus", revenue: 28000, projects: 2 },
  { name: "Global Ventures", revenue: 17000, projects: 1 },
];

export default function Revenue() {
  const [period, setPeriod] = useState("6m");
  const maxValue = Math.max(...revenueData.map(d => d.value));

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Revenue</h1>
          <p className="text-muted-foreground mt-1">Financial overview and analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span className={`text-sm flex items-center gap-1 ${stat.up ? 'text-gnexus-success' : 'text-destructive'}`}>
                {stat.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="font-serif text-lg font-semibold mb-6">Revenue Trend</h3>
        <div className="h-64 flex items-end gap-4">
          {revenueData.map((item, index) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
              <span className="text-sm text-muted-foreground">{item.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="font-serif text-lg font-semibold mb-4">Top Clients by Revenue</h3>
        <div className="space-y-4">
          {topClients.map((client, index) => (
            <div key={client.name} className="flex items-center gap-4">
              <span className="text-muted-foreground w-6">{index + 1}</span>
              <div className="flex-1">
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-muted-foreground">{client.projects} projects</p>
              </div>
              <span className="font-semibold text-gnexus-success">${client.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
