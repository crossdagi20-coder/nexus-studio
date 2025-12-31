import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  ArrowRight,
  Building2,
  Globe,
  Share2,
  Palette
} from "lucide-react";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingTorus, FloatingPyramid, FloatingSphere, FloatingOctahedron } from "@/components/3d";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in every project, never settling for mediocrity."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe the best results come from working closely with our clients as partners."
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We love what we do, and that passion shows in the quality of our work."
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We stay ahead of trends and embrace new technologies to deliver cutting-edge solutions."
  }
];

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "15", label: "Team Members" }
];

const team = [
  { name: "Alex Rivera", role: "Founder & CEO", expertise: "Strategy" },
  { name: "Sarah Chen", role: "Creative Director", expertise: "Design" },
  { name: "Marcus Johnson", role: "Lead Developer", expertise: "Engineering" },
  { name: "Emily Watson", role: "3D Artist Lead", expertise: "Visualization" }
];

export default function About() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 100]} className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%]">
            <FloatingCube size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[45%] right-[5%]">
            <FloatingSphere size="md" color="secondary" />
          </div>
          <div className="absolute bottom-[20%] right-[15%]">
            <FloatingOctahedron size="sm" color="highlight" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[30%] left-[5%]">
            <FloatingPyramid size="md" color="primary" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp">
            <div className="max-w-3xl">
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
                About <span className="text-gradient">Gnexus</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're a next-generation digital agency delivering architectural visualization, 
                web development, and creative solutions through a unified ecosystem. 
                Our mission is to help businesses thrive in the digital age.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-[50%] left-[3%] -translate-y-1/2 pointer-events-none">
          <FloatingSphere size="sm" color="primary" />
        </div>
        <div className="absolute top-[50%] right-[3%] -translate-y-1/2 pointer-events-none">
          <FloatingSphere size="sm" color="secondary" />
        </div>
        
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[5%]">
            <FloatingCube size="md" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <FloatingPyramid size="sm" color="secondary" rotateSpeed="medium" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="slideLeft">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Founded in 2016, Gnexus began with a simple vision: to bridge the gap 
                  between creativity and technology. What started as a small studio has 
                  grown into a full-service digital agency.
                </p>
                <p>
                  Today, we work with clients ranging from innovative startups to 
                  established enterprises, delivering solutions that combine stunning 
                  design with powerful functionality.
                </p>
                <p>
                  Our multidisciplinary team brings together expertise in architecture, 
                  design, development, and marketing to create holistic digital experiences.
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
              {[Building2, Globe, Share2, Palette].map((Icon, index) => (
                <StaggerItem key={index} variant="scaleUp">
                  <ParallaxElement yOffset={[index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 10 : -10]}>
                    <div className="glass-card p-8 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary/60" />
                    </div>
                  </ParallaxElement>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <ParallaxElement yOffset={[-50, 50]} className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[8%]">
            <FloatingTorus size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[15%] left-[5%]">
            <FloatingSphere size="md" color="secondary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title} variant="fadeUp">
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%]">
            <FloatingCube size="sm" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[10%] right-[5%]">
            <FloatingCube size="sm" color="secondary" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[10%] left-[8%]">
            <FloatingSphere size="sm" color="highlight" />
          </div>
          <div className="absolute bottom-[10%] right-[8%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The talented people behind our success.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {team.map((member) => (
              <StaggerItem key={member.name} variant="fadeUp">
                <div className="glass-card p-6 text-center group">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal variant="fadeIn" delay={0.4} className="text-center mt-12">
            <Link to="/careers">
              <Button variant="outline" className="pillowy-ghost gap-2">
                Join Our Team <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingPyramid size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <FloatingSphere size="md" color="secondary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create something extraordinary together.
            </p>
            <Link to="/contact">
              <Button size="lg" className="pillowy gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
