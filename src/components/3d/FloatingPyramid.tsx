import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPyramidProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "highlight";
  className?: string;
  rotateSpeed?: "slow" | "medium" | "fast";
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 64,
  lg: 96,
  xl: 128,
};

// Unified luxury 3D color system
const colorConfig = {
  primary: {
    cssVar: "250, 90%, 65%",
    face1: "hsl(250, 90%, 65% / 0.7)",
    face2: "hsl(250, 85%, 55% / 0.6)",
    face3: "hsl(250, 80%, 45% / 0.5)",
    face4: "hsl(250, 85%, 50% / 0.55)",
    border: "border-[hsl(250,90%,65%)/0.4]",
    glow: "0 0 30px hsl(250 90% 65% / 0.4)",
  },
  secondary: {
    cssVar: "185, 95%, 55%",
    face1: "hsl(185, 95%, 55% / 0.7)",
    face2: "hsl(185, 90%, 50% / 0.6)",
    face3: "hsl(185, 85%, 40% / 0.5)",
    face4: "hsl(185, 90%, 45% / 0.55)",
    border: "border-[hsl(185,95%,55%)/0.4]",
    glow: "0 0 30px hsl(185 95% 55% / 0.4)",
  },
  highlight: {
    cssVar: "220, 70%, 55%",
    face1: "hsl(220, 70%, 55% / 0.7)",
    face2: "hsl(220, 65%, 50% / 0.6)",
    face3: "hsl(220, 60%, 40% / 0.5)",
    face4: "hsl(220, 65%, 45% / 0.55)",
    border: "border-[hsl(220,70%,55%)/0.4]",
    glow: "0 0 30px hsl(220 70% 55% / 0.4)",
  },
};

const speedMap = {
  slow: 18,
  medium: 10,
  fast: 5,
};

export function FloatingPyramid({
  size = "md",
  color = "primary",
  className,
  rotateSpeed = "slow",
  floatIntensity = 20,
  parallax = true,
}: FloatingPyramidProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 60 : 0]);
  
  const pyramidSize = sizeMap[size];
  const colors = colorConfig[color];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
        width: pyramidSize,
        height: pyramidSize,
        filter: `drop-shadow(${colors.glow})`,
      }}
      animate={{
        y: [0, -floatIntensity, 0],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: speedMap[rotateSpeed],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Base */}
        <div
          className={cn("absolute border backdrop-blur-sm", colors.border)}
          style={{
            width: pyramidSize,
            height: pyramidSize,
            background: `linear-gradient(135deg, ${colors.face1}, ${colors.face2})`,
            transform: `rotateX(90deg) translateZ(-${pyramidSize / 2}px)`,
            boxShadow: "inset 0 0 15px rgba(255,255,255,0.1)",
          }}
        />
        
        {/* Front face */}
        <div
          className={cn("absolute border backdrop-blur-sm", colors.border)}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid ${colors.face1}`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) translateZ(${pyramidSize / 4}px)`,
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))",
          }}
        />
        
        {/* Back face */}
        <div
          className={cn("absolute border backdrop-blur-sm", colors.border)}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid ${colors.face2}`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) rotateY(180deg) translateZ(${pyramidSize / 4}px)`,
          }}
        />
        
        {/* Left face */}
        <div
          className={cn("absolute border backdrop-blur-sm", colors.border)}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid ${colors.face3}`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) rotateY(-90deg) translateZ(${pyramidSize / 4}px)`,
          }}
        />
        
        {/* Right face */}
        <div
          className={cn("absolute border backdrop-blur-sm", colors.border)}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid ${colors.face4}`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) rotateY(90deg) translateZ(${pyramidSize / 4}px)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
