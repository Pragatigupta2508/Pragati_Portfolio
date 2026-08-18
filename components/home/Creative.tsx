"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const GALLERY = [
  { id: 1, src: "/images/1000006425.jpg.jpeg", label: "Graphite Portrait", accent: "#c8a87a" },
  { id: 2, src: "/images/1000054298.jpg.jpeg", label: "Conceptual Illustration", accent: "#9b7ed4" },
  { id: 3, src: "/images/1000119895.png", label: "Light & Shadow Study", accent: "#7ec8c8" },
  { id: 4, src: "/images/1000125451.jpg.jpeg", label: "Acrylic Nature Painting", accent: "#a8c87e" },
  { id: 5, src: "/images/1000125452.jpg.jpeg", label: "Surreal Character Design", accent: "#d47eb8" },
  { id: 6, src: "/images/1000125453.jpg.jpeg", label: "Expressionist Acrylic Art", accent: "#d4947e" },
];

const INTERESTS = [
  { icon: "🎨", label: "Painting & Sketching" },
  { icon: "🔭", label: "Stargazing" },
  { icon: "📖", label: "Reading Sci-Fi" },
  { icon: "🎵", label: "Music" },
  { icon: "✍️", label: "Journaling" },
  { icon: "🌿", label: "Nature Walks" },
];

const AUTO_INTERVAL = 2800;
const VISIBLE = 3; // always show 3 at a time

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Returns 3 items starting at `start`, wrapping around
function getSlice(start: number) {
  return Array.from({ length: VISIBLE }, (_, i) => GALLERY[(start + i) % GALLERY.length]);
}

