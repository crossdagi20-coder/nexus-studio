import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingSphereProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "coral" | "gold" | "purple";
  className?: string;
  floatIntensity?: number;
  parallax?: boolean;
  pulse?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

const colorMap = {
  primary: {
    bg: "from-primary/80 via-primary/50 to-primary/20",
    glow: "shadow-[0_0_40px_hsl(var(--primary)/0.4)]",
    highlight: "from-white/30 to-transparent",
  },
  accent: {
    bg: "from-accent/80 via-accent/50 to-accent/20",
    glow: "shadow-[0_0_40px_hsl(var(--accent)/0.4)]",
    highlight: "from-white/30 to-transparent",
  },
  coral: {
    bg: "from-gnexus-coral/80 via-gnexus-coral/50 to-gnexus-coral/20",
    glow: "shadow-[0_0_40px_hsl(var(--gnexus-coral)/0.4)]",
    highlight: "from-white/30 to-transparent",
  },
  gold: {
    bg: "from-gnexus-gold/80 via-gnexus-gold/50 to-gnexus-gold/20",
    glow: "shadow-[0_0_40px_hsl(var(--gnexus-gold)/0.4)]",
    highlight: "from-white/30 to-transparent",
  },
  purple: {
    bg: "from-gnexus-purple/80 via-gnexus-purple/50 to-gnexus-purple/20",
    glow: "shadow-[0_0_40px_hsl(var(--gnexus-purple)/0.4)]",
    highlight: "from-white/30 to-transparent",
  },
};

export function FloatingSphere({
  size = "md",
  color = "primary",
  className,
  floatIntensity = 15,
  parallax = true,
  pulse = false,
}: FloatingSphereProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 50 : 0]);
  
  const colors = colorMap[color];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ y: parallaxY }}
      animate={{
        y: [0, -floatIntensity, 0],
        scale: pulse ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className={cn(
          "rounded-full bg-gradient-to-br relative",
          sizeMap[size],
          colors.bg,
          colors.glow
        )}
      >
        {/* Highlight */}
        <div 
          className={cn(
            "absolute top-1 left-1 w-1/3 h-1/3 rounded-full bg-gradient-to-br",
            colors.highlight
          )}
        />
        {/* Inner shadow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset -4px -4px 12px rgba(0,0,0,0.3), inset 2px 2px 8px rgba(255,255,255,0.1)",
          }}
        />
      </div>
    </motion.div>
  );
}
