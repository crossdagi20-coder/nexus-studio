import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-serif font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="glass-card p-4 md:col-span-1 h-fit">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="glass-card p-6 md:col-span-3 space-y-6">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Profile Settings</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="john@gnexus.io" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input defaultValue="Gnexus Agency" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+1 555-0123" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              {["Email notifications", "Push notifications", "Weekly digest", "Project updates"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button>Save Changes</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
