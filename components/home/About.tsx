"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FOCUS_ITEMS = [
  { label: "Artificial Intelligence", icon: "🧠" },
  { label: "Machine Learning", icon: "⚙️" },
  { label: "Open Source", icon: "🐙" },
  { label: "Competitive Programming", icon: "💻" },
  { label: "Creative Development", icon: "🎨" },
  { label: "Cloud & AWS", icon: "☁️" },
];

const TIMELINE = [
  { year: "2024", title: "Started CSE (AI) at KIET", sub: "Began specializing in Artificial Intelligence with a 9.1 CGPA" },
  { year: "2025", title: "Jhansi Shield Emergency App", sub: "Tech for Public Safety" },
  { year: "2026", title: "Open Source Contributions", sub: "5+ PRs merged into real-world projects, growing as a collaborator" },
  { year: "2026", title: "AWS ML Associate", sub: "Earned cloud + ML certification, diving deep into AI infrastructure" },
];

const SKILLS = [
  { name: "Python", pct: 90 },
  { name: "Machine Learning", pct: 85 },
  { name: "Deep Learning", pct: 80 },
  { name: "AWS Cloud", pct: 78 },
  { name: "Competitive Programming", pct: 82 },
  { name: "React / Next.js", pct: 72 },
];

const STATS = [
  {
    value: "9.1",
    label: "CGPA",
    desc: "Consistent Academic Performance",
  },
  {
    value: "300+",
    label: "Problems Solved",
    desc: "LeetCode & Competitive Programming",
  },
  {
    value: "5+",
    label: "Merged PRs",
    desc: "Open Source Contributions",
  },
  {
    value: "AWS",
    label: "ML Associate",
    desc: "Cloud & Machine Learning Certified",
  },
];

const TABS = ["Current Focus", "Journey", "Skills"];

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const skillsRef = useRef(null);

  // Animate skill bars when Skills tab opens
  useEffect(() => {
    if (activeTab === 2) {
      const timer = setTimeout(() => setSkillsAnimated(true), 80);
      return () => clearTimeout(timer);
    } else {
      setSkillsAnimated(false);
    }
  }, [activeTab]);

  return (
    <section
      id="about"
className="relative min-h-screen py-16 px-5 sm:px-8 md:px-20 text-white overflow-hidden"
    >
      {/* Purple Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />




      {/* Stars */}
      <Stars />

      {/* Nebula glows */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 500, height: 500, top: -120, right: -120, background: "radial-gradient(circle,rgba(139,92,246,0.22),transparent 70%)", filter: "blur(70px)" }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{ width: 400, height: 400, bottom: -60, left: -100, background: "radial-gradient(circle,rgba(214,167,122,0.14),transparent 70%)", filter: "blur(70px)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-[8px] text-[#d6a77a] text-lg mb-4">About</p>
<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#e2d9f3]">
            Who I Am
         <span className="block text-2xl sm:text-3xl md:text-5xl bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#d6a77a,#f4d4ff,#8b5cf6)" }}
            >
              Engineer • Creator • Dreamer
            </span>
          </h2>
        </div>

        {/* Main grid */}
<div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-center mb-20">

          {/* Orbit */}

          <div className="flex items-center justify-center">
           <div
  className="relative flex items-center justify-center w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px]"
