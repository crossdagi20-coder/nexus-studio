import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingLaptopProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  floatIntensity?: number;
  parallax?: boolean;
}

const sizeMap = {
  sm: { width: 80, height: 50, screenHeight: 45 },
  md: { width: 120, height: 75, screenHeight: 68 },
  lg: { width: 180, height: 110, screenHeight: 100 },
};

export function FloatingLaptop({
  size = "md",
  className,
  floatIntensity = 15,
  parallax = true,
}: FloatingLaptopProps) {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, parallax ? 60 : 0]);
  
  const dimensions = sizeMap[size];

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ 
        y: parallaxY,
        perspective: "800px",
        width: dimensions.width,
        height: dimensions.height + dimensions.screenHeight,
        filter: "drop-shadow(0 0 40px hsl(250 90% 65% / 0.3))",
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
          rotateX: [-15, -20, -15],
          rotateY: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Screen */}
        <div
          className="absolute rounded-lg border border-[hsl(250,90%,65%)/0.4] overflow-hidden"
          style={{
            width: dimensions.width,
            height: dimensions.screenHeight,
            background: "linear-gradient(145deg, hsl(222, 45%, 8%), hsl(222, 50%, 5%))",
            transformOrigin: "bottom center",
            transform: "rotateX(-10deg)",
            boxShadow: "inset 0 0 25px rgba(0,0,0,0.4), 0 10px 50px rgba(0,0,0,0.5), 0 0 30px hsl(250 90% 65% / 0.2)",
          }}
        >
          {/* Screen content glow */}
          <div 
            className="absolute inset-2 rounded bg-gradient-to-br from-[hsl(250,90%,65%)/0.25] via-[hsl(185,95%,55%)/0.15] to-transparent"
            style={{
              boxShadow: "0 0 40px hsl(250 90% 65% / 0.35)",
            }}
          >
            {/* Code lines */}
            <div className="p-2 space-y-1">
              <div className="h-1 w-3/4 rounded bg-[hsl(250,90%,65%)/0.5]" />
              <div className="h-1 w-1/2 rounded bg-[hsl(185,95%,55%)/0.4]" />
              <div className="h-1 w-2/3 rounded bg-[hsl(250,85%,60%)/0.35]" />
              <div className="h-1 w-1/3 rounded bg-[hsl(185,90%,50%)/0.45]" />
              <div className="h-1 w-4/5 rounded bg-[hsl(250,80%,55%)/0.3]" />
            </div>
          </div>
          {/* Camera dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[hsl(185,95%,55%)/0.6]" />
        </div>

        {/* Base/Keyboard */}
        <div
          className="absolute rounded-lg border border-[hsl(220,70%,55%)/0.3]"
          style={{
            width: dimensions.width,
            height: dimensions.height / 3,
            bottom: 0,
            background: "linear-gradient(180deg, hsl(222, 40%, 10%), hsl(222, 45%, 6%))",
            transform: "rotateX(80deg) translateZ(-10px)",
            boxShadow: "inset 0 2px 8px rgba(255,255,255,0.08), 0 -5px 25px rgba(0,0,0,0.4)",
          }}
        >
          {/* Keyboard grid */}
          <div className="absolute inset-1 grid grid-cols-8 gap-px opacity-40">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="bg-[hsl(250,90%,65%)/0.2] rounded-sm" />
            ))}
          </div>
          {/* Trackpad */}
          <div 
            className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-[hsl(185,95%,55%)/0.15]"
            style={{ width: dimensions.width / 4, height: dimensions.height / 8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
