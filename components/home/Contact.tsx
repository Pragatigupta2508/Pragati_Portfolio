"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const LINKS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/Pragatigupta2508",
    href: "https://github.com/Pragatigupta2508",
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "pragati-gupta-632b45335",
    href: "https://www.linkedin.com/in/pragati-gupta-632b45335/",
    accent: "#d6a77a",
    bg: "rgba(214,167,122,0.08)",
    border: "rgba(214,167,122,0.2)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "pragatigupta02508@gmail.com",
    href: "mailto:pragatigupta02508@gmail.com",
    accent: "#c084fc",
    bg: "rgba(192,132,252,0.08)",
    border: "rgba(192,132,252,0.2)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Noida, India",
    href: "#",
    accent: "#67e8f9",
    bg: "rgba(103,232,249,0.08)",
    border: "rgba(103,232,249,0.2)",
  },
];

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

function useMouseGlow(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);
}

/* ── Field icons ── */
const NameIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
const EmailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const SubjectIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.58a2 2 0 0 0 2.82 0l5-5a2 2 0 0 0 0-2.83Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const MessageIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  useMouseGlow(formRef);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields.");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/xojovdnd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
        <section id="contact" className="relative py-16 md:min-h-screen pt-16 pb-4 px-8 md:px-20 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
      <style>{`
        @keyframes twinkle { 0%,100% { opacity: var(--op); transform: scale(1); } 50% { opacity: 0.05; transform: scale(0.6); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-ring { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(167,139,250,0.4); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(167,139,250,0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(167,139,250,0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes beam { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(80px) rotate(0deg); } to { transform: rotate(360deg) translateX(80px) rotate(-360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .glow-card {
  position: relative;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.08),
      rgba(255,255,255,0.03)
    );

  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);

  border: 1px solid rgba(255,255,255,0.12);

  border-radius: 28px;

  overflow: hidden;
box-shadow:
  0 12px 40px rgba(0,0,0,0.4),
  0 0 60px rgba(139,92,246,0.18),
  0 0 100px rgba(139,92,246,0.08),
  inset 0 1px 1px rgba(255,255,255,0.15);
}
    .glow-card:hover {
  box-shadow:
    0 12px 40px rgba(0,0,0,0.4),
    0 0 60px rgba(139,92,246,0.15),
    inset 0 1px 1px rgba(255,255,255,0.15);
}
 .glow-card::before {
  content: "";
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,0.12),
      transparent 30%,
      transparent 70%,
      rgba(255,255,255,0.04)
    );

  pointer-events: none;
}

.glow-card::after {
  content: "";

  position: absolute;
  top: 0;
  left: 5%;

  width: 90%;
  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.6),
      transparent
    );

  box-shadow:
    0 0 10px rgba(255,255,255,0.3);
}

  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);

  mask-composite: exclude;
  -webkit-mask-composite: xor;

  pointer-events:none;
}
        .field-group { position: relative; }
        .field-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9c0e5;
  font-weight: 500;

          margin-bottom: 6px;
          transition: color 0.2s;
        }
.field-group.focused .field-label {
  color: #d6a77a;
  text-shadow: 0 0 10px rgba(214,167,122,0.4);
}
        .field-input-wrap { position: relative; }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b6485;
          pointer-events: none;
          transition: color 0.2s;
          display: flex;
        }
        .field-icon.textarea-icon { top: 16px; transform: none; }
        .field-group.focused .field-icon { color: #a78bfa; }
        .field-input {
          width: 100%;
background: rgba(255,255,255,0.08);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,0.08);

  color: #f5f0ff;
          border-radius: 12px;
          padding: 12px 16px 12px 42px;
          font-size: 14px;
          color: #fcfcfc;
  font-weight: 500;

          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
          font-family: inherit;
        }
       .field-input::placeholder {
  color: rgba(255,255,255,0.55);
  opacity: 1;
}
        .field-input:focus {
  background: rgba(255,255,255,0.06);

  border-color: rgba(167,139,250,0.4);

  box-shadow:
    0 0 20px rgba(167,139,250,0.15);
}
      .link-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  border-radius: 18px;
  padding: 16px 18px;
 background: rgba(8,10,20,0.88);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;

  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.link-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.08),
      transparent
    );
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}
  .contact-icon {
  transition: all 0.35s ease;
}

.link-card:hover .contact-icon {
  transform: scale(1.12);

 box-shadow:
  0 0 30px rgba(167,139,250,0.15),
  0 0 70px rgba(167,139,250,0.08);
}

.link-card:hover::before {
  transform: translateX(100%);
}

.link-card:hover {
  transform: translateY(-6px) scale(1.02);

  border-color: rgba(167,139,250,0.35);

  box-shadow:
    0 0 20px rgba(167,139,250,0.15),
    0 0 40px rgba(167,139,250,0.08),
    0 0 60px rgba(214,167,122,0.05);
}
        .send-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          letter-spacing: 0.04em;
          color: white;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #7c3aed, #a78bfa, #d6a77a, #8b5cf6);
          background-size: 300% 300%;
          animation: shimmer 4s linear infinite;
          transition: opacity 0.2s, transform 0.2s;
        }
   .send-btn:hover:not(:disabled)
{
  opacity: 1;
  transform: translateY(-3px) scale(1.02);

  box-shadow:
    0 0 25px rgba(168,85,247,0.4),
    0 0 60px rgba(168,85,247,0.2);
}
        .send-btn:active:not(:disabled) { transform: translateY(0); }
        .send-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .send-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          pointer-events: none;
        }
      `}</style>

      {/* Stars */}
      <StarField />

      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ width: 600, height: 600, top: -200, right: -150, background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 65%)", filter: "blur(80px)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ width: 500, height: 500, bottom: -100, left: -120, background: "radial-gradient(circle, rgba(214,167,122,0.12) 0%, transparent 65%)", filter: "blur(80px)", borderRadius: "50%" }} />
      <div className="absolute pointer-events-none" style={{ width: 300, height: 300, top: "40%", left: "40%", background: "radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 65%)", filter: "blur(60px)", borderRadius: "50%" }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10" style={{ animation: "fadeUp 0.7s ease both" }}>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[12px] tracking-[0.15em] uppercase"
            style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", color: "#cab8ff" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a185f7", display: "inline-block", animation: "pulse-ring 2s infinite" }} />
             AVAILABLE FOR INTERNSHIPS
          </div>

   <h2
  className="relative text-5xl md:text-6xl font-bold leading-[1.1] mb-5"
  style={{
    textShadow:
      "0 0 20px rgba(168,85,247,0.2), 0 0 60px rgba(168,85,247,0.15)",
  }}
>
            <span style={{ color: "#e2d9f3" }}>Let&apos;s Build</span>
            <br />
            <span style={{
              background: "linear-gradient(135deg, #d6a77a 0%, #f0c4ff 40%, #a78bfa 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Something Real
            </span>
          </h2>

      <div
  style={{
    maxWidth: "700px",
    margin: "0 auto 40px",
    padding: "14px 20px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(18px)",
    borderRadius: "18px",
  }}
>
  <p
    style={{
      color: "#d6c4ff",
      fontSize: "18px",
      lineHeight: 1.8,
      fontStyle: "italic",
    }}
  >
    “Great ideas start with a conversation.
    <br />
    Let's build something amazing together.”
  </p>
</div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Form card ── */}
          <div
            ref={formRef}
            className="glow-card rounded-2xl p-8"
            style={{ border: "1px solid rgba(255,255,255,0.07)", animation: "fadeUp 0.7s 0.1s ease both", opacity: 0, animationFillMode: "forwards" }}
          >
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
                <div style={{ fontSize: 52, animation: "float 3s ease-in-out infinite" }}>✦</div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#e2d9f3", marginBottom: 8 }}>Signal received.</h3>
                  <p style={{ fontSize: 14, color: "#7a7096", lineHeight: 1.6 }}>Thanks for reaching out — I&apos;ll be in touch soon.</p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: 8,
                    padding: "10px 24px",
                    borderRadius: 12,
                    border: "1px solid rgba(167,139,250,0.25)",
                    background: "rgba(167,139,250,0.1)",
                    color: "#c4b5fd",
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                
                  <div className="mb-8">
  <h3
    style={{
      fontSize: "2rem",
      fontWeight: 700,
      color: "#f8f5ff",
      marginBottom: "12px",
    }}
  >
    ✨ Send a{" "}
    <span
      style={{
        background:
          "linear-gradient(135deg,#d6a77a,#c084fc,#8b5cf6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Message
    </span>
  </h3>

  <p
    style={{
      color: "#9b8fa8",
      fontSize: "15px",
      lineHeight: 1.7,
    }}
  >
    I'd love to hear from you. Drop your message and I'll get back soon.
  </p>
</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <FieldGroup label="Your Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" icon={NameIcon} focused={focused} setFocused={setFocused} />
                  <FieldGroup label="Your Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" icon={EmailIcon} focused={focused} setFocused={setFocused} />
                </div>
                <FieldGroup label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" icon={SubjectIcon} focused={focused} setFocused={setFocused} />
                <FieldGroup label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project, idea, or just say hello..." icon={MessageIcon} textarea rows={5} focused={focused} setFocused={setFocused} />

                {status === "error" && (
                  <p style={{ fontSize: 13, color: "#f87171", padding: "10px 14px", borderRadius: 10, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}>
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button className="send-btn" onClick={handleSubmit} disabled={status === "sending"}>
                  {status === "sending" ? "Transmitting…" : "Send Message →"}
                </button>

                <p style={{ textAlign: "center", fontSize: 13, color: "#b6a2e8", marginTop: -4 }}>
                  No spam, no noise — just a conversation.
                </p>
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeUp 0.7s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>

            {/* Availability badge */}
            <div style={{ borderRadius: 18, padding: "16px 20px", background: "rgba(8,10,20,0.9)", border: "1px solid rgba(167,139,250,0.18)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <span style={{ display: "block", width: 10, height: 10, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "rgba(74,222,128,0.3)", animation: "pulse-ring 2s infinite" }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#e2d9f3", marginBottom: 2 }}>Open to Opportunities</p>
                <p style={{ fontSize: 12, color: "#b2a4d2" }}>Internships · Collabs · Open Source</p>
              </div>
            </div>

            {/* Link cards */}
            {LINKS.map(({ icon, label, value, href, accent, bg, border }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                className="link-card"
                style={{ textDecoration: "none" }}
              >
                <div
    style={{
      width: 40,
      height: 40,
      borderRadius: 12,
      background: bg,
      border: `1px solid ${border}`,
      color: accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      
    }}
  >
    {icon}
  </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",color: "#b3a5d4", marginBottom: 3 }}>{label}</p>
                  <p style={{ fontSize: 13, color: "#f3efff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
                </div>
                <svg style={{ marginLeft: "auto", flexShrink: 0, color: "#3d3856" }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </Link>
            ))}

            {/* Decorative quote */}
            <div style={{ marginTop: 8, padding: "16px 20px", borderLeft: "2px solid rgba(214,167,122,0.4)", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: -1, width: 2, height: "100%", background: "linear-gradient(180deg, #d6a77a, rgba(214,167,122,0))", borderRadius: 2 }} />
              <p style={{ fontSize: 15, color: "#bbabcb", lineHeight: 1.7, fontStyle: "italic" }}>
                &ldquo;Always open to exciting ideas, meaningful collaborations, and the occasional late-night debug session.&rdquo;
              </p>
            </div>

            {/* Mini signal graphic */}
            <SignalGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldGroup({
  label, name, value, onChange, placeholder, type, textarea, rows, icon, focused, setFocused
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string; type?: string; textarea?: boolean; rows?: number;
  icon?: React.ReactNode;
  focused: string | null; setFocused: (v: string | null) => void;
}) {
  const isFocused = focused === name;
  return (
    <div className={`field-group${isFocused ? " focused" : ""}`}>
      <label className="field-label">{label}</label>
      <div className="field-input-wrap">
        {icon && (
          <span className={`field-icon${textarea ? " textarea-icon" : ""}`}>{icon}</span>
        )}
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className="field-input"
            style={{ resize: "none" }}
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
          />
        ) : (
          <input
            name={name}
            type={type || "text"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="field-input"
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
          />
        )}
      </div>
    </div>
  );
}

function SignalGraphic() {
  return (
    <div style={{ borderRadius: 16, padding: "20px 24px",background: "rgba(8,10,20,0.88)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 10 }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#a59dc8" }}>Response time</p>
      {[
        { label: "Weekdays", val: "< 12 hrs", w: "85%" },
        { label: "Weekends", val: "< 24 hrs", w: "55%" },
      ].map(({ label, val, w }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: "#938bab" }}>{label}</span>
            <span style={{ fontSize: 12, color: "#a78bfa" }}>{val}</span>
          </div>
          <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: w, borderRadius: 4, background: "linear-gradient(90deg, #7c3aed, #d6a77a)", animation: "shimmer 3s linear infinite", backgroundSize: "200% 100%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StarField() {
  const stars = Array.from({ length: 100 }, (_, i) => {
    const seed = i * 137.508;
    const x = (seed % 100).toFixed(2);
    const y = ((seed * 0.618) % 100).toFixed(2);
    const size = i % 13 === 0 ? 2.5 : i % 4 === 0 ? 1.5 : 1;
    const dur = (2.5 + (i % 7) * 0.5).toFixed(1);
    const delay = ((i % 11) * 0.4).toFixed(1);
    const op = (0.15 + (i % 5) * 0.1).toFixed(2);
    return { id: i, x, y, size, dur, delay, op };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(({ id, x, y, size, dur, delay, op }) => (
        <div
          key={id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            ["--op" as string]: op,
            opacity: Number(op),
            animation: `twinkle ${dur}s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
      {/* A few colored accent stars */}
      {[
        { x: "15%", y: "20%", c: "#a78bfa" },
        { x: "82%", y: "35%", c: "#d6a77a" },
        { x: "60%", y: "78%", c: "#c084fc" },
        { x: "30%", y: "65%", c: "#67e8f9" },
      ].map(({ x, y, c }, i) => (
        <div key={`acc-${i}`} className="absolute rounded-full" style={{ left: x, top: y, width: 3, height: 3, background: c, boxShadow: `0 0 6px ${c}`, opacity: 0.6, animation: `twinkle ${3 + i}s ease-in-out ${i * 0.7}s infinite` }} />
      ))}
    </div>
  );
}