import { motion } from "framer-motion";
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
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Architecture & 3D Visualization</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Bring Your
              <span className="text-gradient"> Architectural Vision </span>
              to Life
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              From concept sketches to photorealistic renders, we transform architectural designs 
              into compelling visual experiences that win clients and stakeholders.
            </p>
            
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
              Our 3D Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive architectural visualization solutions for every stage of your project.
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
                className="glass-card p-8 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our
                <span className="text-gradient"> 3D Visualization</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our architectural visualization services help you communicate your vision 
                effectively, reduce costly revisions, and close deals faster.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
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
            </motion.div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