>
              {/* Rings */}
             {[240, 180, 120].map((size, i) => (
  <motion.div
    key={i}
    animate={{
      rotate: i % 2 === 0 ? 360 : -360,
    }}
    transition={{
      duration: 60 + i * 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute rounded-full sm:scale-100 scale-75"
    style={{
      width: size,
      height: size,
      border: "1px solid rgba(255,255,255,0.11)",
    }}
  />
))}
              {/* Floating badges */}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute rounded-full"
                style={{
                  width: 340,
                  height: 340,
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="absolute left-1/2 top-0 h-4 w-4 rounded-full bg-[#d6a77a]"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 20px #d6a77a",
                  }}
                />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute rounded-full"
                style={{
                  width: 250,
                  height: 250,
                  border: "1px solid rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="absolute left-1/2 top-0 h-3 w-3 rounded-full bg-[#8b5cf6]"
                  style={{
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 15px #8b5cf6",
                  }}
                />
              </motion.div>
              {/* Avatar */}
              <div
                className="
    relative
    z-10
    flex
    items-center
    justify-center
    rounded-full
    font-bold
    text-white
    select-none
    cursor-default
    overflow-hidden
  "
                style={{
                  width: 140,
                  height: 140,
                  fontSize: 42,
                  background:
                    "linear-gradient(135deg,#d6a77a 0%, #e7c6ff 50%, #c084fc 100%)",
                  boxShadow:
                    "0 0 0 12px rgba(71,16,127,0.12), 0 0 0 24px rgba(192,132,252,0.06), 0 0 80px rgba(192,132,252,0.25)",
                  animation: "avatarPulse 4s ease-in-out infinite",
                }}
              >
                {/* Shine Effect */}
                <div
                  className="
      absolute
      inset-0
      bg-gradient-to-br
      from-white/30
      via-transparent
      to-transparent
    "
                />

                {/* Small Glow Spot */}
                <div
                  className="
      absolute
      top-5
      left-6
      h-4
      w-4
      rounded-full
      bg-white/40
      blur-sm
    "
                />

                <span className="relative z-10 tracking-wider">
                  PG
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>


            <div className="space-y-4">

              <div className="glass-card p-5 sm:p-6">
                <p className="text-md uppercase tracking-[4px] text-[#d6a77a] mb-3">
                  Education🎓
                </p>

                <p className="text-base sm:text-lg leading-7 sm:leading-8">
                  I'm a Computer Science Engineering student specializing
                  in Artificial Intelligence, passionate about building
                  technology that creates real-world impact.

                </p>
              </div>

              <div className="glass-card p-5 sm:p-6">
  <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#d6cfea]">
    Completed my AI Internship at Codec Technologies, where I worked on
    practical AI projects and explored how intelligent systems can solve
    real-world problems.
  </p>
</div>

              <div
                className="glass-card p-5 sm:p-6"

              >
            <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#d6cfea]">
                  Beyond technology, I enjoy painting, creativity,
                  and transforming ideas into meaningful experiences.
                </p>
              </div>

            </div>

            <div className="mt-8 pl-5" style={{ borderLeft: "3px solid #d6a77a" }}>
              <p className="italic text-[#d6a77a] text-[20px] leading-relaxed">
                &ldquo;Technology is most powerful when it solves real problems.&rdquo;
              </p>
            </div>
          </div>
        </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ value, label, desc }) => (
            <div
              key={label}
              className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        px-6
        py-8
        text-center
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#8b5cf6]/40
      "
            >
              {/* Main Content */}
              <div
                className="
          transition-all
          duration-500
          group-hover:-translate-y-4
        "
              >
                <p className="text-3xl font-bold text-[#d6a77a]">
                  {value}
                </p>

                <p className="mt-2 text-[#8f86aa] text-sm">
                  {label}
                </p>
              </div>

              {/* Hover Text */}
              <div
                className="
          absolute
          left-0
          right-0
          bottom-4
          px-4
          opacity-0
          translate-y-6
          transition-all
          duration-500
          group-hover:opacity-100
          group-hover:translate-y-0
        "
              >
                <p className="text-xs text-[#cfc6e8]">
                  {desc}
                </p>
              </div>

              {/* Glow */}
              <div
                className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-gradient-to-br
          from-[#8b5cf6]/5
          to-[#d6a77a]/5
        "
              />
            </div>
          ))}
        </div>

        {/* Tabs */}
        {/* Tabs */}
        <div className="-mt-2 mb-16">
          {/* Tab buttons */}
         <div className="flex flex-wrap gap-2 mb-8"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {TABS.map((tab, i) => (

              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`
    group
    relative
   px-4 sm:px-6 py-3
    font-medium
    transition-all
    duration-300

    ${activeTab === i
                    ? "text-white"
                    : "text-white hover:text-[#d6a77a]"
                  }
  `}
              >
                {tab}

                <div
                  className={`
      absolute
      bottom-0
      left-0
      h-[2px]
      transition-all
      duration-300

      ${activeTab === i
                      ? "w-full bg-[#a855f7] shadow-[0_0_15px_#a855f7]"
                      : "w-0 group-hover:w-full bg-[#d6a77a]"
                    }
    `}
                />
              </button>
            ))}
          </div>

          {/* Focus */}
          {activeTab === 0 && (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">🧠 Artificial Intelligence</h3>
                <p className="text-gray-400 text-sm">
                  Building intelligent systems, AI agents and real-world applications.
                </p>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#d6a77a]/40 hover:shadow-[0_0_40px_rgba(214,167,122,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">⚡ Machine Learning</h3>
                <p className="text-gray-400 text-sm">
                  Exploring model training, deep learning and data-driven solutions.
                </p>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">🚀 Open Source</h3>
                <p className="text-gray-400 text-sm">
                  Contributing to projects and collaborating with developers worldwide.
                </p>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#d6a77a]/40 hover:shadow-[0_0_40px_rgba(214,167,122,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">☁ Cloud & AWS</h3>
                <p className="text-gray-400 text-sm">
                  Learning scalable infrastructure and cloud-native AI deployment.
                </p>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-purple-400/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">💻 Competitive Programming</h3>
                <p className="text-gray-400 text-sm">
                  Strengthening problem solving through DSA and contests.
                </p>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-[#d6a77a]/40 hover:shadow-[0_0_40px_rgba(214,167,122,0.15)] transition-all duration-500">
                <h3 className="text-xl font-semibold mb-3">🎨 Creative Development</h3>
                <p className="text-gray-400 text-sm">
                  Combining design, art and technology into meaningful experiences.
                </p>
              </div>

            </div>
          )}
          {/* Journey */}
          {activeTab === 1 && (
            <div className="relative mt-16">

              {/* Horizontal Line */}
              <div
               className="
hidden md:block
absolute
top-5
left-10
right-10

  h-[2px]
  bg-gradient-to-r
  from-[#a855f7]
  via-[#c084fc]
  to-[#a855f7]
  shadow-[0_0_15px_rgba(168,85,247,.4)]
  "
              />

<div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">

                {[
                  {
                    year: "2024",
                    title: "Started CSE (AI)",
                    desc: "Began specializing in Artificial Intelligence.",
                  },
                  {
                    year: "2025",
                    title: "Built Jhansi Shield",
                    desc: "Emergency response platform for public safety.",
                  },
                  {
                    year: "2026",
                    title: "Open Source",
                    desc: "Merged PRs and collaborated with developers.",
                  },
                 {
  year: "2026",
  title: "AI Internship @ Codec",
  desc: "Completed an AI internship focused on practical projects and real-world applications.",
},
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative text-center"
                  >
                    {/* Moon */}
                    <div className="relative mx-auto h-8 w-8">

                      <div
                        className="
    absolute
    inset-0
    rounded-full
    bg-[#a855f7]/30
    blur-md
    scale-125

    transition-all
    duration-300

    group-hover:scale-150
    group-hover:bg-[#a855f7]/50
    "
                      />

                      <div
                        className="
    relative
    h-8
    w-8
    rounded-full
    bg-[#a855f7]

    shadow-[0_0_15px_#a855f7]

    transition-all
    duration-300

    group-hover:shadow-[0_0_40px_#a855f7]
    group-hover:scale-125
    "
                      />

                    </div>

                    <p
                      className="
      mt-6
      text-[#d6a77a]
      text-sm
      tracking-widest
      transition-all
      duration-300
      group-hover:text-white
      "
                    >
                      {item.year}
                    </p>

                    <h3
                      className="
      mt-3
      text-xl
      font-semibold
      transition-all
      duration-300
      group-hover:text-[#d6a77a]
      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
      mt-2
      text-gray-400
      text-sm
      transition-all
      duration-300
      group-hover:text-gray-300
      "
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {activeTab === 2 && (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              <div
                className="
  absolute
  top-0
  left-0
  h-[2px]
  w-full
  bg-gradient-to-r
  from-transparent
  via-[#d6a77a]
  to-transparent
  opacity-50
  "
              />
              {[
                {
                  title: "Python",
                  icon: "🐍",
                  desc: "Backend development, automation and AI workflows.",
                  tag: "ADVANCED",
                  glow: "hover:border-green-400/40 hover:shadow-[0_0_35px_rgba(34,197,94,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,.9)]",
                  stat: "3+ Years"
                },
                {
                  title: "Machine Learning",
                  icon: "🧠",
                  desc: "Model training, experimentation and deployment.",
                  tag: "SPECIALIZED",
                  glow: "hover:border-pink-400/40 hover:shadow-[0_0_35px_rgba(236,72,153,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,.9)]",
                  stat: "AI Focus"
                },
                {
                  title: "AWS Cloud",
                  icon: "☁️",
                  desc: "Cloud fundamentals and scalable infrastructure.",
                  tag: "CERTIFIED",
                  glow: "hover:border-blue-400/40 hover:shadow-[0_0_35px_rgba(59,130,246,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,.9)]",
                  stat: "AWS ML"
                },
                {
                  title: "Competitive Programming",
                  icon: "💻",
                  desc: "Strong problem solving and algorithmic thinking.",
                  tag: "DSA",
                  glow: "hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(168,85,247,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,.9)]",
                  stat: "300+ Solved"
                },
                {
                  title: "React / Next.js",
                  icon: "⚛️",
                  desc: "Modern web applications and UI development.",
                  tag: "FRONTEND",
                  glow: "hover:border-purple-400/40 hover:shadow-[0_0_35px_rgba(34,211,238,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,.9)]",
                  stat: "Portfolio"
                },
                {
                  title: "Creative Development",
                  icon: "🎨",
                  desc: "Blending creativity with technology.",
                  tag: "PASSION",
                  glow: "hover:border-[#d6a77a]/40 hover:shadow-[0_0_35px_rgba(214,167,122,.2)]",
                  iconGlow: "group-hover:drop-shadow-[0_0_12px_rgba(214,167,122,.9)]",
                  stat: "Artist"
                }
              ].map((skill) => (
                <div
                  key={skill.title}
                  className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-7
      transition-all
      duration-500
      hover:-translate-y-2
      ${skill.glow}
    `}
                >
                  {/* Tag */}
                  <span
                    className="
      absolute
      top-5
      right-5
      text-[10px]
      tracking-[0.25em]
      text-[#d6a77a]
      "
                  >
                    {skill.tag}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`
        text-4xl
        transition-all
        duration-300
        group-hover:rotate-6
        group-hover:scale-125
        ${skill.iconGlow}
        `}
                    >
                      {skill.icon}
                    </span>

                    <h3 className="text-2xl font-semibold text-white">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-gray-400 leading-relaxed">
                    {skill.desc}
                  </p>

                  {/* Bottom Stat */}
                  <div
                    className="
      mt-6
      inline-flex
      rounded-full
      border
      border-white/10
      px-3
      py-1
      text-xs
      text-[#d6a77a]
      backdrop-blur-md

      "
                  >
                    {skill.stat}
                  </div>

                  {/* Hover Shine */}
                  <div
                    className="
      absolute
      inset-0
      opacity-0
      absolute inset-0 bg-gradient-to-br
from-purple-500/5
to-[#d6a77a]/5
opacity-0
group-hover:opacity-100
      transition
      duration-500
      bg-gradient-to-r
      from-transparent
      via-white/[0.03]
      to-transparent
      "
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes floatBadge {
          from { transform: translateY(0px) translateX(var(--tx, 0)) translateY(var(--ty, 0)); }
          to   { transform: translateY(-8px) translateX(var(--tx, 0)) translateY(var(--ty, 0)); }
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 10px rgba(192,132,252,0.12), 0 0 0 20px rgba(192,132,252,0.05); }
          50%       { box-shadow: 0 0 0 14px rgba(192,132,252,0.18), 0 0 0 26px rgba(192,132,252,0.08), 0 0 60px rgba(192,132,252,0.25); }
        }
      `}</style>
    </section>
  );
}

/* Starfield component */
function Stars() {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.12 ? 3 : Math.random() < 0.3 ? 2 : 1,
      delay: `${(Math.random() * 4).toFixed(1)}s`,
      dur: `${(2 + Math.random() * 4).toFixed(1)}s`,
      opacity: (0.2 + Math.random() * 0.5).toFixed(2),
    }));

    setStars(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(({ id, top, left, size, delay, dur, opacity }) => (
        <div
          key={id}
          className="absolute rounded-full bg-white"
          style={{
            top,
            left,
            width: size,
            height: size,
            opacity,
            animation: `twinkle ${dur} ease-in-out ${delay} infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          from { opacity: inherit; }
          to { opacity: 0.03; }
        }
      `}</style>
    </div>
  );
}