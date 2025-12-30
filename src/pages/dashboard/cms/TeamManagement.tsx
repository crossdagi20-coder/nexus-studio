import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useTeamPublic, 
  useCreateTeamMemberPublic, 
  useUpdateTeamMemberPublic, 
  useDeleteTeamMemberPublic,
  TeamMemberPublic 
} from "@/hooks/useTeamPublic";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamManagement() {
  const { data: members, isLoading } = useTeamPublic();
  const createMember = useCreateTeamMemberPublic();
  const updateMember = useUpdateTeamMemberPublic();
  const deleteMember = useDeleteTeamMemberPublic();
  const { toast } = useToast();
  
  const [editMember, setEditMember] = useState<TeamMemberPublic | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    expertise: "",
    bio: "",
    avatar_url: "",
    display_order: 0,
    is_visible: true,
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      expertise: "",
      bio: "",
      avatar_url: "",
      display_order: 0,
      is_visible: true,
    });
    setEditMember(null);
  };

  const handleEdit = (member: TeamMemberPublic) => {
    setEditMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      expertise: member.expertise || "",
      bio: member.bio || "",
      avatar_url: member.avatar_url || "",
      display_order: member.display_order,
      is_visible: member.is_visible,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMember) {
        await updateMember.mutateAsync({ id: editMember.id, ...formData });
        toast({ title: "Team member updated" });
      } else {
        await createMember.mutateAsync(formData);
        toast({ title: "Team member created" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error saving member", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteMember.mutateAsync(id);
      toast({ title: "Team member deleted" });
    } catch (error) {
      toast({ title: "Error deleting member", variant: "destructive" });
    }
  };

  const toggleVisibility = async (member: TeamMemberPublic) => {
    try {
      await updateMember.mutateAsync({ id: member.id, is_visible: !member.is_visible });
      toast({ title: `Member ${member.is_visible ? "hidden" : "visible"}` });
    } catch (error) {
      toast({ title: "Error updating visibility", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard/cms"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-serif font-bold">Team Management</h1>
              <p className="text-muted-foreground">Manage public team members</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Member</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editMember ? "Edit" : "Add"} Team Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g., CEO, Designer" />
                </div>
                <div>
                  <Label>Expertise</Label>
                  <Input value={formData.expertise} onChange={(e) => setFormData({ ...formData, expertise: e.target.value })} />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                </div>
                <div>
                  <Label>Avatar URL</Label>
                  <Input value={formData.avatar_url} onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })} />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_visible} onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })} />
                  <Label>Visible on website</Label>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={createMember.isPending || updateMember.isPending}>
                  {editMember ? "Update" : "Create"} Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-40" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members?.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-card ${!member.is_visible ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar_url || ""} />
                        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{member.expertise}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleVisibility(member)}>
                        {member.is_visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
