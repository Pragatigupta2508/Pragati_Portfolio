"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Creative", id: "creative" },
    { name: "Achievements", id: "achievements" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections =
        document.querySelectorAll<HTMLElement>("section[id]");

      let current = "home";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 120);

        if (distance < closestDistance) {
          closestDistance = distance;
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);
  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* LOGO */}
       <Link href="#home">
<h1 className="translate-x-0 xl:-translate-x-16 text-2xl font-bold tracking-wide">
    <span
      style={{ fontFamily: "Dancing Script" }}
      className="text-4xl text-[#d6a77a]"
    >
      Pragati.
    </span>
  </h1>
</Link>
        {/* NAVIGATION */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`group relative pb-2 text-base font-medium tracking-wide transition-all duration-300 hover:text-[#d6a77a] ${activeSection === link.id
                  ? "text-[#d6a77a] scale-110"
                  : "text-gray-300 scale-100"
                }`}
            >
              {link.name}

              {/* ACTIVE UNDERLINE */}
              {activeSection === link.id && (
                <motion.span
                  layoutId="activeNav"
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[2px]
                    w-full
                    bg-gradient-to-r
                    from-[#d6a77a]
                    to-[#8b5cf6]
                  "
                />
              )}

              {/* HOVER UNDERLINE */}
              {activeSection !== link.id && (
                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-[#d6a77a]
                    to-[#8b5cf6]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}