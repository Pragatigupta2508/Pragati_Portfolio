"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ─── types ────────────────────────────────────────────────────── */
type Category = "ai-ml" | "web" | "open-source" | "creative" | "mobile";

interface Project {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  category: Category[];
  github: string;
  demo: string;
  featured: boolean;
  apk?: string;
}

/* ─── data ─────────────────────────────────────────────────────── */
const FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Featured", value: "featured" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "Full Stack", value: "web" },
  { label: "Open Source", value: "open-source" },
  { label: "Creative", value: "creative" },
  { label: "Mobile", value: "mobile" },
];

const PROJECTS: Project[] = [
  {
    icon: "🤖",
    title: "SupportSphere AI",
    description:
      "AI-powered customer support chatbot built with Next.js and Gemini AI. Provides intelligent responses, conversation history, quick replies, and a modern chat experience.",
    tags: ["Next.js", "Gemini AI", "TypeScript", "Tailwind"],
    category: ["ai-ml", "web"],
    github: "https://github.com/Pragatigupta2508/SupportSphere-AI",
    demo: "https://support-sphere-ai-zeta.vercel.app/",
    featured: true,
  },

  {
    icon: "🛡️",
    title: "Spam Shield AI",
    description:
      "Machine learning powered spam detection system that classifies suspicious messages and emails. Built using Flask, Scikit-learn, Next.js and deployed on Vercel.",
    tags: ["Python", "Flask", "ML", "Next.js"],
    category: ["ai-ml", "web"],
    github: "https://github.com/Pragatigupta2508/Spam_Shield_AI",
    demo: "https://spam-shield-frvzoejlm-pragatigupta2508s-projects.vercel.app/",
    featured: true,
  },

  {
    icon: "🔮",
    title: "InsightGenie AI",
    description:
      "Business intelligence dashboard that transforms CSV and Excel data into interactive insights, anomaly detection, trends, forecasts, and recommendations.",
    tags: ["JavaScript", "Chart.js", "PapaParse", "SheetJS"],
    category: ["ai-ml", "web"],
    featured: true,
    github: "https://github.com/Pragatigupta2508/insightgenie-ai",
    demo: "",
  },

  {
    icon: "📈",
    title: "Sales Forecasting & Demand Intelligence",
    description:
      "End-to-end ML dashboard that forecasts sales, detects anomalies, and segments products by demand patterns using SARIMA, Prophet, XGBoost, Isolation Forest, and K-Means.",
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "Prophet",
      "Streamlit",
    ],
    category: ["ai-ml"],
    featured: true,
    github:
      "https://github.com/Pragatigupta2508/Sales-Forecasting-Demand-Intelligence",
    demo:
      "https://sales-forecasting-demand-intelligence-haqgpzsppplnub8mapp55g3.streamlit.app/",
  },

  {
    icon: "💜",
    title: "HerStack",
    description:
      "Open source AI/ML learning platform helping girls and young women across India discover learning paths, AI concepts, and women mentors.",
    tags: ["React", "Vite", "Tailwind CSS"],
    category: ["open-source"],
    featured: false,
    github: "https://github.com/Pragatigupta2508/website",
    demo: "https://herstack.org/",
  },

  {
    icon: "🛡️",
    title: "Jhansi Shield",
    description:
      "Android emergency response app designed to help users quickly access safety features and emergency assistance through a simple, accessible interface.",
    tags: ["MIT App Inventor", "Android", "Mobile"],
    category: ["mobile"],
    featured: false,
    github: "",
    demo: "",
    apk: "",
  },

  {
    icon: "🌍",
    title: "Explore with Pragati",
    description:
      "Responsive multi-page travel website featuring destination browsing, booking interfaces, and authentication UI, designed and deployed with GitHub Pages.",
    tags: ["HTML5", "CSS3", "GitHub Pages"],
    category: ["web"],
    featured: false,
    github: "https://github.com/Pragatigupta2508/Travel_Log",
    demo: "https://pragatigupta2508.github.io/Travel_Log/",
  },

  {
    icon: "🎮",
    title: "PokeShot",
    description:
      "A Python Pygame shooting game where players control a cannon, battle descending monsters, and use shields to defend against enemy attacks.",
    tags: ["Python", "Pygame"],
    category: ["creative"],
    featured: false,
    github: "https://github.com/Pragatigupta2508/Pokeshot",
    demo: "",
  },
];

const EXPLORING = [
  { icon: "🤖", label: "LLM Applications" },
  { icon: "☁️", label: "Cloud & AWS" },
  { icon: "🧠", label: "Machine Learning" },
  { icon: "⚡", label: "System Design" },
  { icon: "🌍", label: "Open Source" },
  { icon: "📊", label: "Data Structures & Algorithms" },
];

