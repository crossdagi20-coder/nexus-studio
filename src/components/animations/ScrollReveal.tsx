import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { 
  fadeUpVariants, 
  fadeInVariants, 
  scaleUpVariants, 
  slideLeftVariants, 
  slideRightVariants,
  blurRevealVariants,
  rotateInVariants,
  smoothTransition
} from "@/lib/animations";

type AnimationVariant = "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft" | "slideRight" | "blur" | "rotate";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeUp: fadeUpVariants,
  fadeIn: fadeInVariants,
  scaleUp: scaleUpVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  blur: blurRevealVariants,
  rotate: rotateInVariants
};

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.3
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantMap[variant]}
      transition={{
        ...smoothTransition,
        duration,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
