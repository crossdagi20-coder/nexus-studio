import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Share2, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import { ParticleSphere } from "@/components/ui/ParticleSphere";
import { CounterStats } from "@/components/ui/CounterStats";
import { ServiceCard } from "@/components/ui/ServiceCard";

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
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Light ray effect from top-left */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "conic-gradient(from 200deg at 0% 0%, transparent 0deg, hsl(250 85% 65% / 0.15) 30deg, transparent 60deg)"
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left: Content */}
            <div className="pt-20 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                  Digital Design Studio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 tracking-tight"
              >
                Building{" "}
                <span className="font-serif italic">Digital</span>
                <br />
                <span className="font-serif italic">Solutions</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground max-w-md mb-12 leading-relaxed"
              >
                Gnexus is the convergence of architecture, web development, social media, 
                and design — unified in one powerful ecosystem.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
            </div>

            {/* Right: Particle Sphere */}
            <div className="hidden lg:block h-[500px] xl:h-[600px]">
              <ParticleSphere />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <CounterStats stats={stats} />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Our <span className="font-serif italic">Services</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                number={service.number}
                title={service.title}
                description={service.description}
                services={service.services}
                href={service.href}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative bg-card/50">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-border/30">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
