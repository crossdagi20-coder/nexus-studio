import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Eye, 
  Layers, 
  Video, 
  Box, 
  Sparkles,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { 
  ScrollReveal, 
  TextReveal, 
  ParallaxElement,
  ScrollProgress,
  StaggerContainer, 
  StaggerItem 
} from "@/components/animations";
import { FloatingBuilding, FloatingPyramid, FloatingCube, FloatingSphere, FloatingTorus } from "@/components/3d";

const services = [
  {
    icon: Eye,
    title: "Photorealistic Renders",
    description: "Ultra-high-quality architectural visualizations that bring your designs to life with stunning realism."
  },
  {
    icon: Video,
    title: "Animated Walkthroughs",
    description: "Immersive video tours that allow clients to experience spaces before they're built."
  },
  {
    icon: Box,
    title: "3D Modeling",
    description: "Detailed architectural models with precise measurements and material specifications."
  },
  {
    icon: Layers,
    title: "VR Experiences",
    description: "Virtual reality presentations for an unparalleled immersive client experience."
  }
];

const benefits = [
  "Reduce revision cycles by 60%",
  "Win more client approvals",
  "Faster project timelines",
  "Stunning marketing materials"
];

export default function Architecture() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[50, -50]} className="absolute top-20 right-20 w-96 h-96">
          <div className="w-full h-full bg-primary/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[8%]">
            <FloatingBuilding size="lg" />
          </div>
          <div className="absolute top-[55%] right-[5%]">
            <FloatingPyramid size="md" color="gold" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[15%] right-[15%]">
            <FloatingCube size="sm" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[40%] left-[3%]">
            <FloatingSphere size="md" color="accent" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <ScrollReveal variant="slideLeft" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Architecture & 3D Visualization</span>
              </div>
            </ScrollReveal>
            
            <div className="mb-6">
              <TextReveal 
                className="font-serif text-5xl md:text-7xl font-bold leading-tight"
                delay={0.2}
              >
                Bring Your Architectural Vision to Life
              </TextReveal>
            </div>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                From concept sketches to photorealistic renders, we transform architectural designs 
                into compelling visual experiences that win clients and stakeholders.
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
                    View Portfolio
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
            <FloatingCube size="md" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[10%] right-[5%]">
            <FloatingPyramid size="sm" color="gold" rotateSpeed="medium" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our 3D Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive architectural visualization solutions for every stage of your project.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title} variant="fadeUp">
                <div className="glass-card p-8 group hover:border-primary/30 transition-all duration-300">
                  <ParallaxElement rotateOffset={[0, 5]}>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </ParallaxElement>
                  <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[5%]">
            <FloatingBuilding size="md" />
          </div>
          <div className="absolute bottom-[20%] left-[10%]">
            <FloatingPyramid size="sm" color="gold" rotateSpeed="medium" />
          </div>
          <div className="absolute top-[50%] right-[5%]">
            <FloatingTorus size="md" color="accent" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideRight">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our
                <span className="text-gradient"> 3D Visualization</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our architectural visualization services help you communicate your vision 
                effectively, reduce costly revisions, and close deals faster.
              </p>
              
              <StaggerContainer className="space-y-4">
                {benefits.map((benefit) => (
                  <StaggerItem key={benefit} variant="slideRight">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            <ScrollReveal variant="slideLeft">
              <div className="glass-card p-8 text-center relative">
                <div className="absolute -top-6 -right-6 pointer-events-none">
                  <FloatingCube size="sm" color="primary" rotateSpeed="medium" />
                </div>
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
                <h3 className="font-serif text-3xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-muted-foreground mb-6">
                  Let's discuss your next architectural project and create something extraordinary together.
                </p>
                <Link to="/contact">
                  <Button size="lg" className="pillowy w-full gap-2">
                    Get a Free Quote <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
