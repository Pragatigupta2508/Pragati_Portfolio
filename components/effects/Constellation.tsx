"use client";

import { useEffect, useRef } from "react";

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let currentStarCount = 100;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

   const createStars = (count: number) =>
  Array.from({ length: count }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 1.0,
    dy: (Math.random() - 0.5) * 1.0,
  }));

const allStars = createStars(100);
let visibleStars = 100;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

     allStars.slice(0, visibleStars).forEach((star) => 
      {
       star.x += star.dx * 0.8;
star.y += star.dy * 0.8;

star.y += Math.sin(Date.now() * 0.0003 + star.x * 0.01) * 0.15;
        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
      });

      // STAR TO STAR CONNECTIONS

     const activeStarsArray = allStars.slice(0, visibleStars);

for (let i = 0; i < activeStarsArray.length; i++) {
  for (let j = i + 1; j < activeStarsArray.length; j++) {
          const dx = activeStarsArray[i].x - activeStarsArray[j].x;
          const dy = activeStarsArray[i].y - activeStarsArray[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(activeStarsArray[i].x, activeStarsArray[i].y);
            ctx.lineTo(activeStarsArray[j].x, activeStarsArray[j].y);

            ctx.strokeStyle = `rgba(255,255,255,${
              0.15 - distance / 700
            })`;

            ctx.stroke();
          }
        }
      }

      // CURSOR CONNECTIONS

     activeStarsArray.forEach((star) => {
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouse.x, mouse.y);

          ctx.strokeStyle = `rgba(214,167,122,${
            0.7 - distance / 250
          })`;

          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const updateDensity = () => {
  const sections = [
    { id: "about", stars: 50 },
    { id: "projects", stars: 60 },
    { id: "achievements", stars: 50 },
    { id: "creative", stars: 70 },
    { id: "contact", stars: 40 },
  ];

  let activeStars = 100;

  sections.forEach((section) => {
    const el = document.getElementById(section.id);

    if (!el) return;

    const rect = el.getBoundingClientRect();

    if (
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2
    ) {
      activeStars = section.stars;
    }
  });

 if (activeStars !== currentStarCount) {
  console.log("Switching to:", activeStars);

  currentStarCount = activeStars;
  visibleStars = activeStars;
}
};
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", updateDensity);
    updateDensity();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", updateDensity);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}