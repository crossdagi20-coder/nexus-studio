import { Variants, Transition } from "framer-motion";

// Fade Up with blur
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)"
  }
};

// Simple fade in
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Scale up
export const scaleUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1 
  }
};

// Slide from left
export const slideLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    filter: "blur(5px)"
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)"
  }
};

// Slide from right
export const slideRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    filter: "blur(5px)"
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)"
  }
};

// Blur reveal
export const blurRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(20px)" 
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)" 
  }
};

// Rotate in
export const rotateInVariants: Variants = {
  hidden: { 
    opacity: 0, 
    rotate: -5,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1
  }
};

// Container for stagger children
export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Fast stagger container
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05
    }
  }
};

// Slow stagger container
export const slowStaggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Spring transition
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20
};

// Smooth transition
export const smoothTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6
};

// Fast transition
export const fastTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.3
};

// Slow transition
export const slowTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 1
};

// Character stagger for text
export const characterVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0 
  }
};

// Word stagger for text
export const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    rotateX: -90
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0
  }
};
