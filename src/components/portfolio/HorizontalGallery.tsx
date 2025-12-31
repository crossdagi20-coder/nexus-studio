import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { GalleryProgress } from "./GalleryProgress";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
}

interface HorizontalGalleryProps {
  items: PortfolioItem[];
  className?: string;
}

export function HorizontalGallery({ items, className }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Calculate current index based on scroll position
    const cardWidth = clientWidth * 0.85; // Match card width
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(newIndex, items.length - 1));
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    
    scrollElement.addEventListener("scroll", updateScrollState);
    updateScrollState();
    
    return () => scrollElement.removeEventListener("scroll", updateScrollState);
  }, [items.length]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const scrollNext = () => {
    if (currentIndex < items.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  if (!items.length) {
    return (
      <div className="py-32 text-center text-muted-foreground">
        No portfolio items to display
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative py-16", className)}>
      {/* Background parallax effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[120px]" />
      </motion.div>

      {/* Header */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Drag to explore
            </motion.p>
            <GalleryProgress currentIndex={currentIndex} totalItems={items.length} />
          </div>
          
          {/* Navigation arrows */}
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              className="rounded-full border-border/50 hover:border-primary/50 disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollRight}
              className="rounded-full border-border/50 hover:border-primary/50 disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Initial spacer for centering first card */}
        <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] md:w-[calc((100vw-45vw)/2-1.5rem)] lg:w-[calc((100vw-35vw)/2-1.5rem)]" />
        
        {items.map((item, index) => (
          <ProjectCard
            key={item.id}
            index={index}
            title={item.title}
            category={item.category}
            description={item.description}
            imageUrl={item.image_url}
            linkUrl={item.link_url}
            isActive={index === currentIndex}
          />
        ))}
        
        {/* End spacer */}
        <div className="flex-shrink-0 w-[calc((100vw-85vw)/2-1.5rem)] md:w-[calc((100vw-45vw)/2-1.5rem)] lg:w-[calc((100vw-35vw)/2-1.5rem)]" />
      </div>

      {/* Mobile navigation hint */}
      <div className="md:hidden text-center mt-4">
        <p className="text-xs text-muted-foreground">Swipe to explore projects</p>
      </div>
    </div>
  );
}
