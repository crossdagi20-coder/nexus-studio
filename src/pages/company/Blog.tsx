import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Tag
} from "lucide-react";

const categories = ["All", "Design", "Development", "Business", "Industry News"];

const posts = [
  {
    title: "The Future of Architectural Visualization",
    excerpt: "Exploring how AI and real-time rendering are transforming the way we present architectural designs.",
    category: "Industry News",
    author: "Sarah Chen",
    date: "Dec 15, 2024",
    readTime: "5 min read"
  },
  {
    title: "10 Web Design Trends for 2025",
    excerpt: "From glassmorphism to AI-powered personalization, here's what's shaping the web design landscape.",
    category: "Design",
    author: "Marcus Johnson",
    date: "Dec 10, 2024",
    readTime: "8 min read"
  },
  {
    title: "Building Scalable React Applications",
    excerpt: "Best practices for structuring large-scale React projects that are easy to maintain and extend.",
    category: "Development",
    author: "Alex Rivera",
    date: "Dec 5, 2024",
    readTime: "12 min read"
  },
  {
    title: "Social Media Strategy for B2B Companies",
    excerpt: "How to leverage LinkedIn and other platforms to generate leads and build brand authority.",
    category: "Business",
    author: "Emily Watson",
    date: "Nov 28, 2024",
    readTime: "6 min read"
  },
  {
    title: "Color Theory in Brand Design",
    excerpt: "Understanding the psychology of color and how to use it effectively in your brand identity.",
    category: "Design",
    author: "Sarah Chen",
    date: "Nov 20, 2024",
    readTime: "7 min read"
  },
  {
    title: "Performance Optimization for Modern Websites",
    excerpt: "Techniques and tools to make your website lightning fast and improve user experience.",
    category: "Development",
    author: "Marcus Johnson",
    date: "Nov 15, 2024",
    readTime: "10 min read"
  }
];

export default function Blog() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and industry news from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Tag className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/10">{post.category}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="pillowy-ghost gap-2">
              Load More Posts <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none"
              />
              <Button className="pillowy">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
