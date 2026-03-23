"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

/* ─── Palette ───────────────────────────────────────────── */
const T = {
  bg:        "#0F1013",
  bg2:       "#0c0e12",
  text:      "#EFF1F3",
  textMuted: "rgba(239,241,243,0.50)",
  textDim:   "rgba(239,241,243,0.22)",
  steel:     "#9FB0C8",
  cta1:      "#D9DDE2",
  cta2:      "#A6B1C6",
  glow:      "#DDE9FF",
  border:    "rgba(255,255,255,0.06)",
  borderHov: "rgba(221,233,255,0.16)",
  card:      "rgba(255,255,255,0.025)",
  cardHov:   "rgba(255,255,255,0.05)",
};

/* ═══════════════════════════════════════════════════════════
   TEAM DATA  — replace photo with real "/team/name.jpg"
═══════════════════════════════════════════════════════════ */
const TEAM = [
  {
    name:      "Aryan Sharma",
    username:  "@aryan.sharma",
    role:      "Founder & CEO",
    photo:     null,
    initials:  "AS",
    bio:       "Visionary behind vortechzy. 8+ years delivering digital products for global clients. Obsessed with AI-first design.",
    stats:     { projects: 60, clients: 48, years: 8 },
    socials:   { linkedin: "#", github: "#", twitter: "#" },
    portfolio: "#",
  },
  {
    name:      "Priya Mehta",
    username:  "@priya.design",
    role:      "Lead Designer",
    photo:     null,
    initials:  "PM",
    bio:       "Crafts interfaces that convert. Specialist in UI/UX for SaaS and e-commerce. Figma wizard.",
    stats:     { projects: 45, clients: 32, years: 5 },
    socials:   { linkedin: "#", behance: "#" },
    portfolio: "#",
  },
  {
    name:      "Rahul Verma",
    username:  "@rahul.dev",
    role:      "Full-Stack Developer",
    photo:     null,
    initials:  "RV",
    bio:       "Next.js & Node.js expert. Builds fast, scalable architectures. Loves clean code and zero tech debt.",
    stats:     { projects: 55, clients: 38, years: 6 },
    socials:   { linkedin: "#", github: "#" },
    portfolio: "#",
  },
  {
    name:      "Sneha Patel",
    username:  "@sneha.ai",
    role:      "AI & Backend Engineer",
    photo:     null,
    initials:  "SP",
    bio:       "Integrates intelligent systems into real products. Python, Supabase, OpenAI APIs — from prototype to production.",
    stats:     { projects: 30, clients: 22, years: 4 },
    socials:   { linkedin: "#", github: "#" },
    portfolio: "#",
  },
  {
    name:      "Dev Joshi",
    username:  "@dev.mobile",
    role:      "Mobile Developer",
    photo:     null,
    initials:  "DJ",
    bio:       "Builds seamless iOS & Android apps. React Native and Flutter specialist with a pixel-perfect eye.",
    stats:     { projects: 28, clients: 20, years: 4 },
    socials:   { linkedin: "#", github: "#" },
    portfolio: "#",
  },
  {
    name:      "Kavya Nair",
    username:  "@kavya.growth",
    role:      "SEO & Growth",
    photo:     null,
    initials:  "KN",
    bio:       "Drives organic traffic and top rankings. Data-first approach to digital marketing and conversion strategy.",
    stats:     { projects: 35, clients: 28, years: 5 },
    socials:   { linkedin: "#", twitter: "#" },
    portfolio: "#",
  },
];

/* ─── Stats ── */
const STATS = [
  { value: "8+",   label: "Years experience"   },
  { value: "150+", label: "Projects delivered"  },
  { value: "6",    label: "Core team members"   },
  { value: "100%", label: "Client satisfaction" },
];

/* ─── Values ── */
const VALUES = [
  { num: "01", title: "Craft over speed",     desc: "We take time to build things right. Every pixel, every line of code is considered." },
  { num: "02", title: "Client partnership",   desc: "We think deeply about your business goals and build toward them — not just the brief." },
  { num: "03", title: "AI-first thinking",    desc: "Every solution we design considers how AI can make it smarter and more valuable over time." },
  { num: "04", title: "Radical transparency", desc: "You know exactly where your project stands, always. No surprises, no hidden complexity." },
];

