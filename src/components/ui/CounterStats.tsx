import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

interface CounterStatsProps {
  stats: StatItem[];
}

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract numeric value
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {hasPercent && "%"}
      {hasPlus && "+"}
      {suffix}
    </span>
  );
}

export function CounterStats({ stats }: CounterStatsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between divide-x divide-border/30">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-1 text-center px-4 md:px-8 py-6"
          >
            <div className="font-sans text-3xl md:text-5xl font-light tracking-tight text-foreground mb-2">
              <AnimatedCounter value={stat.value} />
            </div>
            <div className="text-sm md:text-base text-muted-foreground tracking-wide uppercase">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
