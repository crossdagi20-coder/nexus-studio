import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, MoreHorizontal, Calendar, User, Flag, Clock,
  GripVertical, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  assignee?: string;
  dueDate?: string;
  project?: string;
  estimatedHours?: number;
}

const mockTasks: Task[] = [
  { id: "1", title: "Design system audit", status: "backlog", priority: "medium", project: "TechCorp Website" },
  { id: "2", title: "Create wireframes for dashboard", status: "backlog", priority: "high", assignee: "JD", project: "Mobile App" },
  { id: "3", title: "Review brand guidelines", status: "todo", priority: "low", assignee: "SC", dueDate: "2025-01-05" },
  { id: "4", title: "Develop homepage hero section", status: "todo", priority: "high", assignee: "MR", dueDate: "2025-01-03", estimatedHours: 8 },
  { id: "5", title: "API integration for payments", status: "in_progress", priority: "high", assignee: "JD", dueDate: "2025-01-02", estimatedHours: 12 },
  { id: "6", title: "Mobile responsive fixes", status: "in_progress", priority: "medium", assignee: "SC", estimatedHours: 4 },
  { id: "7", title: "User testing session prep", status: "review", priority: "medium", assignee: "MR", dueDate: "2025-01-04" },
  { id: "8", title: "Analytics dashboard charts", status: "review", priority: "low", assignee: "JD" },
  { id: "9", title: "Launch landing page", status: "done", priority: "high", assignee: "SC" },
  { id: "10", title: "SEO optimization", status: "done", priority: "medium", assignee: "MR" },
];

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: "backlog", title: "Backlog", color: "text-muted-foreground" },
  { id: "todo", title: "To Do", color: "text-primary" },
  { id: "in_progress", title: "In Progress", color: "text-gnexus-warning" },
  { id: "review", title: "Review", color: "text-gnexus-purple" },
  { id: "done", title: "Done", color: "text-gnexus-success" },
];

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25",
  high: "bg-destructive/15 text-destructive border-destructive/25",
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (draggedTask) {
      setTasks(prev => prev.map(task => 
        task.id === draggedTask ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status: TaskStatus) => 
    tasks.filter(task => task.status === status);

  return (
    <div className="space-y-6 h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Task Board</h1>
          <p className="text-muted-foreground mt-1">Drag and drop tasks between columns</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Task Title</Label>
                <Input placeholder="Enter task title" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe the task..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="backlog">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backlog">Backlog</SelectItem>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Hours</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create Task</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Kanban Board */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4"
      >
        {columns.map((column, colIndex) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * colIndex }}
              className="glass-card p-4 h-full min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${column.color}`}>{column.title}</h3>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task, taskIndex) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * taskIndex }}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className={`kanban-card ${draggedTask === task.id ? 'opacity-50 scale-95' : ''}`}
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5 cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-snug">{task.title}</p>
                        {task.project && (
                          <p className="text-xs text-muted-foreground mt-1">{task.project}</p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Add Time Entry</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
                        <Flag className="h-3 w-3 mr-1" />
                        {task.priority}
                      </Badge>
                      
                      {task.estimatedHours && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.estimatedHours}h
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      {task.dueDate ? (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      ) : (
                        <span></span>
                      )}
                      
                      {task.assignee ? (
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {task.assignee}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <User className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
