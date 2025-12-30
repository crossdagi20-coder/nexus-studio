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
import { Plus, Pencil, Trash2, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  useBlogPosts, 
  useCreateBlogPost, 
  useUpdateBlogPost, 
  useDeleteBlogPost,
  BlogPost 
} from "@/hooks/useBlogPosts";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function BlogManagement() {
  const { data: posts, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();
  const { toast } = useToast();
  
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author_name: "",
    category: "",
    tags: [] as string[],
    featured_image: "",
    read_time: "5 min read",
    is_published: false,
    published_at: null as string | null,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author_name: "",
      category: "",
      tags: [],
      featured_image: "",
      read_time: "5 min read",
      is_published: false,
      published_at: null,
    });
    setEditPost(null);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleEdit = (post: BlogPost) => {
    setEditPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      author_name: post.author_name,
      category: post.category,
      tags: post.tags || [],
      featured_image: post.featured_image || "",
      read_time: post.read_time || "5 min read",
      is_published: post.is_published,
      published_at: post.published_at,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const dataToSubmit = {
        ...formData,
        published_at: formData.is_published && !formData.published_at ? new Date().toISOString() : formData.published_at,
      };
      
      if (editPost) {
        await updatePost.mutateAsync({ id: editPost.id, ...dataToSubmit });
        toast({ title: "Blog post updated" });
      } else {
        await createPost.mutateAsync(dataToSubmit);
        toast({ title: "Blog post created" });
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ title: "Error saving post", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deletePost.mutateAsync(id);
      toast({ title: "Blog post deleted" });
    } catch (error) {
      toast({ title: "Error deleting post", variant: "destructive" });
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      await updatePost.mutateAsync({ 
        id: post.id, 
        is_published: !post.is_published,
        published_at: !post.is_published ? new Date().toISOString() : post.published_at
      });
      toast({ title: `Post ${post.is_published ? "unpublished" : "published"}` });
    } catch (error) {
      toast({ title: "Error updating post", variant: "destructive" });
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
              <h1 className="text-2xl font-serif font-bold">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage blog posts</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />Add Post</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editPost ? "Edit" : "Add"} Blog Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input 
                    value={formData.title} 
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      title: e.target.value,
                      slug: !editPost ? generateSlug(e.target.value) : formData.slug
                    })} 
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Author Name</Label>
                    <Input value={formData.author_name} onChange={(e) => setFormData({ ...formData, author_name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea 
                    value={formData.content} 
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                    className="min-h-[200px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Featured Image URL</Label>
                    <Input value={formData.featured_image} onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} />
                  </div>
                  <div>
                    <Label>Read Time</Label>
                    <Input value={formData.read_time} onChange={(e) => setFormData({ ...formData, read_time: e.target.value })} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
                  <Label>Published</Label>
                </div>
                <Button onClick={handleSubmit} className="w-full" disabled={createPost.isPending || updatePost.isPending}>
                  {editPost ? "Update" : "Create"} Post
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
            {posts?.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span>{post.author_name}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />{post.read_time}
                          </span>
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at), "MMM d, yyyy")}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant={post.is_published ? "default" : "secondary"}>
                        {post.is_published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                        <Pencil className="h-3 w-3 mr-1" />Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => togglePublished(post)}>
                        {post.is_published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
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
