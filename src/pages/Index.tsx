import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Share2, Palette, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { TextMarquee } from "@/components/ui/Marquee";
import { BentoGrid, BentoItem, BentoStatCard } from "@/components/ui/BentoGrid";
import { ScrollReveal, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingSphere, FloatingPyramid, FloatingTorus } from "@/components/3d";

const services = [
  { icon: Building2, title: "Architecture & 3D", href: "/services/architecture" },
  { icon: Globe, title: "Web Development", href: "/services/web" },
  { icon: Share2, title: "Social Media", href: "/services/social" },
  { icon: Palette, title: "Graphic Design", href: "/services/design" },
];

export default function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <PublicLayout>
      <CustomCursor />
      <ScrollProgress />
      
      {/* Hero - Inspired by vanholtz + whosbl33h */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Glowing blobs */}
        <div className="glow-blob w-[600px] h-[600px] bg-primary/20 top-[10%] left-[-10%]" />
        <div className="glow-blob w-[500px] h-[500px] bg-accent/15 bottom-[10%] right-[-10%] animation-delay-200" />
        
        {/* Floating shapes */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: heroOpacity }}>
          <div className="absolute top-[15%] left-[5%]"><FloatingCube size="lg" color="primary" rotateSpeed="slow" /></div>
          <div className="absolute top-[25%] right-[8%]"><FloatingSphere size="md" color="secondary" /></div>
          <div className="absolute bottom-[20%] left-[12%]"><FloatingPyramid size="sm" color="highlight" rotateSpeed="medium" /></div>
          <div className="absolute bottom-[30%] right-[15%]"><FloatingTorus size="sm" color="primary" rotateSpeed="slow" /></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Digital Design Studio</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
            >
              We craft
              <br />
              <span className="text-primary glow-text">digital</span> experiences
              <br />
              that <span className="text-accent">inspire</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
            >
              Architecture visualization, immersive web experiences, and creative solutions for forward-thinking brands.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/portfolio">
                <Button size="lg" className="btn-pillowy h-14 px-8 text-lg group" data-cursor-text="View Work">
                  <span>See Our Work</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl border-border/50 hover:border-primary/50 hover:bg-primary/5">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2"
          >
            <motion.div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Text */}
      <section className="py-8 border-y border-border/20 overflow-hidden">
        <TextMarquee 
          text="GNEXUS" 
          textClassName="text-foreground/5" 
          speed="slow"
        />
      </section>

      {/* Bento Grid Services */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Our <span className="text-primary">Services</span>
            </h2>
          </ScrollReveal>

          <BentoGrid columns={4}>
            <BentoStatCard value="500+" label="Projects Delivered" className="md:col-span-1" />
            
            {services.map((service, i) => (
              <BentoItem key={i} gradient="primary" delay={i * 0.1} className="group">
                <Link to={service.href} className="block h-full">
                  <div className="flex flex-col h-full">
                    <service.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </BentoItem>
            ))}

            <BentoStatCard value="98%" label="Client Satisfaction" />
            <BentoStatCard value="12" label="Countries" />
          </BentoGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="glow-blob w-[800px] h-[800px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to <span className="text-primary glow-text">start</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Let's create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button size="lg" className="btn-pillowy h-16 px-12 text-lg group">
                <span>Get in Touch</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
