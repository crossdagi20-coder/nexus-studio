import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingBuildingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: { width: 40, height: 60, depth: 30 },
  md: { width: 60, height: 90, depth: 45 },
  lg: { width: 80, height: 120, depth: 60 },
};

export function FloatingBuilding({
  size = "md",
  className,
  floatIntensity = 12,
  parallax = true,
}: FloatingBuildingProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 70 : 0]);
  
  const dimensions = sizeMap[size];
  const windowRows = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const windowCols = 3;

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "1000px",
        width: dimensions.width + dimensions.depth,
        height: dimensions.height + 20,
        filter: "drop-shadow(0 0 40px hsl(250 90% 65% / 0.3))",
      }}
      animate={{
        y: [0, -floatIntensity, 0],
      }}
      transition={{
        duration: 6,
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
          rotateY: [-15, -25, -15],
          rotateX: [5, 10, 5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Front face */}
        <div
          className="absolute border border-[hsl(250,90%,65%)/0.4] rounded-sm overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            background: "linear-gradient(180deg, hsl(222, 40%, 10%), hsl(222, 45%, 6%))",
            transform: `translateZ(${dimensions.depth / 2}px)`,
            boxShadow: "inset 2px 2px 15px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Windows grid */}
          <div 
            className="grid gap-1 p-2"
            style={{
              gridTemplateColumns: `repeat(${windowCols}, 1fr)`,
              gridTemplateRows: `repeat(${windowRows}, 1fr)`,
              height: "100%",
            }}
          >
            {Array.from({ length: windowRows * windowCols }).map((_, i) => (
              <div 
                key={i} 
                className="bg-[hsl(250,90%,65%)/0.35] rounded-sm"
                style={{
                  boxShadow: "inset 0 0 5px hsl(250 90% 65% / 0.4), 0 0 10px hsl(250 90% 65% / 0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right face */}
        <div
          className="absolute border border-[hsl(185,95%,55%)/0.3] rounded-sm overflow-hidden"
          style={{
            width: dimensions.depth,
            height: dimensions.height,
            background: "linear-gradient(180deg, hsl(222, 35%, 8%), hsl(222, 40%, 5%))",
            transform: `translateX(${dimensions.width}px) rotateY(90deg)`,
            transformOrigin: "left center",
            boxShadow: "inset -4px 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Side windows */}
          <div 
            className="grid gap-1 p-2"
            style={{
              gridTemplateColumns: "repeat(2, 1fr)",
              gridTemplateRows: `repeat(${windowRows}, 1fr)`,
              height: "100%",
            }}
          >
            {Array.from({ length: windowRows * 2 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-[hsl(185,95%,55%)/0.25] rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Top face (roof) */}
        <div
          className="absolute border border-[hsl(220,70%,55%)/0.3] rounded-sm"
          style={{
            width: dimensions.width,
            height: dimensions.depth,
            background: "linear-gradient(135deg, hsl(250, 90%, 65% / 0.35), hsl(185, 95%, 55% / 0.25))",
            transform: `translateY(-${dimensions.depth / 2}px) rotateX(90deg) translateZ(${dimensions.depth / 2}px)`,
            boxShadow: "inset 0 0 25px rgba(255,255,255,0.15)",
          }}
        />

        {/* Shadow */}
        <div
          className="absolute rounded-full opacity-40"
          style={{
            width: dimensions.width * 1.2,
            height: dimensions.depth * 0.8,
            bottom: -20,
            left: -10,
            background: "radial-gradient(ellipse, hsl(250 90% 65% / 0.35), transparent 70%)",
            transform: "rotateX(90deg)",
            filter: "blur(12px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
