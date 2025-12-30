import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  mode?: "word" | "character";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  mode = "word",
  delay = 0,
  staggerDelay = 0.05,
  once = true,
  tag = "span"
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const items = mode === "word" 
    ? children.split(" ") 
    : children.split("");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const Tag = tag;

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={children}
    >
      {items.map((text, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block"
          style={{ marginRight: mode === "word" ? "0.25em" : undefined }}
        >
          {text}
          {mode === "character" && text === " " && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  );
}
