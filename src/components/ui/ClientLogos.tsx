import { motion } from "framer-motion";

interface ClientLogosProps {
  className?: string;
}

// Placeholder logos using text - in production you'd use actual SVG logos
const clients = [
  { name: "TechCorp", initial: "TC" },
  { name: "DesignStudio", initial: "DS" },
  { name: "Innovate", initial: "IN" },
  { name: "BuildPro", initial: "BP" },
  { name: "Creative Co", initial: "CC" },
  { name: "NextGen", initial: "NG" },
  { name: "Archviz", initial: "AV" },
  { name: "DigitalX", initial: "DX" },
];

function LogoItem({ name, initial }: { name: string; initial: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="logo-item flex items-center gap-3 px-6"
    >
      <div className="w-10 h-10 rounded-xl border border-border/50 flex items-center justify-center bg-card/50">
        <span className="font-display font-bold text-sm text-foreground/70">
          {initial}
        </span>
      </div>
      <span className="font-medium text-foreground/70 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

export function ClientLogos({ className = "" }: ClientLogosProps) {
  return (
    <section className={`py-12 border-y border-border/20 ${className}`}>
      <div className="container mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground"
        >
          Trusted by forward-thinking brands
        </motion.p>
      </div>

      <div className="logo-marquee">
        <div className="logo-marquee-content">
          {clients.map((client) => (
            <LogoItem key={client.name} {...client} />
          ))}
        </div>
        <div className="logo-marquee-content" aria-hidden="true">
          {clients.map((client) => (
            <LogoItem key={`${client.name}-dup`} {...client} />
          ))}
        </div>
      </div>
    </section>
  );
}