function GalleryCarousel() {
  const [start, setStart] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: wrapRef, visible } = useInView(0.05);

  // currentSlice and nextSlice for the slide transition
  const [displayStart, setDisplayStart] = useState(0);
  const [nextStart, setNextStart] = useState<number | null>(null);

  const advance = useCallback(() => {
    if (sliding) return;
    const next = (start + 1) % GALLERY.length;
    setNextStart(next);
    setSliding(true);
    setTimeout(() => {
      setStart(next);
      setDisplayStart(next);
      setNextStart(null);
      setSliding(false);
    }, 500);
  }, [sliding, start]);

  const goBack = useCallback(() => {
    if (sliding) return;
    const prev = (start - 1 + GALLERY.length) % GALLERY.length;
    setNextStart(prev);
    setSliding(true);
    setTimeout(() => {
      setStart(prev);
      setDisplayStart(prev);
      setNextStart(null);
      setSliding(false);
    }, 500);
  }, [sliding, start]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [paused, start, advance]);

  const currentItems = getSlice(displayStart);

  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel viewport */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 16 }}>

        {/* Sliding track — current 3 images */}
        <div
          key={`${displayStart}-${sliding}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            animation: sliding
              ? "slideTrackOut 0.5s cubic-bezier(0.4,0,0.2,1) forwards"
              : "slideTrackIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards",
          }}
        >
          {currentItems.map((item, i) => (
            <SlideCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={goBack}
          aria-label="Previous"
          style={{
            position: "absolute", left: -16, top: "50%",
            transform: "translateY(-50%)", zIndex: 30,
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(7,5,16,0.75)",
            color: "#e2d9f3", display: "flex",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", backdropFilter: "blur(8px)",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(7,5,16,0.75)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8.5 2L3.5 6.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={advance}
          aria-label="Next"
          style={{
            position: "absolute", right: -16, top: "50%",
            transform: "translateY(-50%)", zIndex: 30,
            width: 36, height: 36, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(7,5,16,0.75)",
            color: "#e2d9f3", display: "flex",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", backdropFilter: "blur(8px)",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(7,5,16,0.75)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M4.5 2L9.5 6.5L4.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot indicators — one per painting */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {GALLERY.map((g, i) => {
          const isActive = currentItems.some(c => c.id === g.id);
          return (
            <div
              key={g.id}
              style={{
                width: isActive ? 18 : 5,
                height: 5,
                borderRadius: 3,
                background: isActive ? g.accent : "rgba(255,255,255,0.15)",
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          );
        })}
      </div>

      {/* Auto-play progress bar */}
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, marginTop: 10, overflow: "hidden" }}>
        <div
          key={`bar-${start}-${paused}`}
          style={{
            height: "100%", borderRadius: 1,
            background: "linear-gradient(to right, #d6a77a, #9b7ed4)",
            animation: paused ? "none" : `fillBar ${AUTO_INTERVAL}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes slideTrackIn  { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideTrackOut { from { opacity:1; transform:translateX(0);     } to { opacity:0; transform:translateX(-30px); } }
        @keyframes fillBar { from { width:0%; } to { width:100%; } }
      `}</style>
    </div>
  );
}

function SlideCard({ item }: { item: typeof GALLERY[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? `${item.accent}66` : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered
          ? `0 20px 60px -10px ${item.accent}55, 0 0 25px ${item.accent}22, inset 0 1px 0 rgba(255,255,255,0.15)`
          : "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Aurora glow */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at 50% -20%, ${item.accent}44, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <Image
        src={item.src}
        alt={item.label}
        width={800}
        height={1000}
        className="w-full"
        style={{
          maxHeight: 360,
          objectFit: "contain",
          display: "block",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 0.6s ease",
        }}
      />

      {/* Label overlay slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{
          background: "linear-gradient(to top, rgba(7,5,16,0.95) 0%, rgba(7,5,16,0.6) 100%)",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <p className="text-sm font-medium tracking-wide" style={{ color: "#e2d9f3" }}>
          {item.label}
        </p>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }}
        />
      </div>
    </div>
  );
}

export default function Creative() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { ref: introRef, visible: introVisible } = useInView(0.1);
  const { ref: quoteRef, visible: quoteVisible } = useInView(0.1);
  const { ref: interestsRef, visible: interestsVisible } = useInView(0.1);
const [quoteHover, setQuoteHover] = useState(false);
  return (
    <section
      id="creative"
  className="relative py-16 px-6 md:px-20 overflow-hidden bg-transparent"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at center, rgba(139,92,246,0.08), transparent 70%)" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700, top: "20%", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <Stars />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Hero Heading ── */}
        <div
          ref={introRef}
          className="text-center mb-20"
          style={{
            opacity: introVisible ? 1 : 0,
            transform: introVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(to right, transparent, #d6a77a)" }} />
            <p className="uppercase tracking-[6px] text-xs font-semibold" style={{ color: "#d6a77a" }}>Beyond the Algorithm</p>
            <div className="h-px w-16 md:w-24" style={{ background: "linear-gradient(to left, transparent, #d6a77a)" }} />
          </div>

          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{ color: "#e2d9f3" }}
          >
            Where Creativity
            <br />
            <span className="relative inline-block">
              <span
                className="relative z-10"
                style={{
                  background: "linear-gradient(105deg, #d6a77a 0%, #f4d4ff 45%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Meets Code
              </span>
              <svg
                className="absolute left-0 -bottom-3 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <path
                  d="M4 8 C40 4, 100 10, 150 6 C200 2, 260 9, 296 7"
                  stroke="url(#strokeGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    strokeDasharray: 400,
                    strokeDashoffset: introVisible ? 0 : 400,
                    transition: "stroke-dashoffset 1.2s ease 0.4s",
                  }}
                />
                <defs>
                  <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d6a77a" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-base max-w-md mx-auto leading-relaxed" style={{ color: "#877ba2" }}>
            Beyond algorithms and AI, art helps me think visually, pay attention
            to details, and bring imagination into everything I build.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="mb-12 px-6">
          <GalleryCarousel />
        </div>

        {/* ── Giant Quote ── */}
        <div
          ref={quoteRef}
          className="my-10 relative"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div
            className="absolute -top-8 -left-4 pointer-events-none select-none"
            style={{ fontSize: 100, lineHeight: 1, color: "rgba(139,92,246,0.08)", fontFamily: "Georgia, serif" }}
            aria-hidden
          >&ldquo;</div>


        <div
  className="relative rounded-3xl px-6 md:px-10 py-6 md:py-8 text-center overflow-hidden max-w-4xl mx-auto"
  onMouseEnter={() => setQuoteHover(true)}
  onMouseLeave={() => setQuoteHover(false)}
  style={{
    background:
      "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(214,167,122,0.06) 100%)",
    border: quoteHover
      ? "1px solid rgba(176,110,243,0.45)"
      : "1px solid rgba(139,92,246,0.15)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    transform: quoteHover
      ? "translateY(-5px) scale(1.01)"
      : "translateY(0)",
    boxShadow: quoteHover
      ? "0 25px 70px rgba(139,92,246,0.25)"
      : "0 10px 40px rgba(0,0,0,0.25)",
    transition: "all 0.35s ease",
  }}
>
  <div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "radial-gradient(circle at center, rgba(139,92,246,0.18), transparent 70%)",
    opacity: quoteHover ? 1 : 0.4,
    transition: "opacity 0.35s ease",
  }}
/>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.12), transparent 60%)" }} />
            <p
             className="relative z-10 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto italic"
              style={{ color: "#d4c8f0", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.01em" }}
            >
              Art taught me to{" "}
              <em className="not-italic font-semibold" style={{ color: "#d6a77a" }}>see differently.</em>{" "}
              Code taught me to{" "}
              <em className="not-italic font-semibold" style={{ color: "#b06ef3" }}>build.</em>{" "}
              Together they&apos;re how I turn ideas into{" "}
              <em className="not-italic font-semibold" style={{ background: "linear-gradient(90deg,#d6a77a,#b06ef3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                experiences.
              </em>
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12" style={{ background: "linear-gradient(to left, #d6a77a, transparent)" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#d6a77a" }} />
              <div className="h-px w-12" style={{ background: "linear-gradient(to right, #d6a77a, transparent)" }} />
            </div>
          </div>
        </div>

        {/* ── Interests ── */}
        <div
          ref={interestsRef}
          style={{
            opacity: interestsVisible ? 1 : 0,
            transform: interestsVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          <div className="flex items-center gap-5 mb-8">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, rgba(193, 167, 254, 0.3), transparent)" }} />
            <span className="text-xs font-semibold uppercase tracking-[5px]" style={{ color: "#9e8bca" }}>Other Interests</span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(193, 167, 254, 0.3), transparent)" }} />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {INTERESTS.map(({ icon, label }, i) => (
              <InterestPill key={label} icon={icon} label={label} delay={i * 0.06} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function InterestPill({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className="flex items-center gap-2.5 px-5 py-3 rounded-full text-sm cursor-default select-none"
      style={{
        background: hovered ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(176,110,243,0.5)" : "1px solid rgba(255,255,255,0.08)",
        color: hovered ? "#c084fc" : "#9e93b8",
        boxShadow: hovered ? "0 0 20px rgba(139,92,246,0.2)" : "none",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span style={{ letterSpacing: "0.01em" }}>{label}</span>
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    top: `${(Math.sin(i * 137.5) * 0.5 + 0.5) * 100}%`,
    left: `${(Math.cos(i * 137.5) * 0.5 + 0.5) * 100}%`,
    size: i % 10 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
    delay: `${((i * 0.37) % 4).toFixed(1)}s`,
    dur: `${(2.5 + (i % 5) * 0.8).toFixed(1)}s`,
    opacity: (0.15 + (i % 7) * 0.08).toFixed(2),
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(({ id, top, left, size, delay, dur, opacity }) => (
        <div
          key={id}
          className="absolute rounded-full bg-white"
          style={{ top, left, width: size, height: size, opacity, animation: `twinkle ${dur} ease-in-out ${delay} infinite alternate` }}
        />
      ))}
      <style>{`@keyframes twinkle { from { opacity: inherit; } to { opacity: 0.03; } }`}</style>
    </div>
  );
}