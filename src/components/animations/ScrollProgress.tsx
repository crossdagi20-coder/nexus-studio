import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function ScrollProgress({
  className = "",
  height = 3
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[100] origin-left bg-gradient-to-r from-primary via-primary to-accent ${className}`}
      style={{
        scaleX,
        height,
        transformOrigin: "0%"
      }}
    />
  );
}
