import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, GripVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useCompanyStats, 
  useCreateCompanyStat, 
  useUpdateCompanyStat, 
  useDeleteCompanyStat,
  CompanyStat 
} from "@/hooks/useCompanyStats";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageContent() {
  const { data: stats, isLoading } = useCompanyStats();
  const createStat = useCreateCompanyStat();
  const updateStat = useUpdateCompanyStat();
  const deleteStat = useDeleteCompanyStat();
  const { toast } = useToast();
  
  const [editStat, setEditStat] = useState<CompanyStat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: "",
    value: "",
    display_order: 0,
  });

  const resetForm = () => {
    setFormData({ label: "", value: "", display_order: 0 });
    setEditStat(null);
  };

  const handleEdit = (stat: CompanyStat) => {
    setEditStat(stat);
    setFormData({
      label: stat.label,
      value: stat.value,
      display_order: stat.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editStat) {
        await updateStat.mutateAsync({ id: editStat.id, ...formData });
        toast({ title: "Stat updated" });
      } else {
        await createStat.mutateAsync(formData);
        toast({ title: "Stat created" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error saving stat", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this stat?")) return;
    try {
      await deleteStat.mutateAsync(id);
      toast({ title: "Stat deleted" });
    } catch (error) {
      toast({ title: "Error deleting stat", variant: "destructive" });
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
              <h1 className="text-2xl font-serif font-bold">Page Content</h1>
              <p className="text-muted-foreground">Manage company stats and page content</p>
            </div>
          </div>
        </div>

        {/* Company Stats Section */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Company Statistics</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Stat</Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>{editStat ? "Edit" : "Add"} Statistic</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Label</Label>
                    <Input 
                      value={formData.label} 
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })} 
                      placeholder="e.g., Projects Delivered"
                    />
                  </div>
                  <div>
                    <Label>Value</Label>
                    <Input 
                      value={formData.value} 
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })} 
                      placeholder="e.g., 500+"
                    />
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input 
                      type="number" 
                      value={formData.display_order} 
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} 
                    />
                  </div>
                  <Button onClick={handleSubmit} className="w-full" disabled={createStat.isPending || updateStat.isPending}>
                    {editStat ? "Update" : "Create"} Stat
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => <Skeleton key={i} className="h-20" />)}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats?.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="glass-card group relative">
                      <CardContent className="pt-6 text-center">
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        <div className="flex justify-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(stat)}>
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(stat.id)}>
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              For more detailed page content editing, use the specific management pages for Portfolio, Team, Services, Careers, and Blog from the CMS overview.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
