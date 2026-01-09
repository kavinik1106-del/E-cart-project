import React, { useEffect, useRef, useCallback } from "react";

const DotParticleCanvas = ({
  backgroundColor = "transparent",
  particleColor = "255, 255, 255",
  animationSpeed = 0.006,
}) => {
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const dprRef = useRef(1);
  const particles = useRef([]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const parent = canvas.parentElement;
    const displayWidth = parent ? parent.clientWidth : window.innerWidth;
    const displayHeight = parent ? parent.clientHeight : window.innerHeight;

    canvas.width = Math.max(1, Math.floor(displayWidth * dpr));
    canvas.height = Math.max(1, Math.floor(displayHeight * dpr));
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Reset transform before setting (prevents cumulative scaling)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback((e) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const numParticles = 25 + Math.random() * 15;
    for (let i = 0; i < numParticles; i++) {
      const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 4;
      const size = 1 + Math.random() * 3;
      particles.current.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 2000 + Math.random() * 3000,
        size: size,
        angle: angle,
        speed: speed,
      });
    }
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      particles.current.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 4000 + Math.random() * 2000,
        size: 2 + Math.random() * 2,
        angle: angle,
        speed: speed,
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    timeRef.current += animationSpeed;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // If background is transparent, clear the canvas each frame; otherwise fill with color
    if (backgroundColor === "transparent") {
      ctx.clearRect(0, 0, width, height);
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }

    particles.current = particles.current.filter((particle) => {
      particle.life += 16;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.02;
      particle.vx *= 0.995;
      particle.vy *= 0.995;
      const organicX = Math.sin(timeRef.current + particle.angle) * 0.3;
      const organicY = Math.cos(timeRef.current + particle.angle * 0.7) * 0.2;
      particle.x += organicX;
      particle.y += organicY;
      const lifeProgress = particle.life / particle.maxLife;
      const alpha = Math.max(0, (1 - lifeProgress) * 0.8);
      const currentSize = particle.size * (1 - lifeProgress * 0.3);
      if (alpha > 0) {
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, 2 * Math.PI);
        ctx.fill();
      }
      return (
        particle.life < particle.maxLife &&
        particle.x > -50 &&
        particle.x < width + 50 &&
        particle.y > -50 &&
        particle.y < height + 50
      );
    });

    requestIdRef.current = requestAnimationFrame(animate);
  }, [backgroundColor, particleColor, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Make the canvas cover its parent and ignore pointer events so it doesn't block buttons
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";

    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener("resize", handleResize);

    // Use window events so pointer-events: none doesn't block interactions
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Seed ambient particles so there is visible motion immediately
    const seedAmbient = (n = 60) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          life: Math.random() * 2000,
          maxLife: 8000 + Math.random() * 6000,
          size: 0.5 + Math.random() * 2.5,
          angle,
          speed: 0.2 + Math.random() * 0.6,
        });
      }
    };

    seedAmbient();

    // Ambient emitter adds a few particles periodically
    const ambientInterval = setInterval(() => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const count = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.5;
        particles.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 3000 + Math.random() * 4000,
          size: 0.5 + Math.random() * 1.5,
          angle,
          speed,
        });
      }
    }, 400);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearInterval(ambientInterval);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
        requestIdRef.current = null;
      }
      timeRef.current = 0;
      particles.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default DotParticleCanvas;
