import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingSphereProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "highlight";
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

// Warm amber + cool blue-gray color system (inspired by tamalsen.dev)
const colorConfig = {
  primary: {
    bg: "from-[hsl(25,90%,55%)] via-[hsl(25,85%,45%)] to-[hsl(20,80%,30%)]",
    glow: "shadow-[0_0_50px_hsl(25_90%_50%/0.6)]",
    highlight: "from-white/40 to-transparent",
  },
  secondary: {
    bg: "from-[hsl(220,40%,40%)] via-[hsl(220,38%,30%)] to-[hsl(220,35%,18%)]",
    glow: "shadow-[0_0_40px_hsl(220_40%_35%/0.3)]",
    highlight: "from-white/25 to-transparent",
  },
  highlight: {
    bg: "from-[hsl(185,80%,55%)] via-[hsl(185,75%,45%)] to-[hsl(185,70%,30%)]",
    glow: "shadow-[0_0_50px_hsl(185_80%_50%/0.5)]",
    highlight: "from-white/35 to-transparent",
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
  
  const colors = colorConfig[color];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ y: parallaxY }}
      animate={{
        y: [0, -floatIntensity, 0],
        scale: pulse ? [1, 1.08, 1] : 1,
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
        {/* Inner shadow for depth */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset -5px -5px 15px rgba(0,0,0,0.4), inset 3px 3px 10px rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </motion.div>
  );
}
