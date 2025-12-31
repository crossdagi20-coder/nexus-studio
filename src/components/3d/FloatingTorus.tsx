import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingTorusProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "coral" | "gold" | "purple";
  className?: string;
  rotateSpeed?: "slow" | "medium" | "fast";
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: { outer: 40, inner: 20, thickness: 8 },
  md: { outer: 80, inner: 40, thickness: 16 },
  lg: { outer: 120, inner: 60, thickness: 24 },
  xl: { outer: 160, inner: 80, thickness: 32 },
};

const colorMap = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  coral: "hsl(var(--gnexus-coral))",
  gold: "hsl(var(--gnexus-gold))",
  purple: "hsl(var(--gnexus-purple))",
};

const speedMap = {
  slow: 20,
  medium: 12,
  fast: 6,
};

export function FloatingTorus({
  size = "md",
  color = "primary",
  className,
  rotateSpeed = "slow",
  floatIntensity = 20,
  parallax = true,
}: FloatingTorusProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 80 : 0]);
  
  const dimensions = sizeMap[size];
  const ringColor = colorMap[color];

  // Create multiple rings to simulate torus
  const ringCount = 12;
  const rings = Array.from({ length: ringCount }, (_, i) => i);

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
        width: dimensions.outer,
        height: dimensions.outer,
      }}
      animate={{
        y: [0, -floatIntensity, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [60, 60],
          rotateY: [0, 360],
        }}
        transition={{
          duration: speedMap[rotateSpeed],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {rings.map((i) => {
          const angle = (i / ringCount) * 360;
          return (
            <div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                width: dimensions.inner,
                height: dimensions.inner,
                left: "50%",
                top: "50%",
                marginLeft: -dimensions.inner / 2,
                marginTop: -dimensions.inner / 2,
                borderColor: ringColor,
                opacity: 0.6,
                transform: `rotateY(${angle}deg) translateZ(${dimensions.outer / 4}px)`,
                boxShadow: `0 0 10px ${ringColor}40, inset 0 0 8px ${ringColor}20`,
                background: `linear-gradient(135deg, ${ringColor}20, transparent)`,
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}
