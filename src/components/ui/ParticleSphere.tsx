import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
}

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const rotationRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Create particles in sphere formation
    const numParticles = 200;
    const radius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.35;
    particlesRef.current = [];

    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(-1 + (2 * i) / numParticles);
      const theta = Math.sqrt(numParticles * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      particlesRef.current.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      // Slow auto-rotation
      rotationRef.current.y += 0.003;
      rotationRef.current.x = mouseRef.current.y * 0.0005;

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // Sort particles by z for proper depth rendering
      const sortedParticles = particlesRef.current
        .map((p) => {
          const y1 = p.originalY * cosX - p.originalZ * sinX;
          const z1 = p.originalY * sinX + p.originalZ * cosX;
          const x1 = p.originalX * cosY + z1 * sinY;
          const z2 = -p.originalX * sinY + z1 * cosY;

          return {
            ...p,
            projectedX: x1,
            projectedY: y1,
            projectedZ: z2,
          };
        })
        .sort((a, b) => a.projectedZ - b.projectedZ);

      sortedParticles.forEach((p) => {
        const scale = (p.projectedZ + radius * 2) / (radius * 3);
        const alpha = Math.max(0.15, Math.min(1, scale));
        const size = Math.max(1, 3 * scale);

        // Primary color: violet-blue
        const hue = 250;
        const saturation = 85;
        const lightness = 65 + (1 - scale) * 20;

        ctx.beginPath();
        ctx.arc(
          centerX + p.projectedX,
          centerY + p.projectedY,
          size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.fill();

        // Glow effect for front particles
        if (scale > 0.7) {
          ctx.beginPath();
          ctx.arc(
            centerX + p.projectedX,
            centerY + p.projectedY,
            size * 2,
            0,
            Math.PI * 2
          );
          const gradient = ctx.createRadialGradient(
            centerX + p.projectedX,
            centerY + p.projectedY,
            0,
            centerX + p.projectedX,
            centerY + p.projectedY,
            size * 3
          );
          gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw connecting lines for nearby particles
      ctx.strokeStyle = "hsla(250, 85%, 65%, 0.05)";
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < sortedParticles.length; i++) {
        for (let j = i + 1; j < sortedParticles.length; j++) {
          const dx = sortedParticles[i].projectedX - sortedParticles[j].projectedX;
          const dy = sortedParticles[i].projectedY - sortedParticles[j].projectedY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 40) {
            ctx.beginPath();
            ctx.moveTo(
              centerX + sortedParticles[i].projectedX,
              centerY + sortedParticles[i].projectedY
            );
            ctx.lineTo(
              centerX + sortedParticles[j].projectedX,
              centerY + sortedParticles[j].projectedY
            );
            ctx.stroke();
          }
        }
      }

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