/* ═══════════════════════════════════════════════════════════
   SOCIAL ICON SVG
═══════════════════════════════════════════════════════════ */
function SocialSVG({ type, size = 16 }) {
  const paths = {
    linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>,
    github:   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>,
    twitter:  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>,
    behance:  <path d="M20.07 7h-4.14V5.72h4.14V7zM10.71 10.3c.48-.37.72-.88.72-1.53C11.43 7.21 10.45 6.42 8.49 6.42H3v10.16h5.77c1.04 0 1.88-.28 2.52-.85.64-.57.96-1.33.96-2.27 0-1.14-.51-1.92-1.54-2.16zM6.03 8.48h1.73c.77 0 1.16.34 1.16 1.01s-.39 1.01-1.16 1.01H6.03V8.48zm3.01 6.44H6.03v-2.24h3.01c.85 0 1.27.38 1.27 1.13s-.42 1.11-1.27 1.11zm8.74-3.13c-.54-.58-1.3-.87-2.28-.87-1.02 0-1.82.32-2.4.95s-.87 1.48-.87 2.54c0 1.09.3 1.96.89 2.58.6.62 1.41.93 2.44.93 1.44 0 2.47-.56 3.08-1.69l-1.48-.73c-.29.62-.84.93-1.64.93-.54 0-.97-.16-1.28-.47-.31-.31-.49-.77-.53-1.37h4.98c.02-.15.03-.36.03-.63 0-.97-.31-1.72-.94-2.17zm-4.07 1.56c.07-.52.23-.91.5-1.17.27-.25.62-.38 1.06-.38s.75.13 1.01.38c.26.25.42.64.47 1.17h-3.04z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      {paths[type]}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLIP CARD COMPONENT
   Front: large photo/avatar + name + role tag
   Back:  bio, stats row, social links, portfolio button
   Flip on hover with CSS 3D + framer spring
═══════════════════════════════════════════════════════════ */
function FlipCard({ member, index }) {
  const [flipped, setFlipped] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* Spring-driven Y rotation */
  const rotY   = useMotionValue(0);
  const springY = useSpring(rotY, { stiffness: 100, damping: 20 });

  const flip = () => {
    const next = flipped ? 0 : 180;
    rotY.set(next);
    setFlipped(!flipped);
  };

  /* Derive which face is visible */
  const frontOpacity = useTransform(springY, [0, 89, 90, 180], [1, 1, 0, 0]);
  const backOpacity  = useTransform(springY, [0, 89, 90, 180], [0, 0, 1, 1]);
  const backRotate   = useTransform(springY, v => `rotateY(${v - 180}deg)`);
  const frontRotate  = useTransform(springY, v => `rotateY(${v}deg)`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onClick={flip}
      style={{
        perspective: "1000px",
        cursor: "pointer",
        height: "420px",
        position: "relative",
      }}
    >
      {/* ── FRONT ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          rotateY: frontRotate,
          opacity: frontOpacity,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{
          height: "100%",
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.3s",
        }}>
          {/* Photo area */}
          <div style={{
            flex: 1,
            background: `linear-gradient(160deg, rgba(159,176,200,0.10) 0%, rgba(15,16,19,0.9) 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Dot grid */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: `radial-gradient(circle, rgba(159,176,200,0.12) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }} />

            {/* Ambient glow */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(159,176,200,0.08) 0%, transparent 70%)",
            }} />

            {member.photo ? (
              <img src={member.photo} alt={member.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
            ) : (
              /* Initials avatar */
              <div style={{
                width: "100px", height: "100px", borderRadius: "50%", position: "relative",
                background: `linear-gradient(135deg, rgba(159,176,200,0.18), rgba(221,233,255,0.08))`,
                border: `1px solid rgba(221,233,255,0.20)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 40px rgba(159,176,200,0.15)",
              }}>
                <span style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "30px", fontWeight: 700,
                  background: `linear-gradient(135deg, ${T.cta1}, ${T.steel})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{member.initials}</span>
              </div>
            )}

            {/* "Flip to see more" hint */}
            <div style={{
              position: "absolute", bottom: "14px", right: "16px",
              display: "flex", alignItems: "center", gap: "5px",
              fontFamily: inter.style.fontFamily, fontSize: "10px", fontWeight: 500,
              color: T.textDim, letterSpacing: "0.06em",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              flip
            </div>
          </div>

          {/* Name + role */}
          <div style={{ padding: "20px 24px 24px" }}>
            <div style={{
              display: "inline-block",
              fontFamily: inter.style.fontFamily, fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.steel,
              background: "rgba(159,176,200,0.06)",
              border: `1px solid ${T.border}`,
              padding: "3px 10px", borderRadius: "100px",
              marginBottom: "10px",
            }}>{member.role}</div>

            <h3 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "20px", fontWeight: 700,
              letterSpacing: "-0.02em",
              color: T.text, margin: "0 0 4px",
            }}>{member.name}</h3>

            <div style={{
              fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 400,
              color: T.textDim, letterSpacing: "0.02em",
            }}>{member.username}</div>
          </div>
        </div>
      </motion.div>

      {/* ── BACK ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0,
          rotateY: backRotate,
          opacity: backOpacity,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{
          height: "100%",
          background: `linear-gradient(160deg, rgba(159,176,200,0.07) 0%, rgba(15,16,19,0.97) 60%)`,
          border: `1px solid ${T.borderHov}`,
          borderRadius: "20px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
        }}>

          {/* Glow orb top-right */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "180px", height: "180px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(221,233,255,0.07) 0%, transparent 65%)",
            transform: "translate(30%, -30%)", pointerEvents: "none",
          }} />

          {/* Top: name + flip back hint */}
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <div style={{
                  display: "inline-block",
                  fontFamily: inter.style.fontFamily, fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: T.glow,
                  background: "rgba(221,233,255,0.07)",
                  border: "1px solid rgba(221,233,255,0.18)",
                  padding: "3px 10px", borderRadius: "100px", marginBottom: "8px",
                }}>{member.role}</div>
                <h3 style={{
                  fontFamily: cinzel.style.fontFamily, fontSize: "18px", fontWeight: 700,
                  letterSpacing: "-0.02em", color: T.text, margin: 0,
                }}>{member.name}</h3>
              </div>

              {/* Flip back icon */}
              <button onClick={flip} style={{
                background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`,
                borderRadius: "8px", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: T.textDim, cursor: "pointer", flexShrink: 0,
                transition: "all 0.2s",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 4v6h6M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
              </button>
            </div>

            {/* Bio */}
            <p style={{
              fontFamily: inter.style.fontFamily, fontSize: "13.5px", fontWeight: 300,
              color: T.textMuted, lineHeight: 1.72,
              margin: "0 0 20px",
              borderLeft: `2px solid rgba(159,176,200,0.25)`,
              paddingLeft: "14px",
            }}>{member.bio}</p>

            {/* Stats row */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
              padding: "16px 0",
              borderTop: `1px solid ${T.border}`,
              borderBottom: `1px solid ${T.border}`,
              marginBottom: "20px",
            }}>
              {[
                { val: member.stats.projects, label: "Projects" },
                { val: member.stats.clients,  label: "Clients"  },
                { val: `${member.stats.years}yr`, label: "Exp."  },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: "center",
                  borderRight: i < 2 ? `1px solid ${T.border}` : "none",
                }}>
                  <div style={{
                    fontFamily: cinzel.style.fontFamily, fontSize: "22px", fontWeight: 700,
                    letterSpacing: "-0.03em", color: T.text, lineHeight: 1,
                    background: `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>{s.val}</div>
                  <div style={{
                    fontFamily: inter.style.fontFamily, fontSize: "10px", fontWeight: 500,
                    color: T.textDim, letterSpacing: "0.08em", textTransform: "uppercase",
                    marginTop: "3px",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: socials + portfolio */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {Object.entries(member.socials).map(([type, url]) => {
                const [h, setH] = useState(false);
                return (
                  <a key={type} href={url}
                    onClick={e => e.stopPropagation()}
                    onMouseEnter={() => setH(true)}
                    onMouseLeave={() => setH(false)}
                    style={{
                      width: "34px", height: "34px", borderRadius: "9px",
                      border: `1px solid ${h ? T.borderHov : T.border}`,
                      background: h ? "rgba(221,233,255,0.07)" : T.card,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: h ? T.glow : T.steel,
                      textDecoration: "none", transition: "all 0.2s",
                    }}
                  >
                    <SocialSVG type={type} size={15} />
                  </a>
                );
              })}
            </div>

            {/* Portfolio button */}
            <a href={member.portfolio}
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.07em", textTransform: "uppercase",
                color: T.bg,
                background: `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
                padding: "8px 18px", borderRadius: "100px",
                textDecoration: "none",
                display: "flex", alignItems: "center", gap: "6px",
              }}
            >
              Portfolio
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor"
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN ABOUT PAGE
═══════════════════════════════════════════════════════════ */
export default function About() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valRef     = useRef(null);
  const valInView  = useInView(valRef, { once: true, margin: "-60px" });

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const fadeUp  = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{
        position: "relative",
        padding: "160px 64px 100px",
        maxWidth: "1200px", margin: "0 auto",
        overflow: "hidden",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 65% 35%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 65% 35%, black, transparent)",
        }} />

        {/* Ambient orb */}
        <div style={{
          position: "absolute", top: "5%", right: "10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(159,176,200,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <motion.div
          ref={heroRef}
          variants={stagger}
          initial="hidden"
          animate={heroInView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>About us</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(38px, 6vw, 84px)", fontWeight: 700,
            letterSpacing: "-0.035em", lineHeight: 1.02,
            color: T.text, margin: "0 0 28px", maxWidth: "780px",
          }}>
            We are your{" "}
            <span style={{
              background: `linear-gradient(95deg, ${T.cta1} 0%, ${T.steel} 50%, ${T.glow} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>trusted</span>
            <br />digital partner.
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: inter.style.fontFamily,
            fontSize: "clamp(15px, 1.7vw, 18px)", fontWeight: 300,
            color: T.textMuted, lineHeight: 1.78,
            maxWidth: "560px", margin: "0 0 60px",
          }}>
            vortechzy is a full-stack digital agency building web apps, SaaS platforms,
            CRM systems and mobile applications — integrating AI at every layer.
            A tight team of engineers, designers and strategists, serving clients globally.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} style={{
            display: "flex", flexWrap: "wrap", rowGap: "28px",
            paddingTop: "40px", borderTop: `1px solid ${T.border}`,
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                flex: "1 1 120px",
                paddingLeft:  i === 0 ? "0"    : "36px",
                borderLeft:   i === 0 ? "none" : `1px solid ${T.border}`,
              }}>
                <div style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 700,
                  letterSpacing: "-0.03em", lineHeight: 1,
                  background: `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{s.value}</div>
                <div style={{
                  fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 400,
                  color: T.textMuted, letterSpacing: "0.07em",
                  textTransform: "uppercase", lineHeight: 1.4, marginTop: "5px",
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div style={{
        height: "1px", margin: "0 64px",
        background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)`,
      }} />

      {/* ══════════ TEAM SECTION ══════════ */}
      <section style={{ padding: "100px 64px 120px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>Our team</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 700,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              color: T.text, margin: 0,
            }}>
              The people behind<br />
              <span style={{
                background: `linear-gradient(95deg, ${T.cta1}, ${T.steel})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>vortechzy.</span>
            </h2>

            <div style={{ maxWidth: "320px" }}>
              <p style={{
                fontFamily: inter.style.fontFamily, fontSize: "15px", fontWeight: 300,
                color: T.textMuted, lineHeight: 1.72, margin: "0 0 8px",
              }}>
                A lean, senior team — every member ships real work.
              </p>
              {/* Flip hint */}
              <div style={{
                display: "flex", alignItems: "center", gap: "7px",
                fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 500,
                color: T.textDim, letterSpacing: "0.04em",
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 4v6h6M23 20v-6h-6"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                </svg>
                Click any card to flip it
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team grid — flip cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }} className="team-grid">
          {TEAM.map((member, i) => (
            <FlipCard key={i} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{
        height: "1px", margin: "0 64px",
        background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)`,
      }} />

      {/* ══════════ VALUES ══════════ */}
      <section ref={valRef} style={{ padding: "100px 64px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={valInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>How we work</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </div>
          <h2 style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 700,
            letterSpacing: "-0.03em", lineHeight: 1.05, color: T.text, margin: 0,
          }}>Our values.</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {VALUES.map((v, i) => {
            const vRef   = useRef(null);
            const vInView = useInView(vRef, { once: true, margin: "-40px" });
            const [hov, setHov] = useState(false);

            return (
              <motion.div
                key={i}
                ref={vRef}
                initial={{ opacity: 0, x: -24 }}
                animate={vInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "48px",
                  padding: "36px 0",
                  borderBottom: `1px solid ${hov ? T.borderHov : T.border}`,
                  transition: "border-color 0.3s",
                }}
              >
                <span style={{
                  fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: hov ? T.steel : T.textDim,
                  minWidth: "32px", paddingTop: "4px",
                  transition: "color 0.3s",
                }}>{v.num}</span>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: "clamp(18px, 2.2vw, 28px)", fontWeight: 700,
                    letterSpacing: "-0.02em", color: T.text,
                    margin: "0 0 10px", lineHeight: 1.15,
                  }}>{v.title}</h3>
                  <p style={{
                    fontFamily: inter.style.fontFamily, fontSize: "15px", fontWeight: 300,
                    color: T.textMuted, lineHeight: 1.72, margin: 0, maxWidth: "560px",
                  }}>{v.desc}</p>
                </div>

                {/* Arrow on hover */}
                <motion.div
                  animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -10 }}
                  transition={{ duration: 0.25 }}
                  style={{ paddingTop: "4px" }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: `1px solid ${T.borderHov}`,
                    background: "rgba(221,233,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke={T.cta1}
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          .team-grid { grid-template-columns: 1fr !important; }
          section     { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  );
}