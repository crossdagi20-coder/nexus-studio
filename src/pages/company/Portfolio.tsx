import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import { HorizontalGallery } from "@/components/portfolio";
import { ScrollProgress, TextReveal, ScrollReveal, ParallaxElement } from "@/components/animations";
import { FloatingCube, FloatingTorus, FloatingPyramid, FloatingSphere } from "@/components/3d";

const categories = ["All", "Architecture", "Web", "Branding", "Social Media"];

export default function Portfolio() {
  const { data: portfolioItems, isLoading } = usePortfolio();
  const visibleItems = portfolioItems?.filter(item => item.is_visible) || [];

  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 100]} className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%]">
            <FloatingCube size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] left-[5%]">
            <FloatingTorus size="md" color="secondary" rotateSpeed="medium" />
          </div>
          <div className="absolute top-[40%] right-[25%]">
            <FloatingSphere size="sm" color="highlight" />
          </div>
          <div className="absolute bottom-[30%] right-[15%]">
            <FloatingPyramid size="md" color="primary" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Our <span className="text-gradient">Portfolio</span></h1>
            <p className="text-xl text-muted-foreground">Explore our latest projects and see how we've helped clients achieve their goals through exceptional design and development.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${index === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"}`}>{category}</motion.button>
            ))}
          </div>
        </div>
      </section>

      {isLoading ? (<div className="py-32 text-center"><div className="animate-pulse text-muted-foreground">Loading projects...</div></div>) : (<HorizontalGallery items={visibleItems} />)}

      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <ParallaxElement yOffset={[-50, 50]} className="absolute top-10 right-10 pointer-events-none">
          <FloatingCube size="lg" color="primary" rotateSpeed="slow" />
        </ParallaxElement>
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Want to Be Our Next Success Story?</h2>
            <p className="text-xl text-muted-foreground mb-8">Let's discuss your project and create something amazing together.</p>
            <Link to="/contact"><Button size="lg" className="pillowy gap-2">Start Your Project <ExternalLink className="w-4 h-4" /></Button></Link>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
