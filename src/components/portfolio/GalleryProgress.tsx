import { motion } from "framer-motion";

interface GalleryProgressProps {
  currentIndex: number;
  totalItems: number;
}

export function GalleryProgress({ currentIndex, totalItems }: GalleryProgressProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Progress dots */}
      <div className="flex gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={false}
          >
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary scale-125" 
                  : index < currentIndex 
                    ? "bg-primary/50" 
                    : "bg-muted-foreground/30"
              }`}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/50"
                initial={{ scale: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Counter */}
      <div className="text-sm text-muted-foreground font-mono">
        <span className="text-foreground font-medium">{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        <span>{String(totalItems).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
