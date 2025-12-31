import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveClock } from "@/components/ui/LiveClock";

const footerLinks = {
  services: [
    { name: "Architecture & 3D", href: "/services/architecture" },
    { name: "Web Development", href: "/services/web" },
    { name: "Social Media", href: "/services/social" },
    { name: "Graphic Design", href: "/services/design" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socials = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "GitHub", href: "#", icon: Github },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      {/* Aurora background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow-blob w-[600px] h-[600px] bg-primary/5 bottom-[-30%] left-[-10%]" />
        <div className="glow-blob w-[500px] h-[500px] bg-accent/5 bottom-[-20%] right-[-10%]" />
      </div>

      {/* Pre-footer CTA Banner */}
      <div className="relative border-b border-border/30">
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-4">
                Let's work
                <br />
                <span className="aurora-text">together</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Have a project in mind? We'd love to hear about it. Let's create something extraordinary.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/contact">
                <Button size="lg" className="btn-pillowy h-16 px-10 text-lg group">
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <span className="font-display font-bold text-2xl tracking-tight group-hover:aurora-text transition-all duration-300">
                GNEXUS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A next-generation digital agency delivering architectural visualization, 
              web development, and creative solutions.
            </p>
            <a 
              href="mailto:hello@gnexus.agency" 
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
            >
              <span className="link-underline">hello@gnexus.agency</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary mb-6 font-medium">
              Services
            </h4>
            <ul className="space-y-4">
              {footerLinks.services.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary mb-6 font-medium">
              Company
            </h4>
            <ul className="space-y-4">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary mb-6 font-medium">
              Legal
            </h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-primary mb-6 font-medium">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gnexus. All rights reserved.
          </p>
          
          <LiveClock />
        </div>
      </div>
    </footer>
  );
}
