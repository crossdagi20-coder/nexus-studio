import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FloatingCube } from "./FloatingCube";
import { FloatingTorus } from "./FloatingTorus";
import { FloatingPyramid } from "./FloatingPyramid";
import { FloatingSphere } from "./FloatingSphere";
import { FloatingOctahedron } from "./FloatingOctahedron";

type ShapeType = "cube" | "torus" | "pyramid" | "sphere" | "octahedron";
type ColorType = "primary" | "accent" | "coral" | "gold" | "purple";

interface ShapeConfig {
  type: ShapeType;
  position: { x: string; y: string };
  size?: "sm" | "md" | "lg";
  color?: ColorType;
  delay?: number;
}

interface ShapesGroupProps {
  shapes: ShapeConfig[];
  className?: string;
}

const shapeComponents = {
  cube: FloatingCube,
  torus: FloatingTorus,
  pyramid: FloatingPyramid,
  sphere: FloatingSphere,
  octahedron: FloatingOctahedron,
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
              delay: shape.delay || index * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ShapeComponent
              size={shape.size || "md"}
              color={shape.color || "primary"}
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
  hero: [
    { type: "cube" as ShapeType, position: { x: "10%", y: "20%" }, size: "lg" as const, color: "primary" as ColorType },
    { type: "torus" as ShapeType, position: { x: "85%", y: "30%" }, size: "md" as const, color: "accent" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "75%", y: "70%" }, size: "sm" as const, color: "coral" as ColorType },
    { type: "pyramid" as ShapeType, position: { x: "5%", y: "75%" }, size: "md" as const, color: "purple" as ColorType },
  ],
  scattered: [
    { type: "cube" as ShapeType, position: { x: "5%", y: "10%" }, size: "sm" as const, color: "primary" as ColorType },
    { type: "sphere" as ShapeType, position: { x: "90%", y: "15%" }, size: "sm" as const, color: "accent" as ColorType },
    { type: "octahedron" as ShapeType, position: { x: "50%", y: "80%" }, size: "md" as const, color: "gold" as ColorType },
  ],
  corner: [
    { type: "cube" as ShapeType, position: { x: "85%", y: "10%" }, size: "lg" as const, color: "primary" as ColorType },
    { type: "torus" as ShapeType, position: { x: "92%", y: "40%" }, size: "sm" as const, color: "accent" as ColorType },
  ],
};
