"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────── DATA ─────────────────────── */

const ACHIEVEMENTS = [
  {
    icon: "☁️",
    title: "AWS Certified ML Associate",
    org: "Amazon Web Services",
    year: "2026",
    desc: "Earned cloud + ML certification validating deep knowledge of ML infrastructure, model deployment, and AWS AI services.",
    accent: "#f0a16a",
    glow: "rgba(240,161,106,0.35)",
  },
  {
    icon: "🌐",
    title: "GSSoC'26 Contributor",
    org: "GirlScript Summer of Code",
    year: "2026",
    desc: "Selected as an open-source contributor. Merged 5+ pull requests into production codebases during the program.",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  {
    icon: "💡",
    title: "InnoGeeks Winter of Code",
    org: "InnoGeeks, KIET",
    year: "2025",
    desc: "Contributed as a Code Contributor — hands-on industry experience collaborating on real student-led open-source projects.",
    accent: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
  },
  {
    icon: "🏢",
    title: "AI Intern",
    org: "Codec Technologies",
    year: "2026",
    desc: "Working on intelligent systems combining NLP, computer vision, and backend integration to solve real business problems.",
    accent: "#f0a16a",
    glow: "rgba(240,161,106,0.35)",
  },
  {
    icon: "🏆",
    title: "9.1 CGPA",
    org: "KIET Group of Institutions",
    year: "Ongoing",
    desc: "Maintaining a 9.1 CGPA while juggling internships, open-source work, and building side projects.",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.35)",
  },
  {
    icon: "⌨️",
    title: "300+ DSA Problems",
    org: "LeetCode · CodeChef · Codeforces",
    year: "Ongoing",
    desc: "Consistent competitive programmer with 300+ problems solved across platforms — strong in arrays, graphs, and DP.",
    accent: "#c084fc",
    glow: "rgba(192,132,252,0.35)",
  },
];

const STATS = [
  { value: "AWS", label: "ML Associate", numeric: false },
  { value: "5",   label: "Merged PRs",   numeric: true, suffix: "+" },
  { value: "9.1", label: "CGPA",         numeric: true, suffix: "" },
  { value: "300", label: "Problems Solved", numeric: true, suffix: "+" },
];

/* ─────────────────────── NEBULA BG ─────────────────────── */

function NebulaCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    let t = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* stars */
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() < 0.08 ? 1.8 : Math.random() < 0.25 ? 1.1 : 0.55,
      a: 0.15 + Math.random() * 0.65,
      speed: 0.3 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    /* nebula blobs */
    const blobs = [
      { cx: 0.75, cy: 0.18, r: 0.38, col: "139,92,246" },
      { cx: 0.15, cy: 0.72, r: 0.32, col: "214,167,122" },
      { cx: 0.5,  cy: 0.5,  r: 0.28, col: "192,132,252" },
    ];

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);

      /* nebula */
      blobs.forEach(({ cx, cy, r, col }) => {
        const grd = ctx.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, r * Math.min(w, h));
        grd.addColorStop(0,   `rgba(${col},0.12)`);
        grd.addColorStop(0.5, `rgba(${col},0.05)`);
        grd.addColorStop(1,   `rgba(${col},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(cx * w, cy * h, r * w * (1 + 0.04 * Math.sin(t)), r * h * (1 + 0.04 * Math.cos(t * 0.7)), t * 0.1, 0, Math.PI * 2);
        ctx.fill();
      });

      /* stars */
      stars.forEach(s => {
        const pulse = s.a * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = pulse;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ─────────────────────── 3-D TILT CARD ─────────────────────── */

type AchievementCardProps = typeof ACHIEVEMENTS[0] & { index: number };

function AchievementCard({ icon, title, org, year, desc, accent, glow, index }: AchievementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width  - 0.5;
    const py = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 12 });
  }, []);

  const onLeave = useCallback(() => { setTilt({ x: 0, y: 0 }); setHovered(false); }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        perspective: "900px",
        animationDelay: `${index * 80}ms`,
      }}
      className="achievement-card-wrapper"
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0) ${hovered ? "scale(1.03)" : "scale(1)"}`,
          transition: hovered ? "transform 0.08s linear" : "transform 0.55s cubic-bezier(.23,1.03,.32,1)",
background:
  "linear-gradient(135deg, rgba(18,16,32,0.92), rgba(26,22,45,0.85))",
          border: `1px solid ${hovered ? accent + "66" : "rgba(255,255,255,0.12)"}`,
          borderRadius: "18px",
          padding: "28px 26px",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(18px)",
          boxShadow: hovered
            ? `0 0 0 1px ${accent}30, 0 25px 80px -15px ${glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
            : "inset 0 1px 0 rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          minHeight: "220px",
          willChange: "transform",
          cursor: "default",
          
WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Spotlight sweep */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * 3}%, ${accent}12 0%, transparent 65%)`,
            borderRadius: "18px",
            transition: "background 0.08s",
          }} />
        )}

        {/* Top edge glow line */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }} />

        {/* Floating orb */}
        <div style={{
          position: "absolute", top: "-30px", right: "-30px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          filter: "blur(18px)",
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: "46px", height: "46px", borderRadius: "12px", fontSize: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${accent}20, ${accent}0a)`,
            border: `1px solid ${accent}35`,
            transform: hovered ? "translateY(-3px) scale(1.08)" : "translateY(0) scale(1)",
            transition: "transform 0.35s cubic-bezier(.23,1,.32,1)",
            boxShadow: hovered ? `0 8px 24px ${glow}` : "none",
          }}>
            {icon}
          </div>
          <span style={{
            fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: "20px",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.09)",
            color: "#ffffff", fontWeight: 500, textShadow: "0 0 4px rgba(255,255,255,0.15)",
          }}>
            {year}
          </span>
        </div>

        {/* Text */}
        <div>
          <h3 style={{background:
  "linear-gradient(135deg,#ffffff,#f4d4ff,#ffffff)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
            fontSize: "15px", fontWeight: 600, color: "#ece8f8", lineHeight: 1.35,
            marginBottom: "4px", letterSpacing: "-0.01em",
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.13em",
            color: accent, fontWeight: 500,
          }}>
            {org}
          </p>
        </div>

        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, flex: 1,
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
          transition: "transform 0.3s",
        }}>
          {desc}
        </p>

        {/* Bottom shimmer bar */}
        <div style={{
          height: "2px", borderRadius: "1px",
          background: `linear-gradient(90deg, transparent, ${accent}60, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s",
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────── ANIMATED COUNTER ─────────────────────── */

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val}</span>;
}

/* ─────────────────────── STAT CARD ─────────────────────── */

function StatCard({ value, label, numeric, suffix }: typeof STATS[0]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
       
  position: "relative",
  textAlign: "center",
  padding: "32px 24px",
  borderRadius: "22px",
  overflow: "hidden",
  cursor: "default",

  background:
    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",

  border: `1px solid ${
    hovered
      ? "rgba(240,161,106,0.35)"
      : "rgba(255,255,255,0.10)"
  }`,

  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",

  transform: hovered
    ? "translateY(-8px) scale(1.02)"
    : "translateY(0) scale(1)",

  transition: "all 0.4s cubic-bezier(.23,1,.32,1)",

  boxShadow: hovered
    ? `
      0 25px 60px -10px rgba(240,161,106,0.18),
      0 0 30px rgba(167,139,250,0.15),
      inset 0 1px 0 rgba(255,255,255,0.12)
    `
    : "inset 0 1px 0 rgba(255,255,255,0.06)",
}}
    >
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
        background: "linear-gradient(90deg,transparent,#8b5cf6,transparent)",
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />
      <div style={{
        position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
        width: "80px", height: "80px", borderRadius: "50%",
        background: "radial-gradient(circle,rgba(139,92,246,0.18),transparent 70%)",
        filter: "blur(10px)",
        opacity: hovered ? 1 : 0.3, transition: "opacity 0.4s",
      }} />

      <p style={{
        fontSize: "38px", fontWeight: 700, letterSpacing: "-0.03em",
        background: "linear-gradient(135deg,#f0a16a,#f4d4ff,#a78bfa)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", lineHeight: 1, marginBottom: "10px",
transform: hovered ? "scale(1.12)" : "scale(1)",
textShadow: hovered
  ? "0 0 30px rgba(240,161,106,0.4)"
  : "0 0 15px rgba(240,161,106,0.15)",
        transition: "transform 0.35s cubic-bezier(.23,1,.32,1)",
        display: "inline-block",
      }}>
        {numeric
          ? <><CountUp target={parseFloat(value)} />{suffix}</>
          : value}
      </p>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────── MAIN SECTION ─────────────────────── */

