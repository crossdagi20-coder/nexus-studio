import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Calendar, Instagram, Twitter, Facebook, 
  Linkedin, MoreHorizontal, Image, Heart, MessageCircle,
  Share2, Eye, Clock, Send, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface SocialPost {
  id: string;
  platform: "instagram" | "twitter" | "facebook" | "linkedin";
  content: string;
  status: "draft" | "scheduled" | "published";
  scheduledFor?: string;
  publishedAt?: string;
  engagement?: { likes: number; comments: number; shares: number };
  client?: string;
}

const mockPosts: SocialPost[] = [
  { id: "1", platform: "instagram", content: "Check out our latest project! 🚀 #design #creative", status: "published", publishedAt: "2025-01-02T10:00:00", engagement: { likes: 234, comments: 18, shares: 12 }, client: "TechCorp" },
  { id: "2", platform: "twitter", content: "Excited to announce our new partnership with @DesignStudio! Big things coming.", status: "scheduled", scheduledFor: "2025-01-05T14:00:00", client: "Design Studio" },
  { id: "3", platform: "linkedin", content: "We're hiring! Looking for talented designers to join our growing team.", status: "draft" },
  { id: "4", platform: "facebook", content: "Behind the scenes of our latest photoshoot 📸", status: "published", publishedAt: "2025-01-01T12:00:00", engagement: { likes: 156, comments: 8, shares: 24 }, client: "StartUp Nexus" },
  { id: "5", platform: "instagram", content: "New year, new projects! What are you building in 2025?", status: "scheduled", scheduledFor: "2025-01-03T09:00:00" },
];

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
};

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/15 text-pink-500",
  twitter: "bg-sky-500/15 text-sky-500",
  facebook: "bg-blue-600/15 text-blue-600",
  linkedin: "bg-blue-700/15 text-blue-700",
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-gnexus-warning/15 text-gnexus-warning border-gnexus-warning/25",
  published: "bg-gnexus-success/15 text-gnexus-success border-gnexus-success/25",
};

export default function SocialHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "all" || post.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const stats = {
    total: mockPosts.length,
    published: mockPosts.filter(p => p.status === "published").length,
    scheduled: mockPosts.filter(p => p.status === "scheduled").length,
    drafts: mockPosts.filter(p => p.status === "draft").length,
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Social Hub</h1>
          <p className="text-muted-foreground mt-1">Manage and schedule social media content</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-panel border-border/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Create Social Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <div className="flex gap-2">
                  {["instagram", "twitter", "facebook", "linkedin"].map((platform) => {
                    const Icon = platformIcons[platform];
                    return (
                      <Button key={platform} variant="outline" size="icon" className={platformColors[platform]}>
                        <Icon className="h-4 w-4" />
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea placeholder="What's on your mind?" rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Add Media</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Image className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload images or videos</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Schedule For</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>Client (Optional)</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="techcorp">TechCorp</SelectItem>
                      <SelectItem value="design">Design Studio</SelectItem>
                      <SelectItem value="startup">StartUp Nexus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Save Draft</Button>
                <Button onClick={() => setIsCreateDialogOpen(false)} className="gap-2">
                  <Send className="h-4 w-4" />
                  Schedule
                </Button>
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
            <div className="p-2 rounded-lg bg-primary/10"><Share2 className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10"><Eye className="h-5 w-5 text-gnexus-success" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.published}</p>
              <p className="text-sm text-muted-foreground">Published</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-warning/10"><Clock className="h-5 w-5 text-gnexus-warning" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.scheduled}</p>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted"><Calendar className="h-5 w-5 text-muted-foreground" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.drafts}</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
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
          <Input placeholder="Search posts..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredPosts.map((post, index) => {
          const PlatformIcon = platformIcons[post.platform];
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="glass-card p-5 hover:border-primary/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${platformColors[post.platform]}`}>
                  <PlatformIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={statusColors[post.status]}>
                      {post.status}
                    </Badge>
                    {post.client && (
                      <span className="text-sm text-muted-foreground">• {post.client}</span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {post.status === "published" && post.publishedAt && (
                      <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
                    )}
                    {post.status === "scheduled" && post.scheduledFor && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(post.scheduledFor).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                {post.engagement && (
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="h-4 w-4" /> {post.engagement.likes}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MessageCircle className="h-4 w-4" /> {post.engagement.comments}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Share2 className="h-4 w-4" /> {post.engagement.shares}
                    </span>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Post</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    {post.status === "draft" && <DropdownMenuItem>Schedule</DropdownMenuItem>}
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
