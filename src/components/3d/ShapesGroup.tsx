import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FloatingCube } from "./FloatingCube";
import { FloatingTorus } from "./FloatingTorus";
import { FloatingPyramid } from "./FloatingPyramid";
import { FloatingSphere } from "./FloatingSphere";
import { FloatingOctahedron } from "./FloatingOctahedron";
import { FloatingLaptop } from "./FloatingLaptop";
import { FloatingBuilding } from "./FloatingBuilding";

type ShapeType = "cube" | "torus" | "pyramid" | "sphere" | "octahedron" | "laptop" | "building";
type ColorType = "primary" | "accent" | "coral" | "gold" | "purple";
type SizeType = "sm" | "md" | "lg";
type SpeedType = "slow" | "medium" | "fast";

interface ShapeConfig {
  type: ShapeType;
  position: { x: string; y: string };
  size?: SizeType;
  color?: ColorType;
  delay?: number;
  rotateSpeed?: SpeedType;
}

interface ShapesGroupProps {
  shapes: ShapeConfig[];
  className?: string;
}

const shapeComponents: Record<ShapeType, React.ComponentType<{
  size?: SizeType;
  color?: ColorType;
  rotateSpeed?: SpeedType;
  parallax?: boolean;
}>> = {
  cube: FloatingCube,
  torus: FloatingTorus,
  pyramid: FloatingPyramid,
  sphere: FloatingSphere,
  octahedron: FloatingOctahedron,
  laptop: FloatingLaptop,
  building: FloatingBuilding,
};

export function ShapesGroup({ shapes, className }: ShapesGroupProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {shapes.map((shape, index) => {
        const ShapeComponent = shapeComponents[shape.type];
        
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: shape.position.x,
              top: shape.position.y,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: shape.delay || index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ShapeComponent
              size={shape.size || "md"}
              color={shape.color || "primary"}
              rotateSpeed={shape.rotateSpeed || "slow"}
              parallax
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Preset configurations for common layouts
export const presets = {
  heroHome: [
    { type: "cube" as ShapeType, position: { x: "8%", y: "25%" }, size: "lg" as SizeType, color: "primary" as ColorType, rotateSpeed: "slow" as SpeedType },
    { type: "torus" as ShapeType, position: { x: "88%", y: "20%" }, size: "md" as SizeType, color: "accent" as ColorType, rotateSpeed: "medium" as SpeedType },
    { type: "sphere" as ShapeType, position: { x: "75%", y: "75%" }, size: "sm" as SizeType, color: "coral" as ColorType },
    { type: "octahedron" as ShapeType, position: { x: "15%", y: "80%" }, size: "md" as SizeType, color: "purple" as ColorType, rotateSpeed: "slow" as SpeedType },
  ],
  heroAbout: [
    { type: "cube" as ShapeType, position: { x: "85%", y: "15%" }, size: "lg" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "75%", y: "55%" }, size: "md" as SizeType, color: "accent" as ColorType },
    { type: "octahedron" as ShapeType, position: { x: "90%", y: "75%" }, size: "sm" as SizeType, color: "coral" as ColorType },
    { type: "pyramid" as ShapeType, position: { x: "5%", y: "70%" }, size: "md" as SizeType, color: "gold" as ColorType },
  ],
  services: [
    { type: "pyramid" as ShapeType, position: { x: "-2%", y: "30%" }, size: "lg" as SizeType, color: "gold" as ColorType },
    { type: "cube" as ShapeType, position: { x: "95%", y: "60%" }, size: "md" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "20%" }, size: "sm" as SizeType, color: "accent" as ColorType },
  ],
  features: [
    { type: "torus" as ShapeType, position: { x: "92%", y: "15%" }, size: "sm" as SizeType, color: "accent" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "5%", y: "85%" }, size: "md" as SizeType, color: "coral" as ColorType },
  ],
  cta: [
    { type: "torus" as ShapeType, position: { x: "10%", y: "20%" }, size: "lg" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "85%", y: "30%" }, size: "sm" as SizeType, color: "accent" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "70%" }, size: "md" as SizeType, color: "coral" as ColorType },
  ],
  architecture: [
    { type: "building" as ShapeType, position: { x: "85%", y: "20%" }, size: "lg" as SizeType },
    { type: "pyramid" as ShapeType, position: { x: "92%", y: "60%" }, size: "md" as SizeType, color: "gold" as ColorType },
    { type: "cube" as ShapeType, position: { x: "78%", y: "80%" }, size: "sm" as SizeType, color: "primary" as ColorType },
  ],
  webDev: [
    { type: "laptop" as ShapeType, position: { x: "82%", y: "25%" }, size: "lg" as SizeType },
    { type: "cube" as ShapeType, position: { x: "75%", y: "70%" }, size: "md" as SizeType, color: "accent" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "85%" }, size: "sm" as SizeType, color: "primary" as ColorType },
  ],
  socialMedia: [
    { type: "octahedron" as ShapeType, position: { x: "85%", y: "20%" }, size: "lg" as SizeType, color: "coral" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "78%", y: "55%" }, size: "md" as SizeType, color: "purple" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "92%", y: "75%" }, size: "sm" as SizeType, color: "accent" as ColorType },
    { type: "torus" as ShapeType, position: { x: "5%", y: "80%" }, size: "md" as SizeType, color: "coral" as ColorType },
  ],
  graphicDesign: [
    { type: "pyramid" as ShapeType, position: { x: "85%", y: "20%" }, size: "lg" as SizeType, color: "gold" as ColorType },
    { type: "cube" as ShapeType, position: { x: "90%", y: "60%" }, size: "md" as SizeType, color: "coral" as ColorType },
    { type: "torus" as ShapeType, position: { x: "78%", y: "80%" }, size: "sm" as SizeType, color: "purple" as ColorType },
  ],
  scattered: [
    { type: "cube" as ShapeType, position: { x: "5%", y: "10%" }, size: "sm" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "15%" }, size: "sm" as SizeType, color: "accent" as ColorType },
    { type: "octahedron" as ShapeType, position: { x: "50%", y: "80%" }, size: "md" as SizeType, color: "gold" as ColorType },
  ],
  corner: [
    { type: "cube" as ShapeType, position: { x: "85%", y: "10%" }, size: "lg" as SizeType, color: "primary" as ColorType },
    { type: "torus" as ShapeType, position: { x: "92%", y: "40%" }, size: "sm" as SizeType, color: "accent" as ColorType },
  ],
  careers: [
    { type: "cube" as ShapeType, position: { x: "85%", y: "20%" }, size: "lg" as SizeType, color: "accent" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "10%", y: "70%" }, size: "md" as SizeType, color: "primary" as ColorType },
    { type: "pyramid" as ShapeType, position: { x: "90%", y: "75%" }, size: "sm" as SizeType, color: "gold" as ColorType },
  ],
  blog: [
    { type: "cube" as ShapeType, position: { x: "88%", y: "25%" }, size: "md" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "5%", y: "60%" }, size: "sm" as SizeType, color: "accent" as ColorType },
  ],
  contact: [
    { type: "torus" as ShapeType, position: { x: "85%", y: "15%" }, size: "lg" as SizeType, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "55%" }, size: "md" as SizeType, color: "accent" as ColorType },
    { type: "cube" as ShapeType, position: { x: "5%", y: "80%" }, size: "sm" as SizeType, color: "coral" as ColorType },
  ],
};
