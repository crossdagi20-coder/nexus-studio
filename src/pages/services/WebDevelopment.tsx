import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Code2, 
  Smartphone, 
  Zap, 
  Shield,
  ArrowRight,
  Palette
} from "lucide-react";
import { 
  ScrollReveal, 
  TextReveal, 
  ParallaxElement,
  ParallaxSection,
  ScrollProgress,
  StaggerContainer, 
  StaggerItem 
} from "@/components/animations";
import { FloatingLaptop, FloatingCube, FloatingSphere, FloatingTorus, FloatingOctahedron } from "@/components/3d";

const services = [
  {
    icon: Globe,
    title: "Custom Web Applications",
    description: "Tailored web solutions built with modern frameworks for optimal performance and scalability."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect designs that look stunning on every device, from desktop to mobile."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast load times with optimized code, caching, and CDN integration."
  },
  {
    icon: Shield,
    title: "Secure Solutions",
    description: "Enterprise-grade security with SSL, data encryption, and best practices."
  }
];

const technologies = [
  "React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"
];

export default function WebDevelopment() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[30, -60]} className="absolute top-20 left-20 w-96 h-96">
          <div className="w-full h-full bg-accent/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[8%]">
            <FloatingLaptop size="lg" />
          </div>
          <div className="absolute top-[55%] right-[5%]">
            <FloatingCube size="md" color="accent" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[15%] right-[15%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
          <div className="absolute bottom-[40%] left-[3%]">
            <FloatingOctahedron size="md" color="coral" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <ScrollReveal variant="blur" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Code2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Web Development</span>
              </div>
            </ScrollReveal>
            
            <div className="mb-6">
              <TextReveal 
                className="font-serif text-5xl md:text-7xl font-bold leading-tight"
                delay={0.2}
              >
                Build Powerful Digital Experiences
              </TextReveal>
            </div>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                From stunning marketing sites to complex web applications, we create 
                digital products that drive results and delight users.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="pillowy gap-2">
                    Start Your Project <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="pillowy-ghost">
                    See Our Work
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[3%]">
            <FloatingCube size="md" color="accent" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[10%] right-[5%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Web Development Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end web solutions tailored to your business needs.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title} variant="fadeUp">
                <div className="glass-card p-8 group hover:border-accent/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tech Stack */}
      <ParallaxSection offset={0.1} className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%]">
            <FloatingTorus size="md" color="accent" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] left-[5%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-muted-foreground">Modern technologies for modern solutions</p>
          </ScrollReveal>

          <StaggerContainer className="flex flex-wrap justify-center gap-4" staggerDelay={0.05}>
            {technologies.map((tech) => (
              <StaggerItem key={tech} variant="scaleUp">
                <div className="px-6 py-3 rounded-full bg-background border border-border text-sm font-medium hover:border-accent/50 transition-colors">
                  {tech}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingLaptop size="md" />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <FloatingTorus size="lg" color="accent" rotateSpeed="medium" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="max-w-3xl mx-auto">
            <div className="glass-card p-12 text-center relative">
              <div className="absolute -top-6 -right-6 pointer-events-none">
                <FloatingCube size="sm" color="accent" rotateSpeed="medium" />
              </div>
              <Palette className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Ready to bring your web project to life? Let's discuss your requirements.
              </p>
              <Link to="/contact">
                <Button size="lg" className="pillowy gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
