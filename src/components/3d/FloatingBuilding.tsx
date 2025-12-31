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
          className="absolute border border-primary/30 rounded-sm overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            background: "linear-gradient(180deg, hsl(var(--secondary)), hsl(var(--card)))",
            transform: `translateZ(${dimensions.depth / 2}px)`,
            boxShadow: "inset 2px 2px 10px rgba(255,255,255,0.05), 0 0 30px rgba(0,0,0,0.3)",
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
                className="bg-primary/30 rounded-sm"
                style={{
                  boxShadow: "inset 0 0 4px hsl(var(--primary) / 0.3), 0 0 8px hsl(var(--primary) / 0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right face */}
        <div
          className="absolute border border-primary/20 rounded-sm overflow-hidden"
          style={{
            width: dimensions.depth,
            height: dimensions.height,
            background: "linear-gradient(180deg, hsl(var(--muted)), hsl(var(--secondary)))",
            transform: `translateX(${dimensions.width}px) rotateY(90deg)`,
            transformOrigin: "left center",
            boxShadow: "inset -4px 2px 15px rgba(0,0,0,0.2)",
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
                className="bg-accent/20 rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Top face (roof) */}
        <div
          className="absolute border border-primary/20 rounded-sm"
          style={{
            width: dimensions.width,
            height: dimensions.depth,
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))",
            transform: `translateY(-${dimensions.depth / 2}px) rotateX(90deg) translateZ(${dimensions.depth / 2}px)`,
            boxShadow: "inset 0 0 20px rgba(255,255,255,0.1)",
          }}
        />

        {/* Shadow */}
        <div
          className="absolute rounded-full opacity-30"
          style={{
            width: dimensions.width * 1.2,
            height: dimensions.depth * 0.8,
            bottom: -20,
            left: -10,
            background: "radial-gradient(ellipse, hsl(var(--primary) / 0.3), transparent 70%)",
            transform: "rotateX(90deg)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
