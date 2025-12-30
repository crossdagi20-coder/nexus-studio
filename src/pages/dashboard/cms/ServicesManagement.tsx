import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Pencil, ArrowLeft, Eye, EyeOff, Building2, Globe, Users, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useServicesContent, 
  useUpdateServiceContent, 
  ServiceContent 
} from "@/hooks/useServicesContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, any> = {
  Building2,
  Globe,
  Users,
  Palette,
};

export default function ServicesManagement() {
  const { data: services, isLoading } = useServicesContent();
  const updateService = useUpdateServiceContent();
  const { toast } = useToast();
  
  const [editService, setEditService] = useState<ServiceContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: "",
    icon: "Building2",
    is_visible: true,
  });

  const handleEdit = (service: ServiceContent) => {
    setEditService(service);
    setFormData({
      title: service.title,
      subtitle: service.subtitle || "",
      description: service.description || "",
      features: Array.isArray(service.features) ? service.features.join(", ") : "",
      icon: service.icon || "Building2",
      is_visible: service.is_visible,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!editService) return;
    try {
      await updateService.mutateAsync({ 
        id: editService.id, 
        ...formData,
        features: formData.features.split(",").map(f => f.trim()).filter(Boolean)
      });
      toast({ title: "Service updated" });
      setIsDialogOpen(false);
      setEditService(null);
    } catch (error) {
      toast({ title: "Error saving service", variant: "destructive" });
    }
  };

  const toggleVisibility = async (service: ServiceContent) => {
    try {
      await updateService.mutateAsync({ id: service.id, is_visible: !service.is_visible });
      toast({ title: `Service ${service.is_visible ? "hidden" : "visible"}` });
    } catch (error) {
      toast({ title: "Error updating visibility", variant: "destructive" });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard/cms"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-serif font-bold">Services Management</h1>
            <p className="text-muted-foreground">Edit service page content</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-48" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services?.map((service, index) => {
              const IconComponent = iconMap[service.icon || "Building2"] || Building2;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`glass-card ${!service.is_visible ? "opacity-60" : ""}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{service.service_type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{service.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {Array.isArray(service.features) && service.features.slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{feature}</Badge>
                        ))}
                        {Array.isArray(service.features) && service.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{service.features.length - 3}</Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                          <Pencil className="h-3 w-3 mr-1" />Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => toggleVisibility(service)}>
                          {service.is_visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div>
                <Label>Features (comma-separated)</Label>
                <Textarea 
                  value={formData.features} 
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })} 
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              <div>
                <Label>Icon</Label>
                <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} placeholder="Building2, Globe, Users, Palette" />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={formData.is_visible} onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })} />
                <Label>Visible on website</Label>
              </div>
              <Button onClick={handleSubmit} className="w-full" disabled={updateService.isPending}>
                Update Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
