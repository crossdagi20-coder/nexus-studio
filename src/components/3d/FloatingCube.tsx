import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingCubeProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "highlight";
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

// Unified luxury 3D color system
const colorConfig = {
  primary: {
    gradient: "from-[hsl(250,90%,65%)] to-[hsl(250,85%,45%)]",
    border: "border-[hsl(250,90%,65%)/0.5]",
    glow: "0 0 30px hsl(250 90% 65% / 0.4), 0 0 60px hsl(250 90% 65% / 0.2)",
    innerGlow: "inset 0 0 15px hsl(250 90% 65% / 0.15)",
  },
  secondary: {
    gradient: "from-[hsl(185,95%,55%)] to-[hsl(185,90%,40%)]",
    border: "border-[hsl(185,95%,55%)/0.5]",
    glow: "0 0 30px hsl(185 95% 55% / 0.4), 0 0 60px hsl(185 95% 55% / 0.2)",
    innerGlow: "inset 0 0 15px hsl(185 95% 55% / 0.15)",
  },
  highlight: {
    gradient: "from-[hsl(220,70%,55%)] to-[hsl(220,65%,40%)]",
    border: "border-[hsl(220,70%,55%)/0.5]",
    glow: "0 0 30px hsl(220 70% 55% / 0.4), 0 0 60px hsl(220 70% 55% / 0.2)",
    innerGlow: "inset 0 0 15px hsl(220 70% 55% / 0.15)",
  },
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
  const colors = colorConfig[color];

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
          filter: `drop-shadow(${colors.glow.split(',')[0]})`,
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
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateZ(${halfSize}px)`,
            boxShadow: `inset 2px 2px 8px rgba(255,255,255,0.2), inset -2px -2px 8px rgba(0,0,0,0.3), ${colors.innerGlow}`,
          }}
        />
        {/* Back face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg",
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
            boxShadow: `inset 2px 2px 8px rgba(255,255,255,0.15), inset -2px -2px 8px rgba(0,0,0,0.25)`,
          }}
        />
        {/* Left face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg opacity-90",
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateX(-${halfSize}px) rotateY(-90deg)`,
            boxShadow: `inset 2px 2px 6px rgba(255,255,255,0.1), inset -2px -2px 6px rgba(0,0,0,0.2)`,
          }}
        />
        {/* Right face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg opacity-90",
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateX(${halfSize}px) rotateY(90deg)`,
            boxShadow: `inset 2px 2px 6px rgba(255,255,255,0.1), inset -2px -2px 6px rgba(0,0,0,0.2)`,
          }}
        />
        {/* Top face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg opacity-95",
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateY(-${halfSize}px) rotateX(90deg)`,
            boxShadow: `inset 2px 2px 8px rgba(255,255,255,0.25), inset -2px -2px 6px rgba(0,0,0,0.15)`,
          }}
        />
        {/* Bottom face */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br border backdrop-blur-sm rounded-lg opacity-80",
            colors.gradient,
            colors.border
          )}
          style={{
            transform: `translateY(${halfSize}px) rotateX(-90deg)`,
            boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.05), inset -2px -2px 8px rgba(0,0,0,0.3)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
