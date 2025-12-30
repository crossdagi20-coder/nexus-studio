import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Globe, 
  Share2, 
  Palette,
  ArrowRight
} from "lucide-react";
import { 
  ScrollReveal, 
  TextReveal, 
  ParallaxElement,
  ScrollProgress,
  StaggerContainer, 
  StaggerItem 
} from "@/components/animations";

const services = [
  {
    icon: Building2,
    title: "Architecture & 3D",
    description: "Photorealistic renders, animated walkthroughs, and immersive VR experiences for architectural projects.",
    href: "/services/architecture",
    color: "from-primary to-primary/60"
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications, responsive designs, and e-commerce solutions built with modern technologies.",
    href: "/services/web",
    color: "from-accent to-accent/60"
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Strategic social media management, content creation, and community building to grow your brand.",
    href: "/services/social",
    color: "from-pink-500 to-purple-500"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Brand identity, print materials, digital graphics, and custom illustrations that captivate.",
    href: "/services/design",
    color: "from-amber-500 to-orange-500"
  }
];

export default function Services() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 100]} className="absolute top-20 right-20 w-96 h-96">
          <div className="w-full h-full bg-primary/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        <ParallaxElement yOffset={[0, -80]} className="absolute bottom-20 left-20 w-96 h-96">
          <div className="w-full h-full bg-accent/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <ScrollReveal variant="blur" delay={0.1}>
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
                Our <span className="text-gradient">Services</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal variant="fadeUp" delay={0.2}>
              <p className="text-xl text-muted-foreground">
                Comprehensive digital solutions to elevate your brand, 
                engage your audience, and drive business growth.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title} variant="fadeUp">
                <Link to={service.href} className="block h-full">
                  <div className="glass-card p-8 h-full group hover:border-primary/30 transition-all duration-300 cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-3xl font-semibold mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and find the perfect solution for your needs.
            </p>
            <Link to="/contact">
              <Button size="lg" className="pillowy gap-2">
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}