import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useJobPostings, 
  useCreateJobPosting, 
  useUpdateJobPosting, 
  useDeleteJobPosting,
  JobPosting 
} from "@/hooks/useJobPostings";
import { Skeleton } from "@/components/ui/skeleton";

export default function CareersManagement() {
  const { data: jobs, isLoading } = useJobPostings();
  const createJob = useCreateJobPosting();
  const updateJob = useUpdateJobPosting();
  const deleteJob = useDeleteJobPosting();
  const { toast } = useToast();
  
  const [editJob, setEditJob] = useState<JobPosting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: [] as string[],
    is_active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: [],
      is_active: true,
    });
    setEditJob(null);
  };

  const handleEdit = (job: JobPosting) => {
    setEditJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description || "",
      requirements: job.requirements || [],
      is_active: job.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editJob) {
        await updateJob.mutateAsync({ id: editJob.id, ...formData });
        toast({ title: "Job posting updated" });
      } else {
        await createJob.mutateAsync(formData);
        toast({ title: "Job posting created" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error saving job", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job posting?")) return;
    try {
      await deleteJob.mutateAsync(id);
      toast({ title: "Job posting deleted" });
    } catch (error) {
      toast({ title: "Error deleting job", variant: "destructive" });
    }
  };

  const toggleActive = async (job: JobPosting) => {
    try {
      await updateJob.mutateAsync({ id: job.id, is_active: !job.is_active });
      toast({ title: `Job ${job.is_active ? "deactivated" : "activated"}` });
    } catch (error) {
      toast({ title: "Error updating job", variant: "destructive" });
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
              <h1 className="text-2xl font-serif font-bold">Careers Management</h1>
              <p className="text-muted-foreground">Manage job postings</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Job</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editJob ? "Edit" : "Add"} Job Posting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Job Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} placeholder="e.g., Engineering, Design" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g., Remote, Hybrid, On-site" />
                </div>
                <div>
                  <Label>Type</Label>
                  <Input value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} placeholder="e.g., Full-time, Part-time" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                  <Label>Active (visible on website)</Label>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={createJob.isPending || updateJob.isPending}>
                  {editJob ? "Update" : "Create"} Job Posting
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
        ) : (
          <div className="space-y-4">
            {jobs?.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-card ${!job.is_active ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Badge variant="secondary">{job.department}</Badge>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />{job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />{job.type}
                          </span>
                        </div>
                      </div>
                      <Badge variant={job.is_active ? "default" : "secondary"}>
                        {job.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(job)}>
                        <Pencil className="h-3 w-3 mr-1" />Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleActive(job)}>
                        {job.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(job.id)}>
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
