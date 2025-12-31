import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingOctahedronProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "coral" | "gold" | "purple";
  className?: string;
  rotateSpeed?: "slow" | "medium" | "fast";
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: 40,
  md: 70,
  lg: 100,
};

const colorVars = {
  primary: "--primary",
  accent: "--accent",
  coral: "--gnexus-coral",
  gold: "--gnexus-gold",
  purple: "--gnexus-purple",
};

const speedMap = {
  slow: 16,
  medium: 10,
  fast: 5,
};

export function FloatingOctahedron({
  size = "md",
  color = "primary",
  className,
  rotateSpeed = "slow",
  floatIntensity = 18,
  parallax = true,
}: FloatingOctahedronProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 70 : 0]);
  
  const octaSize = sizeMap[size];
  const colorVar = colorVars[color];

  // Create 8 triangular faces for octahedron
  const topFaces = [0, 90, 180, 270];
  const bottomFaces = [0, 90, 180, 270];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
        width: octaSize,
        height: octaSize * 1.4,
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
        className="relative w-full h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
          rotateX: [10, 25, 10],
        }}
        transition={{
          rotateY: {
            duration: speedMap[rotateSpeed],
            repeat: Infinity,
            ease: "linear",
          },
          rotateX: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Top pyramid faces */}
        {topFaces.map((angle, i) => (
          <div
            key={`top-${i}`}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${octaSize / 2}px solid transparent`,
              borderRight: `${octaSize / 2}px solid transparent`,
              borderBottom: `${octaSize * 0.7}px solid`,
              borderBottomColor: `hsl(var(${colorVar}) / ${0.6 - i * 0.1})`,
              transformOrigin: "bottom center",
              transform: `rotateY(${angle}deg) rotateX(-45deg) translateZ(${octaSize / 2.8}px)`,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.1))",
            }}
          />
        ))}
        
        {/* Bottom pyramid faces (inverted) */}
        {bottomFaces.map((angle, i) => (
          <div
            key={`bottom-${i}`}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${octaSize / 2}px solid transparent`,
              borderRight: `${octaSize / 2}px solid transparent`,
              borderTop: `${octaSize * 0.7}px solid`,
              borderTopColor: `hsl(var(${colorVar}) / ${0.4 - i * 0.05})`,
              transformOrigin: "top center",
              transform: `rotateY(${angle}deg) rotateX(45deg) translateZ(${octaSize / 2.8}px)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
