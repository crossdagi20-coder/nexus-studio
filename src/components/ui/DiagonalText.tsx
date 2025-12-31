import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DiagonalTextProps {
  lines: string[];
  className?: string;
  highlightIndex?: number;
}

export function DiagonalText({ lines, className, highlightIndex }: DiagonalTextProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ rotate: -12, x: "-10%", opacity: 0 }}
        whileInView={{ rotate: -8, x: "-5%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2"
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <span 
              className={cn(
                "diagonal-text block",
                highlightIndex === index ? "text-primary" : "text-foreground"
              )}
            >
              {line}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Horizontal scrolling text
export function ScrollingText({ 
  text, 
  className,
  speed = 30
}: { 
  text: string;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        className="inline-block"
      >
        {Array(4).fill(null).map((_, i) => (
          <span key={i} className="inline-block">
            <span className="mx-8 font-display text-8xl md:text-[12rem] font-bold tracking-tighter uppercase opacity-10">
              {text}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Large outlined text
export function OutlineText({ 
  text, 
  className,
  filled = false
}: { 
  text: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span 
      className={cn(
        "font-display font-bold text-7xl md:text-9xl uppercase tracking-tight",
        filled ? "text-foreground" : "text-transparent",
        !filled && "[-webkit-text-stroke:2px_hsl(var(--foreground))]",
        className
      )}
    >
      {text}
    </span>
  );
}
