import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Search, Filter, MoreHorizontal, Upload, Download,
  Image, FileText, Video, Music, Folder, Grid3X3, List,
  Eye, Trash2, Copy, Tag
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

interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "audio";
  size: string;
  uploadedAt: string;
  project?: string;
  tags: string[];
  thumbnail?: string;
}

const mockAssets: Asset[] = [
  { id: "1", name: "hero-banner.jpg", type: "image", size: "2.4 MB", uploadedAt: "2025-01-02", project: "TechCorp Website", tags: ["hero", "banner"] },
  { id: "2", name: "brand-guidelines.pdf", type: "document", size: "8.1 MB", uploadedAt: "2025-01-01", project: "Design Studio Pro", tags: ["brand", "guidelines"] },
  { id: "3", name: "product-demo.mp4", type: "video", size: "45.2 MB", uploadedAt: "2024-12-30", project: "StartUp Nexus", tags: ["demo", "product"] },
  { id: "4", name: "logo-variations.png", type: "image", size: "1.8 MB", uploadedAt: "2024-12-29", project: "TechCorp Website", tags: ["logo", "brand"] },
  { id: "5", name: "podcast-intro.mp3", type: "audio", size: "3.2 MB", uploadedAt: "2024-12-28", tags: ["audio", "podcast"] },
  { id: "6", name: "wireframes-v2.pdf", type: "document", size: "4.5 MB", uploadedAt: "2024-12-27", project: "Mobile App", tags: ["wireframe", "ux"] },
];

const typeIcons: Record<string, any> = {
  image: Image,
  video: Video,
  document: FileText,
  audio: Music,
};

const typeColors: Record<string, string> = {
  image: "bg-gnexus-success/15 text-gnexus-success",
  video: "bg-gnexus-purple/15 text-gnexus-purple",
  document: "bg-primary/15 text-primary",
  audio: "bg-gnexus-warning/15 text-gnexus-warning",
};

export default function Assets() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || asset.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const stats = {
    total: mockAssets.length,
    images: mockAssets.filter(a => a.type === "image").length,
    videos: mockAssets.filter(a => a.type === "video").length,
    documents: mockAssets.filter(a => a.type === "document").length,
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold">Assets</h1>
          <p className="text-muted-foreground mt-1">Digital asset management library</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Folder className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Assets</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-success/10"><Image className="h-5 w-5 text-gnexus-success" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.images}</p>
              <p className="text-sm text-muted-foreground">Images</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gnexus-purple/10"><Video className="h-5 w-5 text-gnexus-purple" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.videos}</p>
              <p className="text-sm text-muted-foreground">Videos</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold">{stats.documents}</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assets..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {viewMode === "grid" ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredAssets.map((asset, index) => {
            const TypeIcon = typeIcons[asset.type];
            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index }}
                className="glass-card p-4 hover:border-primary/20 transition-all group cursor-pointer"
              >
                <div className={`aspect-square rounded-lg mb-3 flex items-center justify-center ${typeColors[asset.type]}`}>
                  <TypeIcon className="h-12 w-12 opacity-50" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.size}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" />Preview</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" />Download</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Copy className="h-4 w-4" />Copy Link</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Tag className="h-4 w-4" />Edit Tags</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive gap-2"><Trash2 className="h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {asset.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {asset.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Project</th>
                <th>Uploaded</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => {
                const TypeIcon = typeIcons[asset.type];
                return (
                  <tr key={asset.id}>
                    <td className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${typeColors[asset.type]}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{asset.name}</span>
                    </td>
                    <td className="capitalize">{asset.type}</td>
                    <td className="text-muted-foreground">{asset.size}</td>
                    <td className="text-muted-foreground">{asset.project || "—"}</td>
                    <td className="text-muted-foreground">{new Date(asset.uploadedAt).toLocaleDateString()}</td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Preview</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
