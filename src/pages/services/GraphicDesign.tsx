import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Palette, 
  Brush, 
  FileImage, 
  Layout, 
  Shapes,
  ArrowRight,
  Sparkles,
  PenTool
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
    icon: Shapes,
    title: "Brand Identity",
    description: "Complete brand systems including logos, color palettes, typography, and brand guidelines."
  },
  {
    icon: Layout,
    title: "Print Design",
    description: "Eye-catching brochures, business cards, posters, and marketing collateral."
  },
  {
    icon: FileImage,
    title: "Digital Graphics",
    description: "Social media graphics, web banners, email templates, and digital ads."
  },
  {
    icon: PenTool,
    title: "Illustration",
    description: "Custom illustrations, icons, and infographics that tell your story."
  }
];

const portfolio = [
  { title: "Brand Refresh", category: "Branding" },
  { title: "Marketing Campaign", category: "Digital" },
  { title: "Product Packaging", category: "Print" },
  { title: "Icon Set Design", category: "Illustration" }
];

export default function GraphicDesign() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[30, -70]} className="absolute top-40 left-40 w-96 h-96">
          <div className="w-full h-full bg-amber-500/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <ScrollReveal variant="slideRight" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Brush className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-500">Graphic Design</span>
              </div>
            </ScrollReveal>
            
            <div className="mb-6">
              <TextReveal 
                className="font-serif text-5xl md:text-7xl font-bold leading-tight"
                delay={0.2}
              >
                Design That Captivates & Converts
              </TextReveal>
            </div>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                From bold brand identities to stunning marketing materials, 
                we create designs that make lasting impressions and drive action.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="pillowy gap-2">
                    Start Designing <ArrowRight className="w-4 h-4" />
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
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Design Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Creative solutions for every touchpoint of your brand.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title} variant="fadeUp">
                <div className="glass-card p-8 group hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Recent Work</h2>
            <p className="text-muted-foreground">A glimpse of our creative projects</p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
            {portfolio.map((item) => (
              <StaggerItem key={item.title} variant="scaleUp">
                <div className="aspect-square glass-card p-6 flex flex-col justify-end group cursor-pointer hover:border-amber-500/30 transition-all">
                  <Palette className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="fadeUp" delay={0.3} className="text-center mt-12">
            <Link to="/portfolio">
              <Button variant="outline" className="pillowy-ghost gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="max-w-3xl mx-auto">
            <div className="glass-card p-12 text-center">
              <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              <h2 className="font-serif text-4xl font-bold mb-4">Ready to Stand Out?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's create designs that elevate your brand.
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