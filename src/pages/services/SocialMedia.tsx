import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Share2, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3,
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
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
    icon: Target,
    title: "Strategy Development",
    description: "Data-driven social media strategies tailored to your brand goals and target audience."
  },
  {
    icon: Users,
    title: "Community Management",
    description: "Build and nurture engaged communities that become brand advocates."
  },
  {
    icon: TrendingUp,
    title: "Content Creation",
    description: "Compelling visual and written content that resonates with your audience."
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive insights and performance tracking to optimize your results."
  }
];

const platforms = [
  { icon: Instagram, name: "Instagram", color: "from-pink-500 to-purple-500" },
  { icon: Twitter, name: "Twitter", color: "from-blue-400 to-blue-600" },
  { icon: Linkedin, name: "LinkedIn", color: "from-blue-600 to-blue-800" },
  { icon: Facebook, name: "Facebook", color: "from-blue-500 to-blue-700" }
];

export default function SocialMedia() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[40, -80]} className="absolute bottom-20 right-20 w-96 h-96">
          <div className="w-full h-full bg-pink-500/20 rounded-full blur-[120px]" />
        </ParallaxElement>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <ScrollReveal variant="blur" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
                <Share2 className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-pink-500">Social Media Management</span>
              </div>
            </ScrollReveal>
            
            <div className="mb-6">
              <TextReveal 
                className="font-serif text-5xl md:text-7xl font-bold leading-tight"
                delay={0.2}
              >
                Amplify Your Social Presence
              </TextReveal>
            </div>
            
            <ScrollReveal variant="fadeUp" delay={0.4}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Strategic social media management that builds brand awareness, 
                engages your audience, and drives measurable business results.
              </p>
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="pillowy gap-2">
                    Boost Your Social <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="pillowy-ghost">
                    See Results
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-12">
            <h2 className="font-serif text-2xl font-semibold">Platforms We Master</h2>
          </ScrollReveal>

          <StaggerContainer className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform) => (
              <StaggerItem key={platform.name} variant="scaleUp">
                <div className="glass-card p-6 flex flex-col items-center gap-3 min-w-[140px] hover:border-pink-500/30 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{platform.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our Social Media Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive social media solutions to grow your brand online.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title} variant="fadeUp">
                <div className="glass-card p-8 group hover:border-pink-500/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="max-w-3xl mx-auto">
            <div className="glass-card p-12 text-center">
              <Share2 className="w-16 h-16 text-pink-500 mx-auto mb-6" />
              <h2 className="font-serif text-4xl font-bold mb-4">Ready to Go Viral?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's create a social media strategy that gets results.
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