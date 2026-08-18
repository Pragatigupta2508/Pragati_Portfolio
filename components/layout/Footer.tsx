"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
<footer className="relative overflow-hidden border-t border-white/5">
  <div className="absolute inset-0 bg-gradient-to-b from-[#120a24]/80 via-[#0d0818]/95 to-black" />

  <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl" />
  <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-[#d6a77a]/10 blur-3xl" />

  <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-8">

    <div className="grid md:grid-cols-3 gap-6 items-start">

      {/* About */}
      <div>
        <h3
          className="text-4xl mb-2"
          style={{
            fontFamily: "Dancing Script, cursive",
            color: "#d6a77a",
          }}
        >
          Pragati.
        </h3>

        <p className="text-[#c6bddf] text-base leading-relaxed max-w-xs">
          AI/ML enthusiast building intelligent systems while blending
          creativity and technology.
        </p>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-xl font-semibold text-[#d6a77a] mb-2">
          Contact
        </h4>

        <a
          href="mailto:pragatigupta02508@gmail.com"
          className="text-[#e2d9f3] text-sm hover:text-white transition"
        >
          pragatigupta02508@gmail.com
        </a>
      </div>

      {/* Socials */}
      <div>
        <h4 className="text-xl font-semibold text-[#d6a77a] mb-2">
          Connect
        </h4>

        <div className="flex gap-4">
          <a
            href="https://github.com/Pragatigupta2508"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a78bfa] hover:text-white hover:scale-110 transition-all"
          >
            <FaGithub size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/pragati-gupta-632b45335/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d6a77a] hover:text-white hover:scale-110 transition-all"
          >
            <FaLinkedinIn size={22} />
          </a>

          <a
            href="mailto:pragatigupta02508@gmail.com"
            className="text-[#c084fc] hover:text-white hover:scale-110 transition-all"
          >
            <MdEmail size={24} />
          </a>
        </div>
      </div>
    </div>

    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

    <p className="text-center text-[#8f85aa] text-xs">
      © {new Date().getFullYear()} Pragati Gupta
    </p>
  </div>
</footer>
  );
}