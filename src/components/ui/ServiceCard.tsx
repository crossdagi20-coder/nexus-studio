import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  services: string[];
  href: string;
  icon: LucideIcon;
}

export function ServiceCard({ number, title, description, services, href, icon: Icon }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={href}>
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/30 hover:bg-card/80">
          {/* Gradient border effect on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, hsl(250 85% 65% / 0.1), hsl(180 90% 55% / 0.05))",
            }}
          />

          <div className="relative z-10">
            {/* Number and Icon */}
            <div className="flex items-start justify-between mb-6">
              <span className="text-5xl font-light text-muted-foreground/30 tracking-tighter">
                {number}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-semibold mb-4 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>

            {/* Services list - expandable */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: isHovered ? "auto" : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Services
                </p>
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-sm text-foreground/80">
                      <ChevronRight className="w-3 h-3 text-primary" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Arrow indicator */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 5 : 0 }}
              className="absolute bottom-8 right-8 text-primary"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
