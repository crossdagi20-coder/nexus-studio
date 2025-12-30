import { motion } from "framer-motion";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock
} from "lucide-react";
import { ScrollReveal, ParallaxElement, StaggerContainer, StaggerItem, ScrollProgress } from "@/components/animations";

export default function Contact() {
  return (
    <PublicLayout>
      <ScrollProgress />
      
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParallaxElement yOffset={[0, 80]} className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal variant="fadeUp" className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a project in mind? We'd love to hear about it. 
              Let's discuss how we can help bring your vision to life.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ScrollReveal variant="slideLeft">
              <div className="glass-card p-8">
                <h2 className="font-serif text-3xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <StaggerContainer className="grid md:grid-cols-2 gap-4" staggerDelay={0.05}>
                    <StaggerItem>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </StaggerItem>
                    <StaggerItem>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </StaggerItem>
                  </StaggerContainer>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                  >
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                  >
                    <Button size="lg" className="pillowy w-full gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </form>
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal variant="slideRight" delay={0.1}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Reach out to us through any of the following channels. 
                    We typically respond within 24 hours.
                  </p>
                </div>

                <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                  <StaggerItem>
                    <motion.a 
                      href="mailto:hello@gnexus.agency" 
                      className="glass-card p-6 flex items-start gap-4 hover:border-primary/30 transition-all group block"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-muted-foreground">hello@gnexus.agency</p>
                      </div>
                    </motion.a>
                  </StaggerItem>

                  <StaggerItem>
                    <motion.a 
                      href="tel:+1234567890" 
                      className="glass-card p-6 flex items-start gap-4 hover:border-primary/30 transition-all group block"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <p className="text-muted-foreground">+1 (234) 567-890</p>
                      </div>
                    </motion.a>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="glass-card p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Visit Us</h3>
                        <p className="text-muted-foreground">123 Creative Street<br />New York, NY 10001</p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="glass-card p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM EST<br />Weekend: By appointment</p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
