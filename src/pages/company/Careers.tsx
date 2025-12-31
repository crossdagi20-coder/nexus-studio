import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Heart,
  Users,
  Zap,
  Coffee,
  Laptop,
  ArrowRight
} from "lucide-react";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";
import { FloatingCube, FloatingSphere, FloatingPyramid, FloatingTorus, FloatingOctahedron } from "@/components/3d";

const benefits = [
  { icon: Heart, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: Coffee, title: "Flexible Hours", description: "Work when you're most productive" },
  { icon: Laptop, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Zap, title: "Learning Budget", description: "$2,000 annual learning and development stipend" },
  { icon: Users, title: "Team Events", description: "Regular team retreats and social events" },
  { icon: Clock, title: "Unlimited PTO", description: "Take the time you need to recharge" }
];

const openings = [
  {
    title: "Senior 3D Artist",
    department: "Visualization",
    location: "Remote",
    type: "Full-time",
    description: "Create stunning architectural visualizations and animations."
  },
  {
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build scalable web applications using React and Node.js."
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design beautiful and intuitive user experiences."
  },
  {
    title: "Social Media Manager",
    department: "Marketing",
    location: "Hybrid - NYC",
    type: "Full-time",
    description: "Lead social media strategy for our clients."
  }
];

export default function Careers() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 100]} className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating 3D shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%]">
            <FloatingCube size="lg" color="accent" rotateSpeed="slow" />
          </div>
          <div className="absolute top-[50%] right-[5%]">
            <FloatingSphere size="md" color="primary" />
          </div>
          <div className="absolute bottom-[20%] right-[15%]">
            <FloatingPyramid size="sm" color="gold" rotateSpeed="medium" />
          </div>
          <div className="absolute bottom-[40%] left-[5%]">
            <FloatingTorus size="md" color="coral" rotateSpeed="slow" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp" className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Join the <span className="text-gradient">Gnexus</span> Team
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're always looking for talented individuals who are passionate about 
              creating exceptional digital experiences. Join us and help shape the future.
            </p>
            <Button size="lg" className="pillowy gap-2" onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>
              View Open Positions <ArrowRight className="w-4 h-4" />
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <ParallaxElement yOffset={[-30, 30]} className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] right-[5%]">
            <FloatingOctahedron size="md" color="accent" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[10%] left-[5%]">
            <FloatingSphere size="sm" color="primary" />
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Why Work With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title} variant="fadeUp">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 h-full"
                >
                  <benefit.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[3%]">
            <FloatingCube size="sm" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] right-[3%]">
            <FloatingPyramid size="md" color="gold" rotateSpeed="medium" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fadeUp" className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your next role and join our growing team.
            </p>
          </ScrollReveal>

          <StaggerContainer className="max-w-3xl mx-auto space-y-4" staggerDelay={0.1}>
            {openings.map((job) => (
              <StaggerItem key={job.title} variant="slideRight">
                <motion.div
                  whileHover={{ x: 5, borderColor: "hsl(var(--primary) / 0.3)" }}
                  className="glass-card p-6 group cursor-pointer transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Briefcase className="w-4 h-4" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <Button className="pillowy shrink-0">
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%]">
            <FloatingTorus size="lg" color="primary" rotateSpeed="slow" />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <FloatingSphere size="md" color="accent" />
          </div>
        </div>
        
        <div className="container mx-auto px-6">
          <ScrollReveal variant="scaleUp" className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Don't See Your Role?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We're always interested in meeting talented people. Send us your resume 
              and we'll reach out when we have a position that matches your skills.
            </p>
            <Button size="lg" variant="outline" className="pillowy-ghost gap-2">
              Send Your Resume <ArrowRight className="w-4 h-4" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
