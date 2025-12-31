import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingCubeProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "coral" | "gold" | "purple";
  className?: string;
  rotateSpeed?: "slow" | "medium" | "fast";
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

const sizePx = {
  sm: 32,
  md: 64,
  lg: 96,
  xl: 128,
};

const colorMap = {
  primary: "from-primary/60 to-primary/30",
  accent: "from-accent/60 to-accent/30",
  coral: "from-gnexus-coral/60 to-gnexus-coral/30",
  gold: "from-gnexus-gold/60 to-gnexus-gold/30",
  purple: "from-gnexus-purple/60 to-gnexus-purple/30",
};

const borderColorMap = {
  primary: "border-primary/40",
  accent: "border-accent/40",
  coral: "border-gnexus-coral/40",
  gold: "border-gnexus-gold/40",
  purple: "border-gnexus-purple/40",
};

const speedMap = {
  slow: 20,
  medium: 12,
  fast: 6,
};

export function FloatingCube({
  size = "md",
  color = "primary",
  className,
  rotateSpeed = "slow",
  floatIntensity = 20,
  parallax = true,
}: FloatingCubeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 100 : 0]);
  
  const cubeSize = sizePx[size];
  const halfSize = cubeSize / 2;

  return (
    <motion.div
      ref={ref}
      className={cn("floating-3d-container", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
      }}
      animate={{
        y: [0, -floatIntensity, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className={cn(sizeMap[size], "relative preserve-3d")}
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: speedMap[rotateSpeed],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Front face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateZ(${halfSize}px)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.15), inset -2px -2px 6px rgba(0,0,0,0.2)",
          }}
        />
        {/* Back face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.15), inset -2px -2px 6px rgba(0,0,0,0.2)",
          }}
        />
        {/* Left face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateX(-${halfSize}px) rotateY(-90deg)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.15), inset -2px -2px 6px rgba(0,0,0,0.2)",
          }}
        />
        {/* Right face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateX(${halfSize}px) rotateY(90deg)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.15), inset -2px -2px 6px rgba(0,0,0,0.2)",
          }}
        />
        {/* Top face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateY(-${halfSize}px) rotateX(90deg)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.25), inset -2px -2px 6px rgba(0,0,0,0.15)",
          }}
        />
        {/* Bottom face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colorMap[color],
            borderColorMap[color]
          )}
          style={{
            transform: `translateY(${halfSize}px) rotateX(-90deg)`,
            boxShadow: "inset 2px 2px 6px rgba(255,255,255,0.1), inset -2px -2px 6px rgba(0,0,0,0.25)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
