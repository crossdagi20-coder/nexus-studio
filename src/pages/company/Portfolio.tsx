import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ExternalLink,
  Building2,
  Globe,
  Share2,
  Palette
} from "lucide-react";

const categories = ["All", "Architecture", "Web", "Branding", "Social Media"];

const projects = [
  {
    title: "Modern Villa Visualization",
    category: "Architecture",
    description: "Photorealistic renders for a luxury residential project",
    icon: Building2
  },
  {
    title: "E-Commerce Platform",
    category: "Web",
    description: "Full-stack online store with custom CMS",
    icon: Globe
  },
  {
    title: "Tech Startup Rebrand",
    category: "Branding",
    description: "Complete brand identity overhaul",
    icon: Palette
  },
  {
    title: "Product Launch Campaign",
    category: "Social Media",
    description: "Multi-platform social campaign",
    icon: Share2
  },
  {
    title: "Corporate HQ Interior",
    category: "Architecture",
    description: "Interior visualization for tech company",
    icon: Building2
  },
  {
    title: "SaaS Dashboard",
    category: "Web",
    description: "Analytics platform with real-time data",
    icon: Globe
  },
  {
    title: "Restaurant Identity",
    category: "Branding",
    description: "Logo, menu design, and signage",
    icon: Palette
  },
  {
    title: "Influencer Collaboration",
    category: "Social Media",
    description: "Content strategy and management",
    icon: Share2
  }
];

export default function Portfolio() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
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
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our latest projects and see how we've helped clients 
              achieve their goals through exceptional design and development.
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

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <project.icon className="w-16 h-16 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-primary font-medium mb-2">{project.category}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Want to Be Our Next Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and create something amazing together.
            </p>
            <Link to="/contact">
              <Button size="lg" className="pillowy gap-2">
                Start Your Project <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
