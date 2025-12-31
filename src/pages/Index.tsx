import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Share2, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { ParticleSphere } from "@/components/ui/ParticleSphere";
import { CounterStats } from "@/components/ui/CounterStats";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingTorus, FloatingSphere, FloatingPyramid, FloatingOctahedron } from "@/components/3d";

const services = [
  { 
    number: "01",
    title: "Architecture & 3D", 
    description: "BIM visualization, AR/VR experiences, and spatial computing for the built environment.", 
    icon: Building2,
    href: "/services/architecture",
    services: ["3D Visualization", "BIM Modeling", "AR/VR Experiences", "Spatial Computing"]
  },
  { 
    number: "02",
    title: "Web Development", 
    description: "Super animated, immersive web experiences with cutting-edge technology and modern frameworks.", 
    icon: Globe,
    href: "/services/web",
    services: ["Custom Web Apps", "E-commerce", "WebGL & 3D Web", "Performance Optimization"]
  },
  { 
    number: "03",
    title: "Social Media", 
    description: "Unified content management, AI-powered scheduling, and comprehensive analytics dashboards.", 
    icon: Share2,
    href: "/services/social",
    services: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics & Reporting"]
  },
  { 
    number: "04",
    title: "Graphic Design", 
    description: "Brand identity systems, visual design, and creative production that captures attention.", 
    icon: Palette,
    href: "/services/design",
    services: ["Brand Identity", "Visual Systems", "Print Design", "Motion Graphics"]
  },
];

const features = [
  "50+ integrated features",
  "Real-time collaboration",
  "AI-powered workflows",
  "White-label client portals",
  "Unified analytics dashboard",
  "3D model viewer & AR preview",
];

const stats = [
  { value: "500+", label: "Projects" },
  { value: "98%", label: "Satisfaction" },
  { value: "50+", label: "Team Members" },
  { value: "12", label: "Countries" },
];

export default function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const sphereY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const sphereScale = useTransform(heroScrollProgress, [0, 1], [1, 0.8]);

  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero Section - Inspired by tamalsen.dev */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Atmospheric gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 30%, hsl(25 95% 55% / 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 60%, hsl(220 40% 20% / 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 30% 70%, hsl(220 35% 15% / 0.4) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Floating 3D shapes - Warm and cool contrast */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: heroOpacity }}>
          {/* Large cube top left - Primary warm amber */}
          <div className="absolute top-[15%] left-[8%]">
            <FloatingCube size="lg" color="primary" rotateSpeed="slow" />
          </div>
          
          {/* Medium cube center right - Secondary cool */}
          <div className="absolute top-[40%] right-[5%]">
            <FloatingCube size="md" color="secondary" rotateSpeed="medium" />
          </div>
          
          {/* Small cube bottom left - Secondary cool */}
          <div className="absolute bottom-[20%] left-[15%]">
            <FloatingCube size="sm" color="secondary" rotateSpeed="slow" />
          </div>
          
          {/* Sphere with warm glow - Top right */}
          <div className="absolute top-[20%] right-[15%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
          
          {/* Additional depth shapes */}
          <div className="absolute bottom-[30%] right-[20%]">
            <FloatingPyramid size="sm" color="highlight" rotateSpeed="slow" />
          </div>
        </motion.div>
        
        {/* Hero Content - Centered massive typography */}
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            style={{ opacity: heroOpacity }}
          >
            {/* Small tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
            >
              Digital Design Studio
            </motion.p>

            {/* Massive name/title */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6"
            >
              GNEXUS
            </motion.h1>

            {/* Subtitle - Monospace style */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-muted-foreground mb-16"
            >
              Architecture &nbsp; • &nbsp; Web Development &nbsp; • &nbsp; Design
            </motion.p>

            {/* Featured in / Partners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-16 border-t border-border/30"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-6">
                As Featured In
              </p>
              <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap opacity-40">
                <span className="font-mono text-xs text-muted-foreground">ArchDaily</span>
                <span className="font-mono text-xs text-muted-foreground">Awwwards</span>
                <span className="font-mono text-xs text-muted-foreground">Behance</span>
                <span className="font-mono text-xs text-muted-foreground">Dribbble</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/30 bg-card/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-[50%] left-[5%] -translate-y-1/2 pointer-events-none opacity-50">
          <FloatingSphere size="sm" color="primary" />
        </div>
        <div className="absolute top-[50%] right-[5%] -translate-y-1/2 pointer-events-none opacity-50">
          <FloatingSphere size="sm" color="secondary" />
        </div>
        <div className="container mx-auto">
          <CounterStats stats={stats} />
        </div>
      </section>

      {/* My Expertise Section */}
      <section className="py-32 relative overflow-hidden">
        <ParallaxElement yOffset={[50, -50]} className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-2%]">
            <FloatingPyramid size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[15%] right-[3%]">
            <FloatingCube size="md" color="secondary" rotateSpeed="medium" />
          </div>
          <div className="absolute top-[50%] right-[8%]">
            <FloatingSphere size="sm" color="highlight" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
              My <span className="font-serif italic text-primary">Expertise</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {services.map((service) => (
              <StaggerItem key={service.number}>
                <ServiceCard
                  number={service.number}
                  title={service.title}
                  description={service.description}
                  services={service.services}
                  href={service.href}
                  icon={service.icon}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 relative bg-card/30 overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="max-w-4xl mx-auto text-center">
            <blockquote className="relative">
              <span className="absolute -top-8 -left-4 text-6xl text-primary/20 font-serif">"</span>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground/90 italic font-serif">
                Sometimes the best way to solve a problem is to help others.
              </p>
              <footer className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                — Design Philosophy
              </footer>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <ParallaxElement yOffset={[-30, 30]} className="absolute bottom-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[5%]">
            <FloatingTorus size="sm" color="secondary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[10%] left-[3%]">
            <FloatingSphere size="md" color="primary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideLeft">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                One Platform,
                <br />
                <span className="font-serif italic text-primary">Infinite Possibilities</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                The Gnexus ecosystem brings together 50+ features into a single, unified dashboard. 
                Manage projects, clients, content, and finances — all from one place.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.05}>
                {features.map((feature) => (
                  <StaggerItem key={feature}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            <ScrollReveal variant="slideRight" delay={0.2}>
              <ParallaxElement yOffset={[-20, 20]}>
                <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 relative">
                  <div className="absolute -top-6 -right-6 pointer-events-none">
                    <FloatingCube size="sm" color="primary" rotateSpeed="medium" />
                  </div>
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center border border-border/30">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </ParallaxElement>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <ParallaxElement yOffset={[100, -100]} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/8 to-transparent rounded-full pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingTorus size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[30%] right-[15%]">
            <FloatingSphere size="sm" color="secondary" />
          </div>
          <div className="absolute bottom-[25%] right-[10%]">
            <FloatingSphere size="md" color="highlight" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Ready to <span className="font-serif italic text-primary">Transform</span>
              <br />
              Your Digital Presence?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join the future of digital agencies. Let's create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="group h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
