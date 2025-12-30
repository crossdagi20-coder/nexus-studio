import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.1,
  once = true,
  amount = 0.2
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child component to use inside StaggerContainer
export function StaggerItem({ 
  children, 
  className = "",
  variant = "fadeUp"
}: { 
  children: ReactNode; 
  className?: string;
  variant?: "fadeUp" | "scaleUp" | "slideLeft" | "slideRight";
}) {
  const variants: Record<string, Variants> = {
    fadeUp: {
      hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
      visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: 30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    }
  };

  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  );
}
