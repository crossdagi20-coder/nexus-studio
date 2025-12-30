import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxElementProps {
  children?: ReactNode;
  className?: string;
  yOffset?: [number, number]; // [start, end] in pixels
  xOffset?: [number, number];
  rotateOffset?: [number, number]; // [start, end] in degrees
  scaleOffset?: [number, number]; // [start, end] scale values
  opacityOffset?: [number, number];
}

export function ParallaxElement({
  children,
  className = "",
  yOffset,
  xOffset,
  rotateOffset,
  scaleOffset,
  opacityOffset
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = yOffset ? useTransform(scrollYProgress, [0, 1], yOffset) : undefined;
  const x = xOffset ? useTransform(scrollYProgress, [0, 1], xOffset) : undefined;
  const rotate = rotateOffset ? useTransform(scrollYProgress, [0, 1], rotateOffset) : undefined;
  const scale = scaleOffset ? useTransform(scrollYProgress, [0, 1], scaleOffset) : undefined;
  const opacity = opacityOffset ? useTransform(scrollYProgress, [0, 1], opacityOffset) : undefined;

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          x,
          rotate,
          scale,
          opacity
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
