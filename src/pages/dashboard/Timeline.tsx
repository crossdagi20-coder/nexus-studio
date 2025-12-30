import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Calendar,
  Filter, Download, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GanttTask {
  id: string;
  name: string;
  project: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: "on_track" | "at_risk" | "delayed" | "completed";
  assignee?: string;
  dependencies?: string[];
}

const mockGanttTasks: GanttTask[] = [
  {
    id: "1",
    name: "Website Redesign",
    project: "TechCorp",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-15"),
    progress: 45,
    status: "on_track",
    assignee: "John",
  },
  {
    id: "2",
    name: "Mobile App Development",
    project: "Design Studio",
    startDate: new Date("2025-01-05"),
    endDate: new Date("2025-02-01"),
    progress: 20,
    status: "on_track",
    assignee: "Sarah",
  },
  {
    id: "3",
    name: "Brand Identity",
    project: "StartUp Nexus",
    startDate: new Date("2025-01-02"),
    endDate: new Date("2025-01-12"),
    progress: 70,
    status: "at_risk",
    assignee: "Mike",
  },
  {
    id: "4",
    name: "Marketing Campaign",
    project: "TechCorp",
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-01-25"),
    progress: 10,
    status: "on_track",
    assignee: "Emma",
    dependencies: ["1"],
  },
  {
    id: "5",
    name: "Content Strategy",
    project: "Global Ventures",
    startDate: new Date("2025-01-08"),
    endDate: new Date("2025-01-20"),
    progress: 30,
    status: "delayed",
    assignee: "John",
  },
  {
    id: "6",
    name: "SEO Optimization",
    project: "TechCorp",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-01-30"),
    progress: 0,
    status: "on_track",
    dependencies: ["1"],
  },
];

const statusColors: Record<string, string> = {
  on_track: "bg-gnexus-success",
  at_risk: "bg-gnexus-warning",
  delayed: "bg-destructive",
  completed: "bg-primary",
};

const statusLabels: Record<string, string> = {
  on_track: "On Track",
  at_risk: "At Risk",
  delayed: "Delayed",
  completed: "Completed",
};

export default function Timeline() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState<"week" | "month" | "quarter">("week");
  
  // Generate days for the timeline
  const startDate = new Date("2025-01-01");
  const days = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const getDayWidth = () => {
    switch (viewMode) {
      case "week": return 40 * zoomLevel;
      case "month": return 20 * zoomLevel;
      case "quarter": return 10 * zoomLevel;
    }
  };

  const getBarPosition = (task: GanttTask) => {
    const start = Math.floor((task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.floor((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return {
      left: start * getDayWidth(),
      width: duration * getDayWidth(),
    };
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
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
          <h1 className="text-3xl font-serif font-bold">Timeline</h1>
          <p className="text-muted-foreground mt-1">Gantt chart view of all projects and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Milestone
          </Button>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">January 2025</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-sm">{Math.round(zoomLevel * 100)}%</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap items-center gap-4"
      >
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[key]}`} />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Gantt Chart */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        <div className="flex">
          {/* Task Names Column */}
          <div className="flex-shrink-0 w-64 border-r border-border">
            <div className="h-14 px-4 flex items-center bg-secondary/50 border-b border-border">
              <span className="font-medium text-sm">Task / Project</span>
            </div>
            {mockGanttTasks.map((task, index) => (
              <div 
                key={task.id}
                className="h-16 px-4 flex items-center border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Grid */}
          <div className="flex-1 overflow-x-auto">
            <div style={{ minWidth: days.length * getDayWidth() }}>
              {/* Days Header */}
              <div className="h-14 flex border-b border-border bg-secondary/50">
                {days.map((day, index) => (
                  <div 
                    key={index}
                    style={{ width: getDayWidth() }}
                    className={`flex-shrink-0 flex flex-col items-center justify-center border-r border-border/30 ${
                      isWeekend(day) ? 'bg-muted/50' : ''
                    }`}
                  >
                    <span className="text-xs text-muted-foreground">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-sm font-medium">{day.getDate()}</span>
                  </div>
                ))}
              </div>

              {/* Task Rows */}
              {mockGanttTasks.map((task, index) => {
                const pos = getBarPosition(task);
                return (
                  <div 
                    key={task.id}
                    className="h-16 relative border-b border-border/50"
                  >
                    {/* Background grid */}
                    <div className="absolute inset-0 flex">
                      {days.map((day, i) => (
                        <div 
                          key={i}
                          style={{ width: getDayWidth() }}
                          className={`flex-shrink-0 border-r border-border/20 ${
                            isWeekend(day) ? 'bg-muted/30' : ''
                          }`}
                        />
                      ))}
                    </div>

                    {/* Task Bar */}
                    <div
                      className="absolute top-3 h-10 rounded-lg flex items-center overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      style={{
                        left: pos.left,
                        width: pos.width,
                      }}
                    >
                      {/* Background */}
                      <div className={`absolute inset-0 ${statusColors[task.status]} opacity-25`} />
                      
                      {/* Progress */}
                      <div 
                        className={`absolute inset-y-0 left-0 ${statusColors[task.status]}`}
                        style={{ width: `${task.progress}%` }}
                      />
                      
                      {/* Content */}
                      <div className="relative px-3 flex items-center justify-between w-full">
                        <span className="text-xs font-medium truncate">{task.name}</span>
                        <span className="text-xs ml-2">{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today Indicator Info */}
      <div className="text-center text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <div className="w-0.5 h-4 bg-destructive rounded-full" />
          Today's date marker shown on timeline
        </span>
      </div>
    </div>
  );
}
