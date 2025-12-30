import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, Square, Clock, Calendar, TrendingUp,
  Plus, MoreHorizontal, ChevronLeft, ChevronRight,
  Timer, DollarSign, Loader2
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
import { useTimeEntries, useRunningTimer, useStartTimer, useStopTimer } from "@/hooks/useTimeEntries";
import { useProjects } from "@/hooks/useProjects";
import { useTimeTrackingRealtime } from "@/hooks/useRealtimeSubscription";
import { toast } from "sonner";

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default function TimeTracking() {
  const [currentTimer, setCurrentTimer] = useState(0);
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentProject, setCurrentProject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Real-time subscription
  useTimeTrackingRealtime();

  // Data hooks
  const { data: entries = [], isLoading } = useTimeEntries();
  const { data: runningEntry } = useRunningTimer();
  const { data: projects = [] } = useProjects();
  const startTimer = useStartTimer();
  const stopTimer = useStopTimer();

  const isRunning = !!runningEntry;

  // Update timer display based on running entry
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningEntry) {
      const updateTimer = () => {
        const startTime = new Date(runningEntry.start_time).getTime();
        const now = Date.now();
        setCurrentTimer(Math.floor((now - startTime) / 1000));
      };
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setCurrentTimer(0);
    }
    return () => clearInterval(interval);
  }, [runningEntry]);

  const formatTimerDisplay = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = async () => {
    try {
      await startTimer.mutateAsync({
        description: currentDescription || "Working...",
        project_id: currentProject || null,
        billable: true,
      });
      toast.success("Timer started");
    } catch (error) {
      toast.error("Failed to start timer");
    }
  };

  const handleStopTimer = async () => {
    if (!runningEntry) return;
    try {
      await stopTimer.mutateAsync(runningEntry.id);
      toast.success("Timer stopped");
      setCurrentDescription("");
      setCurrentProject("");
    } catch (error) {
      toast.error("Failed to stop timer");
    }
  };

  const todayEntries = entries.filter(e => 
    new Date(e.start_time).toDateString() === selectedDate.toDateString()
  );

  const totalBillableMinutes = entries.filter(e => e.billable).reduce((acc, e) => acc + (e.duration_minutes || 0), 0);
  const totalEarnings = entries.filter(e => e.billable && e.hourly_rate).reduce(
    (acc, e) => acc + ((e.duration_minutes || 0) / 60) * (e.hourly_rate || 0), 0
  );
  const weeklyHours = Math.round(totalBillableMinutes / 60);

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
          <h1 className="text-3xl font-serif font-bold">Time Tracking</h1>
          <p className="text-muted-foreground mt-1">Track time spent on projects and tasks</p>
        </div>
        <Button variant="pillowy-secondary" className="gap-2">
          <Plus className="h-4 w-4" />
          Manual Entry
        </Button>
      </motion.div>

      {/* Timer Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Timer Display */}
          <div className="flex items-center gap-6">
            <div className={`text-4xl md:text-5xl font-mono font-bold ${isRunning ? 'text-gnexus-success glow-text' : 'text-foreground'}`}>
              {formatTimerDisplay(currentTimer)}
            </div>
            <div className="flex items-center gap-2">
              {!isRunning ? (
                <Button 
                  variant="pillowy"
                  size="lg" 
                  className="gap-2 h-14 w-14 rounded-full"
                  onClick={handleStartTimer}
                  disabled={startTimer.isPending}
                >
                  {startTimer.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Play className="h-6 w-6" />}
                </Button>
              ) : (
                <>
                  <Button 
                    variant="pillowy-secondary"
                    size="lg" 
                    className="gap-2 h-14 w-14 rounded-full"
                    onClick={handleStopTimer}
                  >
                    <Pause className="h-6 w-6" />
                  </Button>
                  <Button 
                    variant="pillowy-destructive"
                    size="lg" 
                    className="gap-2 h-14 w-14 rounded-full"
                    onClick={handleStopTimer}
                    disabled={stopTimer.isPending}
                  >
                    {stopTimer.isPending ? <Loader2 className="h-6 w-6 animate-spin" /> : <Square className="h-6 w-6" />}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Timer Input */}
          <div className="flex-1 flex flex-col md:flex-row gap-4 w-full">
            <Input 
              placeholder="What are you working on?"
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              className="flex-1"
              disabled={isRunning}
            />
            <Select value={currentProject} onValueChange={setCurrentProject} disabled={isRunning}>
              <SelectTrigger className="w-full md:w-[200px]">
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
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Timer className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatDuration(totalBillableMinutes)}</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10">
              <DollarSign className="h-5 w-5 text-gnexus-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">${totalEarnings.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Earnings</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-warning/10">
              <TrendingUp className="h-5 w-5 text-gnexus-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{weeklyHours}h</p>
              <p className="text-sm text-muted-foreground">Billable</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{entries.length}</p>
              <p className="text-sm text-muted-foreground">Entries</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Date Navigation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Button variant="pillowy-secondary" size="icon" onClick={() => {
            const prev = new Date(selectedDate);
            prev.setDate(prev.getDate() - 1);
            setSelectedDate(prev);
          }}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-lg">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <Button variant="pillowy-secondary" size="icon" onClick={() => {
            const next = new Date(selectedDate);
            next.setDate(next.getDate() + 1);
            setSelectedDate(next);
          }}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="pillowy-ghost" onClick={() => setSelectedDate(new Date())}>
          Today
        </Button>
      </motion.div>

      {/* Time Entries List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {todayEntries.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No time entries</h3>
            <p className="text-muted-foreground mb-4">Start the timer or add a manual entry</p>
            <Button variant="pillowy" onClick={handleStartTimer}>
              <Play className="h-4 w-4 mr-2" />
              Start Timer
            </Button>
          </div>
        ) : (
          todayEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card p-4 flex items-center gap-4 hover:border-primary/20 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{entry.description || "No description"}</h4>
                  {entry.billable && (
                    <Badge variant="outline" className="badge-success text-xs">
                      <DollarSign className="h-3 w-3 mr-0.5" />
                      Billable
                    </Badge>
                  )}
                  {entry.is_running && (
                    <Badge className="bg-gnexus-success text-white text-xs animate-pulse">
                      Running
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{(entry as any).projects?.name || "No project"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono font-medium">{formatDuration(entry.duration_minutes || 0)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatTime(new Date(entry.start_time))} - {entry.end_time ? formatTime(new Date(entry.end_time)) : 'Running'}
                  </p>
                </div>

                {entry.billable && entry.hourly_rate && (
                  <div className="text-right min-w-[80px]">
                    <p className="font-medium text-gnexus-success">
                      ${(((entry.duration_minutes || 0) / 60) * entry.hourly_rate).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">${entry.hourly_rate}/hr</p>
                  </div>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Add to Invoice</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Weekly Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="font-serif text-lg font-semibold mb-4">Weekly Timesheet</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-xs text-muted-foreground mb-2">{day}</p>
              <div className={`h-20 rounded-lg flex items-center justify-center ${
                i < 5 ? 'bg-primary/10' : 'bg-muted/50'
              }`}>
                <span className="text-sm font-medium">
                  {i < 3 ? `${6 + i}h` : i < 5 ? `${4 + i}h` : '-'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}