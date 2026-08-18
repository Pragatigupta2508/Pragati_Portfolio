"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["700"],
});
export default function Hero() {
  return (
    <>


      {/* HERO SECTION */}
<section
  id="home"
  className="relative min-h-screen overflow-hidden px-6 sm:px-10 lg:px-20 pt-24"
>
        {/* LEFT GLOW */}
        <div className="absolute left-[-300px] top-[50px] h-[800px] w-[800px] rounded-full bg-purple-500 opacity-20 blur-[180px]"></div>

        {/* RIGHT GLOW */}
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[#d6a77a] opacity-10 blur-3xl"></div>
<div className="relative z-10 flex flex-col lg:flex-row w-full items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full lg:w-[55%]"
          >
            {/* EXTRA GLOW */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>

            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d6a77a]/30 bg-black/30 px-5 py-2 shadow-[0_0_20px_rgba(214,167,122,0.15)] backdrop-blur-xl">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
              </span>

              <span className="text-sm font-medium tracking-wide text-gray-200">
                Open to Work
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-none text-white">
              Hi, I'm
            </h1>

            <h1
              className={`
    ${cormorant.className}
  text-4xl sm:text-5xl lg:text-7xl
    leading-[1.2]
    pb-4
    overflow-visible
    bg-gradient-to-r
    from-[#d6a77a]
    via-[#f0d3ff]
    to-[#8b5cf6]
    bg-clip-text
    text-transparent
  `}
            >
              Pragati Gupta
            </h1>

            <p className="mt-8 max-w-lg text-lg text-gray-400">
              Building intelligent systems,
              contributing to open source,
              and turning creative ideas into meaningful experiences.
            </p>

            <div className="mt-6 h-12 text-2xl font-semibold text-[#d6a77a] drop-shadow-[0_0_15px_rgba(214,167,122,0.5)]">
              <Typewriter
                words={[
                  "AI/ML Enthusiast",
                  "Solution Architect",
                  "Creative Thinker",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={150}
                deleteSpeed={100}
                delaySpeed={800}
              />
            </div>

            {/* BADGES */}
            <div className="mt-8 flex flex-wrap gap-3">
  {[
    { text: "AWS ML Associate", color: "#d6a77a" },
    { text: "Open Source", color: "#8b5cf6" },
    { text: "CSE AI", color: "#d6a77a" },
  ].map((badge) => (
    <span
      key={badge.text}
      className="group rounded-full border bg-white/5 px-4 py-2 text-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-105 cursor-default"
      style={{
        borderColor:
          badge.color === "#ffffff"
            ? "rgba(255,255,255,0.1)"
            : `${badge.color}4d`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 25px ${badge.color}40`;
        e.currentTarget.style.borderColor = badge.color;
        e.currentTarget.style.background = `linear-gradient(135deg, ${badge.color}15, rgba(255,255,255,0.06))`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor =
          badge.color === "#ffffff"
            ? "rgba(255,255,255,0.1)"
            : `${badge.color}4d`;
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      }}
    >
      {badge.text}
    </span>
  ))}
</div>

            {/* BUTTONS */}
           <div className="mt-10 flex flex-col sm:flex-row gap-4">
  <a
    href="#projects"
    className=" w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[#d6a77a] to-[#8b5cf6] px-10 py-5 font-medium text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
  >
    Explore My Work →
  </a>

  <a
  href="/resume/Pragati_Gupta_Resume.pdf"
  download
  className="
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-white/10
    bg-white/[0.03]
    px-10
    py-5
    font-medium
    text-white
    backdrop-blur-xl
    transition-all
    duration-500
    hover:-translate-y-1
    hover:border-[#d6a77a]/50
    hover:shadow-[0_0_35px_rgba(214,167,122,0.25)]
  "
>
  {/* Glow Layer */}
  <span
    className="
      absolute
      inset-0
      opacity-0
      transition-opacity
      duration-500
      group-hover:opacity-100
      bg-gradient-to-r
      from-[#d6a77a]/10
      via-transparent
      to-[#8b5cf6]/10
    "
  />

  {/* Shine Effect */}
  <span
    className="
      absolute
      inset-y-0
      -left-20
      w-20
      rotate-12
      bg-white/10
      blur-md
      transition-all
      duration-700
      group-hover:left-[120%]
    "
  />

  <span className="w-full sm:w-auto relative z-10 flex items-center gap-2">
     Download Resume
  </span>
</a>
</div>
            {/* SOCIAL LINKS */}
            <div
              className="
    mt-8
    flex
    w-fit
    items-center
    gap-6
    rounded-2xl
    border
    bg-[#08060f]/80
border-[#d6a77a]/10
    px-5
    py-3
    hover:bg-white/[0.03]
    backdrop-blur-xl
  "
            >
              <a
                href="https://github.com/Pragatigupta2508"
                target="_blank"
                className="
      text-[22px]
      text-gray-500
      transition-all
      duration-300
      hover:text-[#d6a77a]
      hover:scale-110
    "
              >
                <FaGithub />
              </a>

              <div className="h-5 w-px bg-white/10" />

              <a
                href="https://www.linkedin.com/in/pragati-gupta-632b45335/"
                target="_blank"
                className="
      text-[22px]
      text-gray-500
      transition-all
      duration-300
      hover:text-[#d6a77a]
      hover:scale-110
    "
              >
                <FaLinkedin />
              </a>

              <div className="h-5 w-px bg-white/10" />

              <a
                href="mailto:pragatigupta02508@gmail.com"
                className="
      text-[22px]
      text-gray-500
      transition-all
      duration-300
      hover:text-[#d6a77a]
      hover:scale-110
    "
              >
                <MdEmail />
              </a>
            </div>
          </motion.div>

          <div className="absolute top-20 left-10 h-1 w-1 rounded-full bg-white shadow-[0_0_10px_white]" />

          <div className="absolute bottom-24 right-16 h-1.5 w-1.5 rounded-full bg-[#d6a77a] shadow-[0_0_15px_#d6a77a]" />

          {/* RIGHT SIDE */}
          <div
            className="
    absolute
    right-[-150px]
    top-1/2
    h-[900px]
    w-[900px]
    -translate-y-1/2
    rounded-full
    bg-purple-500/10
    blur-[220px]
  "
          />
          <div className="relative flex w-full lg:w-[45%] items-center justify-center">

            {/* PLANET SYSTEM */}
            <div className="relative h-[250px] w-[250px]
sm:h-[350px] sm:w-[350px]
lg:h-[650px] lg:w-[650px] -translate-x-8 -translate-y-8 mt-8 lg:mt-0">

              {/* BIG GLOW */}
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-[160px]" />

              <div className="absolute inset-0 rounded-full bg-[#d6a77a]/10 blur-[200px]" />

              {/* BACK RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[820px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-[#d6a77a]/20
        z-0
        blur-[1px]
      "
              />

              {/* SECOND RING */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 90,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
        absolute
        left-1/2
        top-1/2
        h-[450px]
        w-[760px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border
        border-[#8b5cf6]/20
        z-0
        blur-[1px]
      "
              />
              <div
                className="
    absolute
    left-1/2
    top-1/2
    h-[650px]
    w-[650px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    bg-purple-500/15
    blur-[180px]
    z-0
  "
              />

              <div className="absolute inset-0 z-10">
                <Image
                  src="/hero/planet4.png"
                  alt="Planet"
                  fill
                  priority
                  sizes="650px"
                  className="object-contain scale-110"

                />
              </div>
              {/* PLANET */}
              <div className="absolute inset-0 z-10">
                <Image
                  src="/hero/planet4.png"
                  alt="Planet"
                  fill
                  priority
                  sizes="650px"
                  className="object-contain scale-110"
                />
              </div>


              {/* GOLD MOON */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 z-20"
              >
                <div
                  className="
          absolute
          left-1/2
          top-[10px]
          h-3
          w-3
          
          rounded-full
          bg-[#d6a77a]
          shadow-[0_0_25px_#d6a77a]
        "
                />
              </motion.div>

              {/* PURPLE MOON */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 z-20"
              >
                <div
                  className="
          absolute
          right-[40px]
          top-1/2
          h-2
          w-2
          rounded-full
          bg-[#8b5cf6]
          shadow-[0_0_20px_#8b5cf6]
        "
                />
              </motion.div>

              {/* FRONT RING */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
        absolute
        left-1/2
        top-1/2
        h-[500px]
        w-[820px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        border-t
        border-[#d6a77a]/20
        z-30
        blur-[1px]
      "
              />

            </div>

          </div>
        </div>



      </section>
    </>
  );
}