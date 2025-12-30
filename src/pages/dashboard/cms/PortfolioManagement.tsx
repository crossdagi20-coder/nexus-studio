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
import { Plus, Pencil, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  usePortfolio, 
  useCreatePortfolioItem, 
  useUpdatePortfolioItem, 
  useDeletePortfolioItem,
  PortfolioItem 
} from "@/hooks/usePortfolio";
import { Skeleton } from "@/components/ui/skeleton";

export default function PortfolioManagement() {
  const { data: items, isLoading } = usePortfolio();
  const createItem = useCreatePortfolioItem();
  const updateItem = useUpdatePortfolioItem();
  const deleteItem = useDeletePortfolioItem();
  const { toast } = useToast();
  
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image_url: "",
    link_url: "",
    icon: "Briefcase",
    display_order: 0,
    is_featured: false,
    is_visible: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      image_url: "",
      link_url: "",
      icon: "Briefcase",
      display_order: 0,
      is_featured: false,
      is_visible: true,
    });
    setEditItem(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      image_url: item.image_url || "",
      link_url: item.link_url || "",
      icon: item.icon || "Briefcase",
      display_order: item.display_order,
      is_featured: item.is_featured,
      is_visible: item.is_visible,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editItem) {
        await updateItem.mutateAsync({ id: editItem.id, ...formData });
        toast({ title: "Portfolio item updated" });
      } else {
        await createItem.mutateAsync(formData);
        toast({ title: "Portfolio item created" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error saving item", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio item?")) return;
    try {
      await deleteItem.mutateAsync(id);
      toast({ title: "Portfolio item deleted" });
    } catch (error) {
      toast({ title: "Error deleting item", variant: "destructive" });
    }
  };

  const toggleVisibility = async (item: PortfolioItem) => {
    try {
      await updateItem.mutateAsync({ id: item.id, is_visible: !item.is_visible });
      toast({ title: `Item ${item.is_visible ? "hidden" : "visible"}` });
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
              <h1 className="text-2xl font-serif font-bold">Portfolio Management</h1>
              <p className="text-muted-foreground">Manage your portfolio projects</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editItem ? "Edit" : "Add"} Portfolio Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Architecture, Web Development" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                </div>
                <div>
                  <Label>Link URL</Label>
                  <Input value={formData.link_url} onChange={(e) => setFormData({ ...formData, link_url: e.target.value })} />
                </div>
                <div>
                  <Label>Icon Name</Label>
                  <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="Lucide icon name" />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_visible} onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })} />
                    <Label>Visible</Label>
                  </div>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={createItem.isPending || updateItem.isPending}>
                  {editItem ? "Update" : "Create"} Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => <Skeleton key={i} className="h-48" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`glass-card ${!item.is_visible ? "opacity-60" : ""}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                      </div>
                      <div className="flex gap-1">
                        {item.is_featured && <Badge>Featured</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleVisibility(item)}>
                        {item.is_visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
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
