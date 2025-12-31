import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingPyramidProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "accent" | "coral" | "gold" | "purple";
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

const colorMap = {
  primary: {
    face1: "from-primary/70 to-primary/40",
    face2: "from-primary/60 to-primary/30",
    face3: "from-primary/50 to-primary/20",
    face4: "from-primary/55 to-primary/25",
    border: "border-primary/40",
  },
  accent: {
    face1: "from-accent/70 to-accent/40",
    face2: "from-accent/60 to-accent/30",
    face3: "from-accent/50 to-accent/20",
    face4: "from-accent/55 to-accent/25",
    border: "border-accent/40",
  },
  coral: {
    face1: "from-gnexus-coral/70 to-gnexus-coral/40",
    face2: "from-gnexus-coral/60 to-gnexus-coral/30",
    face3: "from-gnexus-coral/50 to-gnexus-coral/20",
    face4: "from-gnexus-coral/55 to-gnexus-coral/25",
    border: "border-gnexus-coral/40",
  },
  gold: {
    face1: "from-gnexus-gold/70 to-gnexus-gold/40",
    face2: "from-gnexus-gold/60 to-gnexus-gold/30",
    face3: "from-gnexus-gold/50 to-gnexus-gold/20",
    face4: "from-gnexus-gold/55 to-gnexus-gold/25",
    border: "border-gnexus-gold/40",
  },
  purple: {
    face1: "from-gnexus-purple/70 to-gnexus-purple/40",
    face2: "from-gnexus-purple/60 to-gnexus-purple/30",
    face3: "from-gnexus-purple/50 to-gnexus-purple/20",
    face4: "from-gnexus-purple/55 to-gnexus-purple/25",
    border: "border-gnexus-purple/40",
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
  const colors = colorMap[color];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
        width: pyramidSize,
        height: pyramidSize,
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
          className={cn(
            "absolute bg-gradient-to-br border backdrop-blur-sm",
            colors.face1,
            colors.border
          )}
          style={{
            width: pyramidSize,
            height: pyramidSize,
            transform: `rotateX(90deg) translateZ(-${pyramidSize / 2}px)`,
            boxShadow: "inset 0 0 10px rgba(255,255,255,0.1)",
          }}
        />
        
        {/* Front face */}
        <div
          className={cn(
            "absolute border backdrop-blur-sm",
            colors.border
          )}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid`,
            borderBottomColor: `hsl(var(--${color === 'primary' ? 'primary' : color === 'accent' ? 'accent' : `gnexus-${color}`}) / 0.5)`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) translateZ(${pyramidSize / 4}px)`,
            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))",
          }}
        />
        
        {/* Back face */}
        <div
          className={cn(
            "absolute border backdrop-blur-sm",
            colors.border
          )}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid`,
            borderBottomColor: `hsl(var(--${color === 'primary' ? 'primary' : color === 'accent' ? 'accent' : `gnexus-${color}`}) / 0.4)`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) rotateY(180deg) translateZ(${pyramidSize / 4}px)`,
          }}
        />
        
        {/* Left face */}
        <div
          className={cn(
            "absolute border backdrop-blur-sm",
            colors.border
          )}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid`,
            borderBottomColor: `hsl(var(--${color === 'primary' ? 'primary' : color === 'accent' ? 'accent' : `gnexus-${color}`}) / 0.35)`,
            left: 0,
            bottom: 0,
            transformOrigin: "bottom center",
            transform: `rotateX(-30deg) rotateY(-90deg) translateZ(${pyramidSize / 4}px)`,
          }}
        />
        
        {/* Right face */}
        <div
          className={cn(
            "absolute border backdrop-blur-sm",
            colors.border
          )}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${pyramidSize / 2}px solid transparent`,
            borderRight: `${pyramidSize / 2}px solid transparent`,
            borderBottom: `${pyramidSize}px solid`,
            borderBottomColor: `hsl(var(--${color === 'primary' ? 'primary' : color === 'accent' ? 'accent' : `gnexus-${color}`}) / 0.45)`,
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
