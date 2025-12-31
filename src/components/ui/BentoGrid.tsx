import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "large" | "wide" | "tall";
  gradient?: "none" | "primary" | "accent" | "subtle";
  delay?: number;
}

export function BentoItem({ 
  children, 
  className, 
  size = "default",
  gradient = "subtle",
  delay = 0
}: BentoItemProps) {
  const sizeClasses = {
    default: "",
    large: "col-span-2 row-span-2",
    wide: "col-span-2",
    tall: "row-span-2",
  };

  const gradientClasses = {
    none: "",
    primary: "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    accent: "before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    subtle: "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "bento-item relative overflow-hidden",
        sizeClasses[size],
        gradientClasses[gradient],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function BentoGrid({ children, className, columns = 4 }: BentoGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {children}
    </div>
  );
}

// Specialized bento cards
export function BentoHeroCard({ 
  title, 
  subtitle, 
  image, 
  className 
}: { 
  title: string; 
  subtitle?: string;
  image?: string;
  className?: string;
}) {
  return (
    <BentoItem size="large" gradient="primary" className={className}>
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-end">
        {subtitle && (
          <span className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
            {subtitle}
          </span>
        )}
        <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">
          {title}
        </h3>
      </div>
    </BentoItem>
  );
}

export function BentoStatCard({ 
  value, 
  label, 
  className 
}: { 
  value: string; 
  label: string;
  className?: string;
}) {
  return (
    <BentoItem gradient="subtle" className={cn("flex flex-col justify-center items-center text-center", className)}>
      <motion.span 
        className="stat-counter text-primary mb-2"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </BentoItem>
  );
}

export function BentoImageCard({ 
  image, 
  alt,
  overlay,
  className 
}: { 
  image: string; 
  alt: string;
  overlay?: ReactNode;
  className?: string;
}) {
  return (
    <BentoItem gradient="none" className={cn("p-0 overflow-hidden group", className)}>
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>
      {overlay && (
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
          {overlay}
        </div>
      )}
    </BentoItem>
  );
}
