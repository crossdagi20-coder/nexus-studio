import { motion } from "framer-motion";
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
  CheckCircle,
  Palette
} from "lucide-react";

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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Code2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Web Development</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Build Powerful
              <span className="text-gradient"> Digital Experiences </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              From stunning marketing sites to complex web applications, we create 
              digital products that drive results and delight users.
            </p>
            
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
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Web Development Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end web solutions tailored to your business needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-muted-foreground">Modern technologies for modern solutions</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-background border border-border text-sm font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center max-w-3xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
