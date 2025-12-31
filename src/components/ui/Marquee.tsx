import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ 
  children, 
  className, 
  reverse = false, 
  pauseOnHover = true,
  speed = "normal" 
}: MarqueeProps) {
  const speeds = {
    slow: 40,
    normal: 25,
    fast: 15,
  };

  return (
    <div 
      className={cn(
        "flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        pauseOnHover && "group",
        className
      )}
    >
      <motion.div
        className={cn(
          "flex shrink-0 gap-8 items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speeds[speed]}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className={cn(
          "flex shrink-0 gap-8 items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speeds[speed]}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
        aria-hidden
      >
        {children}
      </motion.div>
    </div>
  );
}

// Text marquee variant
export function TextMarquee({ 
  text, 
  className,
  textClassName,
  reverse = false,
  speed = "slow"
}: { 
  text: string; 
  className?: string;
  textClassName?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}) {
  const items = Array(6).fill(text);
  
  return (
    <Marquee className={className} reverse={reverse} speed={speed}>
      {items.map((item, i) => (
        <span 
          key={i}
          className={cn(
            "text-7xl md:text-9xl font-display font-bold uppercase tracking-tight whitespace-nowrap",
            textClassName
          )}
        >
          {item}
          <span className="mx-8 text-primary">•</span>
        </span>
      ))}
    </Marquee>
  );
}

// Logo marquee variant
export function LogoMarquee({ 
  logos,
  className,
  reverse = false,
}: { 
  logos: { name: string; icon?: React.ReactNode }[];
  className?: string;
  reverse?: boolean;
}) {
  return (
    <Marquee className={className} reverse={reverse} speed="slow">
      {logos.map((logo, i) => (
        <div 
          key={i}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-border/30 bg-card/50"
        >
          {logo.icon}
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {logo.name}
          </span>
        </div>
      ))}
    </Marquee>
  );
}
