import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Tag
} from "lucide-react";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingSphere, FloatingPyramid, FloatingTorus } from "@/components/3d";

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
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 80]} className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[10%]">
            <FloatingCube size="md" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[30%] right-[5%]">
            <FloatingSphere size="sm" color="secondary" />
          </div>
          <div className="absolute bottom-[40%] left-[5%]">
            <FloatingPyramid size="sm" color="highlight" rotateSpeed="medium" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tutorials, and industry news from our team of experts.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 relative">
        <div className="container mx-auto px-6">
          <StaggerContainer className="flex flex-wrap justify-center gap-3" staggerDelay={0.04}>
            {categories.map((category, index) => (
              <StaggerItem key={category}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    index === 0 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-[3%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
          <div className="absolute bottom-[20%] right-[3%]">
            <FloatingTorus size="md" color="secondary" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
            {posts.map((post) => (
              <StaggerItem key={post.title} variant="fadeUp">
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card overflow-hidden group cursor-pointer h-full"
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
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="fadeIn" delay={0.3} className="text-center mt-12">
            <Button variant="outline" className="pillowy-ghost gap-2">
              Load More Posts <ArrowRight className="w-4 h-4" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingCube size="md" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <FloatingSphere size="sm" color="secondary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp">
            <div className="glass-card p-12 text-center max-w-3xl mx-auto relative">
              <div className="absolute -top-6 -right-6 pointer-events-none">
                <FloatingPyramid size="sm" color="highlight" rotateSpeed="medium" />
              </div>
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
