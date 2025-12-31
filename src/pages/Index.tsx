import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Share2, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { ParticleSphere } from "@/components/ui/ParticleSphere";
import { CounterStats } from "@/components/ui/CounterStats";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, TextReveal, ScrollProgress } from "@/components/animations";
import { ShapesGroup, presets } from "@/components/3d";
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
  
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const sphereY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const sphereScale = useTransform(heroScrollProgress, [0, 1], [1, 0.8]);

  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Light ray effect from top-left */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "conic-gradient(from 200deg at 0% 0%, transparent 0deg, hsl(250 85% 65% / 0.15) 30deg, transparent 60deg)"
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[5%]">
            <FloatingCube size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[25%] right-[8%]">
            <FloatingTorus size="md" color="accent" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[20%] left-[10%]">
            <FloatingOctahedron size="md" color="purple" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[35%] right-[15%]">
            <FloatingSphere size="sm" color="coral" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left: Content with parallax */}
            <motion.div 
              className="pt-20 lg:pt-0"
              style={{ y: heroTextY, opacity: heroOpacity }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                  Digital Design Studio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 tracking-tight"
              >
                Building{" "}
                <span className="font-serif italic">Digital</span>
                <br />
                <span className="font-serif italic">Solutions</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground max-w-md mb-12 leading-relaxed"
              >
                Gnexus is the convergence of architecture, web development, social media, 
                and design — unified in one powerful ecosystem.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/auth?mode=signup">
                  <Button 
                    size="lg" 
                    className="group h-14 px-8 rounded-full border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-300"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button 
                    size="lg" 
                    variant="ghost" 
                    className="h-14 px-8 text-muted-foreground hover:text-foreground"
                  >
                    View Our Work
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Particle Sphere with parallax */}
            <motion.div 
              className="hidden lg:block h-[500px] xl:h-[600px]"
              style={{ y: sphereY, scale: sphereScale }}
            >
              <ParticleSphere />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/30 bg-card/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-[50%] left-[5%] -translate-y-1/2 pointer-events-none">
          <FloatingSphere size="sm" color="primary" />
        </div>
        <div className="absolute top-[50%] right-[5%] -translate-y-1/2 pointer-events-none">
          <FloatingSphere size="sm" color="accent" />
        </div>
        <div className="container mx-auto">
          <CounterStats stats={stats} />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative overflow-hidden">
        <ParallaxElement yOffset={[50, -50]} className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-2%]">
            <FloatingPyramid size="lg" color="gold" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[15%] right-[3%]">
            <FloatingCube size="md" color="primary" rotateSpeed="medium" />
          </div>
          <div className="absolute top-[50%] right-[8%]">
            <FloatingSphere size="sm" color="accent" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Our <span className="font-serif italic">Services</span>
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

      {/* Features Section */}
      <section className="py-32 relative bg-card/50 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <ParallaxElement yOffset={[-30, 30]} className="absolute bottom-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[5%]">
            <FloatingTorus size="sm" color="accent" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[10%] left-[3%]">
            <FloatingSphere size="md" color="coral" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideLeft">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                One Platform,
                <br />
                <span className="font-serif italic">Infinite Possibilities</span>
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
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-border/30">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Dashboard Preview</p>
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
        <ParallaxElement yOffset={[100, -100]} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingTorus size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[30%] right-[15%]">
            <FloatingSphere size="sm" color="accent" />
          </div>
          <div className="absolute bottom-[25%] right-[10%]">
            <FloatingSphere size="md" color="coral" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
              Ready to <span className="font-serif italic">Transform</span>
              <br />
              Your Digital Presence?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join the future of digital agencies. Let's create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="group h-14 px-10 rounded-full border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-300"
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
