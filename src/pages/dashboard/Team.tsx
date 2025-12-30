import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, MoreHorizontal, Mail, Phone, MapPin,
  Briefcase, Star, Users, Calendar, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
  status: "active" | "away" | "offline";
  projects: number;
  hourlyRate?: number;
  isContractor: boolean;
}

const mockTeam: TeamMember[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@gnexus.io", role: "Lead Designer", department: "Design", status: "active", projects: 5, hourlyRate: 95, isContractor: false },
  { id: "2", name: "Michael Chen", email: "michael@gnexus.io", role: "Full Stack Developer", department: "Engineering", status: "active", projects: 4, hourlyRate: 120, isContractor: false },
  { id: "3", name: "Emma Williams", email: "emma@gnexus.io", role: "Project Manager", department: "Operations", status: "away", projects: 8, isContractor: false },
  { id: "4", name: "David Park", email: "david@contractor.com", role: "3D Artist", department: "Creative", status: "active", projects: 2, hourlyRate: 85, isContractor: true },
  { id: "5", name: "Lisa Thompson", email: "lisa@gnexus.io", role: "Marketing Lead", department: "Marketing", status: "offline", projects: 3, isContractor: false },
  { id: "6", name: "James Wilson", email: "james@contractor.com", role: "Backend Developer", department: "Engineering", status: "active", projects: 2, hourlyRate: 110, isContractor: true },
];

const statusColors: Record<string, string> = {
  active: "bg-gnexus-success",
  away: "bg-gnexus-warning",
  offline: "bg-muted-foreground",
};

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const filteredTeam = mockTeam.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: mockTeam.length,
    active: mockTeam.filter(m => m.status === "active").length,
    contractors: mockTeam.filter(m => m.isContractor).length,
    departments: [...new Set(mockTeam.map(m => m.department))].length,
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Team</h1>
          <p className="text-muted-foreground mt-1">Manage your team and contractors</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="colleague@company.com" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select dept" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsInviteDialogOpen(false)}>Send Invite</Button>
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
            <div className="p-2 rounded-lg bg-primary/10"><Users className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10"><Star className="h-5 w-5 text-gnexus-success" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Active Now</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10"><Briefcase className="h-5 w-5 text-accent" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.contractors}</p>
              <p className="text-sm text-muted-foreground">Contractors</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-purple/10"><Award className="h-5 w-5 text-gnexus-purple" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.departments}</p>
              <p className="text-sm text-muted-foreground">Departments</p>
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
          <Input placeholder="Search team..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredTeam.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="glass-card p-5 hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${statusColors[member.status]}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit Member</DropdownMenuItem>
                  <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{member.department}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={member.isContractor ? "bg-accent/15 text-accent border-accent/25" : ""}>
                  {member.isContractor ? "Contractor" : "Staff"}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{member.projects} projects</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