/* ─── card ──────────────────────────────────────────────────────── */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }

  const hasApkLink = !!p.apk && p.apk !== "YOUR_APK_LINK";

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        animationDelay: `${index * 70}ms`,
        transform: hovered
          ? `perspective(900px) rotateX(${(mouse.y - 0.5) * -7}deg) rotateY(${(mouse.x - 0.5) * 7}deg) translateY(-5px)`
          : "perspective(900px) rotateX(0) rotateY(0) translateY(0)",
        transition: "transform 0.28s ease",
        boxShadow: hovered
          ? p.featured
            ? "0 28px 60px rgba(83,46,180,0.28), 0 0 0 1px rgba(214,167,122,0.2)"
            : "0 24px 50px rgba(83,46,180,0.2), 0 8px 20px rgba(0,0,0,0.35)"
          : "none",
      }}
    >
      {/* Rotating conic border for featured cards */}
      {p.featured && hovered && (
        <div
          className="absolute inset-[-1px] rounded-[21px] pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 20%, rgba(196,181,253,0.5), rgba(214,167,122,0.6), transparent 80%)",
            zIndex: 0,
            animation: "rotateBorder 3s linear infinite",
          }}
        />
      )}

      {/* Card surface */}
      <div
        className="relative z-10 flex flex-col gap-[14px] p-[22px] h-full rounded-2xl"
        style={{
          background: p.featured
            ? hovered
              ? "linear-gradient(150deg,rgba(83,46,180,0.22) 0%,rgba(10,6,26,0.95) 55%,rgba(214,167,122,0.08) 100%)"
              : "linear-gradient(150deg,rgba(83,46,180,0.15) 0%,rgba(20,15,40,0.65) 55%,rgba(214,167,122,0.06) 100%)"
            : hovered
              ? "rgba(139,92,246,0.07)"
              : "rgba(255,255,255,0.03)",
          border: p.featured
            ? `1px solid ${hovered ? "rgba(214,167,122,0.32)" : "rgba(214,167,122,0.2)"}`
            : `1px solid ${hovered ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.07)"}`,
          backdropFilter: "blur(20px)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Spotlight follow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(139,92,246,0.12), transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Top shimmer */}
        <div
          className="absolute top-0 left-3 right-3 h-px transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.85),transparent)",
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* Featured badge */}
        {p.featured && (
          <span
            className="absolute top-4 right-4 z-20 rounded-full px-[10px] py-[3px] text-[9px] font-semibold uppercase tracking-[2.5px]"
            style={{ background: "rgba(214,167,122,0.1)", border: "1px solid rgba(214,167,122,0.38)", color: "#d6a77a" }}
          >
            Featured
          </span>
        )}

        {/* Icon */}
        <div
          className="relative z-10 flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-[14px] text-[22px] transition-all duration-300"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow: hovered ? "0 0 24px rgba(139,92,246,0.35)" : "none",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        >
          {p.icon}
        </div>

        {/* Title */}
        <h3
          className="relative z-10 text-[14.5px] font-semibold leading-snug pr-14 transition-colors duration-200"
          style={{ color: hovered ? "#ece6ff" : "#ccc4e8" }}
        >
          {p.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-[12.5px] leading-relaxed flex-1" style={{ color: "#9f8fcf" }}>
          {p.description}
        </p>

        {/* Tags */}
        <div className="relative z-10 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full px-[10px] py-1 text-[11px] font-medium tracking-[0.3px] transition-all duration-200"
              style={{
                background: hovered ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.1)",
                border: `1px solid ${hovered ? "rgba(139,92,246,0.36)" : "rgba(139,92,246,0.18)"}`,
                color: hovered ? "#c4b5fd" : "#9585c8",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="relative z-10 flex gap-2 pt-[14px] flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {p.demo && (
            <Link
              href={p.demo}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-[10px] px-[14px] py-[6px] text-[11.5px] font-medium transition-all duration-200"
              style={{ border: "1px solid rgba(214,167,122,0.4)", color: "#d6a77a", background: "rgba(214,167,122,0.06)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(214,167,122,0.16)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(214,167,122,0.65)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(214,167,122,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(214,167,122,0.4)"; }}
            >
              <span style={{ fontSize: 13 }}>↗</span> Demo
            </Link>
          )}
          {p.github && (
            <Link
              href={p.github}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-[10px] px-[14px] py-[6px] text-[11.5px] font-medium transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#7a6e99", background: "transparent" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c4b5fd"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.45)"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7a6e99"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </Link>
          )}
          {hasApkLink && (
            <Link
              href={p.apk!}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-[10px] px-[14px] py-[6px] text-[11.5px] font-medium transition-all duration-200"
              style={{ border: "1px solid rgba(139,92,246,0.3)", color: "#c4b5fd", background: "rgba(139,92,246,0.06)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.16)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.55)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.3)"; }}
            >
              <span style={{ fontSize: 13 }}>⬇</span> APK
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const visible = PROJECTS.filter((p) => {
    if (active === "featured") return p.featured;
    if (active === "all") return true;
    return p.category.includes(active as Category);
  });

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeSlideUp 0.65s ease both; }

        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-10px, -35px) scale(0.97); }
          75% { transform: translate(-25px, -10px) scale(1.03); }
        }
        .orb-drift { animation: orbDrift var(--dur, 12s) ease-in-out infinite; animation-delay: var(--delay, 0s); }

        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background-image: linear-gradient(110deg, #b48ef5 0%, #e0cbff 35%, #d6a77a 70%, #f0c47a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s linear infinite;
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotateBorder {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
      `}</style>

      <section
        id="projects"
        className="relative min-h-screen py-20 px-6 md:px-16 text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.015), rgba(255,255,255,0.008))"
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(196,181,253,0.08), transparent 60%)"
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── HEADING ── */}
          <div className={`text-center mb-14 ${mounted ? "fade-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="h-px w-10" style={{ background: "linear-gradient(to right,transparent,rgba(214,167,122,0.6))" }} />
              <span className="text-[10px] font-semibold uppercase tracking-[5px]" style={{ color: "#d6a77a" }}>Portfolio</span>
              <div className="h-px w-10" style={{ background: "linear-gradient(to left,transparent,rgba(214,167,122,0.6))" }} />
            </div>

            <h1 className="mb-5 font-bold leading-[1.05]" style={{ fontSize: "clamp(44px,6vw,70px)", letterSpacing: "-0.03em" }}>
              <span style={{ color: "#ddd6f7" }}>Things I&apos;ve </span>
              <span className="shimmer-text">Built</span>
            </h1>

            <p className="text-[15px] max-w-[400px] mx-auto leading-relaxed" style={{ color: "#7f729d" }}>
              From ML models to full-stack apps — where technology meets real-world impact.
            </p>
          </div>

          {/* ── FILTER TABS ── */}
          <div
            className={`mb-16 flex justify-center ${mounted ? "fade-up" : "opacity-0"}`}
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className="relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
                  style={{
                    background:
                      active === f.value
                        ? "linear-gradient(135deg, rgba(139,92,246,.22), rgba(196,181,253,.12))"
                        : "rgba(255,255,255,.03)",

                    border:
                      active === f.value
                        ? "1px solid rgba(196,181,253,.35)"
                        : "1px solid rgba(255,255,255,.08)",

                    color:
                      active === f.value
                        ? "#f2ecff"
                        : "#a79bc8",

                    backdropFilter: "blur(18px)",

                    boxShadow:
                      active === f.value
                        ? "0 0 30px rgba(139,92,246,.25)"
                        : "0 4px 20px rgba(0,0,0,.08)",

                    transform:
                      active === f.value
                        ? "translateY(-2px)"
                        : "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== f.value) {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
                      e.currentTarget.style.borderColor = "rgba(196,181,253,.18)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== f.value) {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,.08)";
                    }
                  }}
                >
                  {active === f.value && (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(196,181,253,.15), transparent 70%)",
                        }}
                      />
                      <div
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#d6a77a", fontSize: "10px" }}
                      >
                        ✦
                      </div>
                    </>
                  )}

                  <span
                    className="relative z-10"
                    style={{
                      paddingLeft: active === f.value ? "10px" : "0px",
                      transition: "all .3s ease",
                    }}
                  >
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-20">
            {visible.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} />
            ))}
            {visible.length === 0 && (
              <div className="col-span-3 text-center py-20 text-sm md:text-base">
                <p style={{ color: "#3a3258", fontSize: 14 }}>Nothing here yet — check back soon ✦</p>
              </div>
            )}
          </div>

          {/* ── CURRENTLY FOCUS ── */}
          <div className={mounted ? "fade-up" : "opacity-0"} style={{ animationDelay: "220ms" }}>
            <div className="flex items-center gap-4 mb-7">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right,transparent,rgba(176, 151, 233, 0.3))" }} />
              <span className="text-[11px] font-semibold tracking-[2px] uppercase" style={{ color: "#9f8ec8" }}>Current FOCUS</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left,transparent,rgba(176, 151, 233, 0.3))" }} />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {EXPLORING.map((e) => (
                <div
                  key={e.label}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-medium cursor-default select-none transition-all duration-250"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", color: "#6a6080", backdropFilter: "blur(8px)" }}
                  onMouseEnter={(el) => {
                    const t = el.currentTarget as HTMLElement;
                    t.style.background = "rgba(139,92,246,0.12)";
                    t.style.borderColor = "rgba(139,92,246,0.4)";
                    t.style.color = "#c4b5fd";
                    t.style.transform = "translateY(-3px)";
                    t.style.boxShadow = "0 8px 24px rgba(139,92,246,0.15)";
                  }}
                  onMouseLeave={(el) => {
                    const t = el.currentTarget as HTMLElement;
                    t.style.background = "rgba(255,255,255,0.025)";
                    t.style.borderColor = "rgba(255,255,255,0.08)";
                    t.style.color = "#6a6080";
                    t.style.transform = "translateY(0)";
                    t.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 16 }}>{e.icon}</span>
                  {e.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}