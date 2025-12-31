import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { FloatingCube, FloatingLaptop, FloatingPyramid, FloatingTorus } from "@/components/3d";

interface ProjectCardProps {
  index: number;
  title: string;
  category: string;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  isActive?: boolean;
}

const categoryShapes: Record<string, "cube" | "laptop" | "pyramid" | "torus"> = {
  "Architecture": "pyramid",
  "Web": "laptop",
  "Branding": "cube",
  "Social Media": "torus",
};

// Updated to use new unified color system
const categoryColors: Record<string, "primary" | "secondary" | "highlight"> = {
  "Architecture": "primary",
  "Web": "secondary",
  "Branding": "highlight",
  "Social Media": "primary",
};

export function ProjectCard({
  index,
  title,
  category,
  description,
  imageUrl,
  linkUrl,
  isActive = false,
}: ProjectCardProps) {
  const shapeType = categoryShapes[category] || "cube";
  const shapeColor = categoryColors[category] || "primary";
  const projectNumber = String(index + 1).padStart(2, "0");

  const renderShape = () => {
    switch (shapeType) {
      case "laptop":
        return <FloatingLaptop size="md" floatIntensity={8} parallax={false} />;
      case "pyramid":
        return <FloatingPyramid size="lg" color={shapeColor} floatIntensity={10} parallax={false} />;
      case "torus":
        return <FloatingTorus size="lg" color={shapeColor} floatIntensity={10} parallax={false} />;
      default:
        return <FloatingCube size="lg" color={shapeColor} floatIntensity={10} parallax={false} />;
    }
  };

  return (
    <motion.div
      className={cn(
        "relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] h-[70vh] md:h-[75vh] snap-center",
        "cursor-pointer group"
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-full glass-card overflow-hidden border-2 border-border/30 group-hover:border-primary/30 transition-colors duration-500">
        {/* Large number background */}
        <div className="absolute -right-4 -top-8 font-serif text-[12rem] md:text-[16rem] font-bold text-primary/5 select-none pointer-events-none z-0 leading-none">
          {projectNumber}
        </div>

        {/* Project image or gradient placeholder */}
        <div className="absolute inset-0 z-0">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
          {/* Top section */}
          <div>
            <motion.div
              className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4 border border-primary/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {category}
            </motion.div>
            
            <motion.h3
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {title}
            </motion.h3>
            
            {description && (
              <motion.p
                className="text-muted-foreground text-base md:text-lg max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {description}
              </motion.p>
            )}
          </div>

          {/* Middle: 3D Shape */}
          <div className="flex-1 flex items-center justify-center py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group-hover:scale-110 transition-transform duration-700"
            >
              {renderShape()}
            </motion.div>
          </div>

          {/* Bottom section */}
          <div className="flex items-end justify-between">
            <span className="font-serif text-6xl md:text-7xl font-bold text-primary/30">
              {projectNumber}
            </span>
            
            {linkUrl && (
              <motion.a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                View Project <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
