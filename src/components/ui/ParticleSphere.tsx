import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type ShapeType = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "cross";

interface Shape {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  type: ShapeType;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  hue: number;
}

const shapeTypes: ShapeType[] = ["circle", "square", "triangle", "diamond", "hexagon", "cross"];
const colorHues = [250, 280, 320, 45, 180, 200]; // purple, magenta, pink, gold, cyan, blue

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const shapesRef = useRef<Shape[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create shapes in sphere formation with variety
    const numShapes = 150;
    const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.35;
    shapesRef.current = [];

    for (let i = 0; i < numShapes; i++) {
      const phi = Math.acos(-1 + (2 * i) / numShapes);
      const theta = Math.sqrt(numShapes * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      shapesRef.current.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        scale: 0.5 + Math.random() * 0.8,
        hue: colorHues[Math.floor(Math.random() * colorHues.length)],
      });
    }

    const drawShape = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      type: ShapeType,
      rotation: number,
      alpha: number,
      hue: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      const saturation = 85;
      const lightness = 65;
      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.5})`;
      ctx.lineWidth = 1;

      ctx.beginPath();
      
      switch (type) {
        case "circle":
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          break;
        case "square":
          ctx.rect(-size, -size, size * 2, size * 2);
          break;
        case "triangle":
          ctx.moveTo(0, -size);
          ctx.lineTo(size, size);
          ctx.lineTo(-size, size);
          ctx.closePath();
          break;
        case "diamond":
          ctx.moveTo(0, -size * 1.3);
          ctx.lineTo(size, 0);
          ctx.lineTo(0, size * 1.3);
          ctx.lineTo(-size, 0);
          ctx.closePath();
          break;
        case "hexagon":
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = Math.cos(angle) * size;
            const py = Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        case "cross":
          const t = size * 0.3;
          ctx.moveTo(-t, -size);
          ctx.lineTo(t, -size);
          ctx.lineTo(t, -t);
          ctx.lineTo(size, -t);
          ctx.lineTo(size, t);
          ctx.lineTo(t, t);
          ctx.lineTo(t, size);
          ctx.lineTo(-t, size);
          ctx.lineTo(-t, t);
          ctx.lineTo(-size, t);
          ctx.lineTo(-size, -t);
          ctx.lineTo(-t, -t);
          ctx.closePath();
          break;
      }
      
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Slow auto-rotation with mouse influence
      rotationRef.current.y += 0.004;
      rotationRef.current.x = mouseRef.current.y * 0.0003;

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // Sort shapes by z for proper depth rendering
      const sortedShapes = shapesRef.current
        .map((s) => {
          // Add subtle breathing animation
          const breathe = Math.sin(timeRef.current + s.originalX * 0.01) * 5;
          
          const y1 = (s.originalY + breathe) * cosX - s.originalZ * sinX;
          const z1 = (s.originalY + breathe) * sinX + s.originalZ * cosX;
          const x1 = s.originalX * cosY + z1 * sinY;
          const z2 = -s.originalX * sinY + z1 * cosY;

          return {
            ...s,
            projectedX: x1,
            projectedY: y1,
            projectedZ: z2,
            rotation: s.rotation + s.rotationSpeed,
          };
        })
        .sort((a, b) => a.projectedZ - b.projectedZ);

      // Update rotations
      sortedShapes.forEach((s, i) => {
        shapesRef.current[i].rotation = s.rotation;
      });

      // Draw connecting lines between nearby shapes of same type
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < sortedShapes.length; i++) {
        for (let j = i + 1; j < sortedShapes.length; j++) {
          if (sortedShapes[i].type !== sortedShapes[j].type) continue;
          
          const dx = sortedShapes[i].projectedX - sortedShapes[j].projectedX;
          const dy = sortedShapes[i].projectedY - sortedShapes[j].projectedY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            const alpha = (1 - distance / 50) * 0.1;
            ctx.strokeStyle = `hsla(${sortedShapes[i].hue}, 85%, 65%, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(
              centerX + sortedShapes[i].projectedX,
              centerY + sortedShapes[i].projectedY
            );
            ctx.lineTo(
              centerX + sortedShapes[j].projectedX,
              centerY + sortedShapes[j].projectedY
            );
            ctx.stroke();
          }
        }
      }

      // Draw shapes
      sortedShapes.forEach((s) => {
        const scale = (s.projectedZ + radius * 2) / (radius * 3);
        const alpha = Math.max(0.2, Math.min(1, scale));
        const size = Math.max(2, 5 * scale * s.scale);

        drawShape(
          ctx,
          centerX + s.projectedX,
          centerY + s.projectedY,
          size,
          s.type,
          s.rotation,
          alpha,
          s.hue
        );

        // Glow effect for front shapes
        if (scale > 0.75) {
          const gradient = ctx.createRadialGradient(
            centerX + s.projectedX,
            centerY + s.projectedY,
            0,
            centerX + s.projectedX,
            centerY + s.projectedY,
            size * 3
          );
          gradient.addColorStop(0, `hsla(${s.hue}, 85%, 65%, ${alpha * 0.2})`);
          gradient.addColorStop(1, "transparent");
          
          ctx.beginPath();
          ctx.arc(
            centerX + s.projectedX,
            centerY + s.projectedY,
            size * 3,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </motion.div>
  );
}
