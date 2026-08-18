"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function SocialBar() {
  return (
    <div className="fixed left-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-6 text-gray-400">
      <FaGithub className="cursor-pointer transition hover:text-[#d6a77a]" />
      <FaLinkedin className="cursor-pointer transition hover:text-[#d6a77a]" />
      <FaEnvelope className="cursor-pointer transition hover:text-[#d6a77a]" />
    </div>
  );
}