export default function Achievements() {
  return (
   <section
  id="achievements"
  style={{
    position: "relative",
    padding: "64px 0",
    overflow: "hidden",
    background:
      "radial-gradient(circle at center, rgba(139,92,246,0.15), transparent 70%)",
  }}
>
        {/* <div className="absolute inset-0  /> */}
  
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .achievement-card-wrapper {
          animation: fadeUp 0.55s cubic-bezier(.23,1,.32,1) both;
        }
        .stat-card-wrapper {
          animation: fadeUp 0.6s cubic-bezier(.23,1,.32,1) both;
        }
      `}</style>

      {/* Static radial overlays */}
      <div style={{
        position: "absolute", top: "-140px", right: "-140px",
        width: "600px", height: "600px", borderRadius: "50%", pointerEvents: "none",
background: "radial-gradient(circle,rgba(214,167,122,0.11),transparent 70%)",
        filter: "blur(80px)",
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", left: "-120px",
        width: "500px", height: "500px", borderRadius: "50%", pointerEvents: "none",
background: "radial-gradient(circle,rgba(214,167,122,0.04),transparent 70%)",
        filter: "blur(80px)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1160px", margin: "0 auto", padding: "0 32px" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: "72px", animation: "fadeUp 0.5s both" }}>
          <p style={{
            textTransform: "uppercase", letterSpacing: "0.22em", fontSize: "11px",
            color: "#f0a16a", marginBottom: "16px", fontWeight: 500,textShadow: "0 0 20px rgba(255,255,255,0.15)"
          }}>
            Recognition
          </p>
          <h2 style={{
            fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 700, lineHeight: 1.12,
           color: "#ffffff", letterSpacing: "-0.03em", marginBottom: "18px",
          }}>
            Milestones &amp;{" "}
            <span style={{
              background: "linear-gradient(100deg,#f0a16a 0%,#f4d4ff 45%,#a78bfa 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Achievements
            </span>
          </h2>
          <p style={{ fontSize: "15px",color: "rgba(255,255,255,0.65)" , maxWidth: "400px", margin: "0 auto", lineHeight: 1.65 }}>
            Certifications, contributions, and milestones that mark the journey so far.
          </p>

          {/* Decorative line */}
          <div style={{
            width: "60px", height: "2px", margin: "28px auto 0",
            background: "linear-gradient(90deg,#f0a16a,#a78bfa)",
            borderRadius: "1px",
          }} />
        </div>

        {/* ── Achievement Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
          marginBottom: "64px",
        }}>
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.title} {...a} index={i} />
          ))}
        </div>

        {/* ── Stats ── */}
      {/* ── Stats ── */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "16px",
  }}
>
  {STATS.map((s, i) => (
    <div
      key={s.label}
      className="stat-card-wrapper"
      style={{ animationDelay: `${300 + i * 70}ms` }}
    >
      <StatCard {...s} />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}