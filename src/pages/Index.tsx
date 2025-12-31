import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Share2, Palette, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { TextMarquee } from "@/components/ui/Marquee";
import { BentoGrid, BentoItem, BentoStatCard } from "@/components/ui/BentoGrid";
import { ClientLogos } from "@/components/ui/ClientLogos";
import { CounterStats } from "@/components/ui/CounterStats";
import { ScrollReveal, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingSphere, FloatingPyramid, FloatingTorus, FloatingOctahedron } from "@/components/3d";

const services = [
  { icon: Building2, title: "Architecture & 3D", description: "Immersive visualizations", href: "/services/architecture" },
  { icon: Globe, title: "Web Development", description: "Digital experiences", href: "/services/web" },
  { icon: Share2, title: "Social Media", description: "Brand amplification", href: "/services/social" },
  { icon: Palette, title: "Graphic Design", description: "Visual identity", href: "/services/design" },
];

const stats = [
  { value: "500+", label: "Projects" },
  { value: "12", label: "Countries" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Clients" },
];

export default function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero - Split Screen Layout */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Aurora background blobs */}
        <div className="glow-blob w-[700px] h-[700px] bg-primary/15 top-[-10%] left-[-15%]" />
        <div className="glow-blob w-[600px] h-[600px] bg-accent/10 bottom-[0%] right-[-10%] animation-delay-200" />
        <div className="glow-blob w-[400px] h-[400px] bg-highlight/10 top-[40%] right-[20%] animation-delay-300" />
        
        <div className="container mx-auto px-6 h-screen">
          <div className="split-hero h-full pt-24">
            {/* Left - Content */}
            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }}
              className="split-hero-content"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 w-fit"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Digital Design Studio</span>
              </motion.div>

              {/* Main headline - Word highlight style */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]"
              >
                We create
                <br />
                <span className="aurora-text">digital</span> experiences
                <br />
                that <span className="text-highlight glow-text">inspire</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10"
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
                  <Button size="lg" className="btn-pillowy h-14 px-8 text-lg group">
                    <span>See Our Work</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - 3D Shapes Composition */}
            <motion.div 
              style={{ y: shapesY, opacity: heroOpacity }}
              className="split-hero-visual hidden lg:flex"
            >
              <div className="relative w-full h-full max-w-lg max-h-lg">
                {/* Central large sphere */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <FloatingSphere size="xl" color="primary" floatIntensity={15} />
                </motion.div>

                {/* Orbiting shapes */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute top-[15%] left-[10%]"
                >
                  <FloatingCube size="md" color="secondary" rotateSpeed="slow" floatIntensity={20} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute top-[20%] right-[5%]"
                >
                  <FloatingPyramid size="sm" color="highlight" rotateSpeed="medium" floatIntensity={25} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="absolute bottom-[25%] left-[5%]"
                >
                  <FloatingTorus size="sm" color="primary" rotateSpeed="slow" floatIntensity={18} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-[15%] right-[15%]"
                >
                  <FloatingOctahedron size="sm" color="secondary" rotateSpeed="medium" floatIntensity={22} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-wheel" />
          </div>
        </motion.div>
      </section>

      {/* Client Logos Marquee */}
      <ClientLogos />

      {/* Stats Section */}
      <section className="py-20 border-b border-border/20">
        <div className="container mx-auto px-6">
          <CounterStats stats={stats} />
        </div>
      </section>

      {/* Diagonal Typography */}
      <section className="py-32 overflow-hidden relative">
        <div className="glow-blob w-[500px] h-[500px] bg-accent/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="diagonal-text text-foreground/5 whitespace-nowrap">
            ARCHITECTURE • WEB • SOCIAL • DESIGN
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Services */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold">
              Our <span className="aurora-text">Services</span>
            </h2>
          </ScrollReveal>

          <BentoGrid columns={4}>
            <BentoStatCard value="500+" label="Projects Delivered" className="md:col-span-1" />
            
            {services.map((service, i) => (
              <BentoItem key={i} gradient="primary" delay={i * 0.1} className="group">
                <Link to={service.href} className="block h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </BentoItem>
            ))}

            <BentoStatCard value="98%" label="Client Satisfaction" />
          </BentoGrid>
        </div>
      </section>

      {/* Marquee Text */}
      <section className="py-8 border-y border-border/20 overflow-hidden">
        <TextMarquee 
          text="GNEXUS" 
          textClassName="text-foreground/5" 
          speed="slow"
        />
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden aurora-shimmer">
        <div className="glow-blob w-[800px] h-[800px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Ready to <span className="aurora-text">start</span>?
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
