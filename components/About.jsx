"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

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
  borderHov: "rgba(221,233,255,0.15)",
  card:      "rgba(255,255,255,0.025)",
  cardHov:   "rgba(255,255,255,0.045)",
};

/* ── Team data — replace photo URLs + info with real ones ── */
const TEAM = [
  {
    name: "Aryan Sharma",
    role: "Founder & CEO",
    bio: "Visionary behind vortechzy. 8+ years building digital products for global clients.",
    portfolio: "https://github.com",
    photo: null,   // replace with real image path e.g. "/team/aryan.jpg"
    initials: "AS",
    socials: { linkedin: "#", github: "#", twitter: "#" },
  },
  {
    name: "Priya Mehta",
    role: "Lead Designer",
    bio: "Crafts interfaces that convert. Specialist in UI/UX for SaaS and e-commerce.",
    portfolio: "#",
    photo: null,
    initials: "PM",
    socials: { linkedin: "#", behance: "#" },
  },
  {
    name: "Rahul Verma",
    role: "Full-Stack Developer",
    bio: "Next.js & Node.js expert. Builds fast, scalable architectures from the ground up.",
    portfolio: "#",
    photo: null,
    initials: "RV",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Sneha Patel",
    role: "AI & Backend Engineer",
    bio: "Integrates intelligent systems into real products. Python, Supabase, OpenAI APIs.",
    portfolio: "#",
    photo: null,
    initials: "SP",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Dev Joshi",
    role: "Mobile Developer",
    bio: "Builds seamless iOS & Android experiences. React Native and Flutter specialist.",
    portfolio: "#",
    photo: null,
    initials: "DJ",
    socials: { linkedin: "#", github: "#" },
  },
  {
    name: "Kavya Nair",
    role: "SEO & Growth",
    bio: "Drives organic traffic and rankings. Data-first approach to digital marketing.",
    portfolio: "#",
    photo: null,
    initials: "KN",
    socials: { linkedin: "#", twitter: "#" },
  },
];

/* ── Stats ── */
const STATS = [
  { value: "8+",   label: "Years of experience"  },
  { value: "150+", label: "Projects delivered"   },
  { value: "6",    label: "Core team members"    },
  { value: "100%", label: "Client satisfaction"  },
];

/* ── Social icon ── */
function SocialIcon({ type }) {
  const icons = {
    linkedin: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    github: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    twitter: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    behance: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.07 7h-4.14V5.72h4.14V7zm-9.36 3.3c.48-.37.72-.88.72-1.53 0-1.56-.98-2.35-2.94-2.35H3v10.16h5.77c1.04 0 1.88-.28 2.52-.85.64-.57.96-1.33.96-2.27 0-1.14-.51-1.92-1.54-2.34V10.3zm-4.68-.85h1.73c.77 0 1.16.34 1.16 1.01 0 .67-.39 1.01-1.16 1.01H6.03V9.45zm3.01 5.48H6.03v-2.24h3.01c.85 0 1.27.38 1.27 1.13 0 .74-.42 1.11-1.27 1.11zm8.74-4.09c-.54-.58-1.3-.87-2.28-.87-1.02 0-1.82.32-2.4.95-.58.64-.87 1.48-.87 2.54 0 1.09.3 1.96.89 2.58.6.62 1.41.93 2.44.93 1.44 0 2.47-.56 3.08-1.69l-1.48-.73c-.29.62-.84.93-1.64.93-.54 0-.97-.16-1.28-.47-.31-.31-.49-.77-.53-1.37h4.98c.02-.15.03-.36.03-.63 0-.97-.31-1.72-.94-2.17zm-4.07 1.56c.07-.52.23-.91.5-1.17.27-.25.62-.38 1.06-.38.41 0 .75.13 1.01.38.26.25.42.64.47 1.17h-3.04z"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

/* ── Team card ── */
function TeamCard({ member, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.cardHov : T.card,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: "20px",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s",
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Top shimmer line on hover */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${T.steel}, ${T.glow}, ${T.steel}, transparent)`,
          transformOrigin: "left",
        }}
      />

      {/* Photo area */}
      <div style={{
        height: "220px",
        background: hov
          ? `linear-gradient(135deg, rgba(159,176,200,0.12), rgba(221,233,255,0.06))`
          : `linear-gradient(135deg, rgba(159,176,200,0.06), rgba(15,16,19,0.8))`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        transition: "background 0.4s",
      }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          /* Placeholder avatar with initials */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "88px", height: "88px", borderRadius: "50%",
              background: `linear-gradient(135deg, rgba(159,176,200,0.15), rgba(221,233,255,0.08))`,
              border: `1px solid ${T.borderHov}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "26px", fontWeight: 700,
                background: `linear-gradient(135deg, ${T.cta1}, ${T.steel})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{member.initials}</span>
            </div>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.12em", textTransform: "uppercase", color: T.textDim,
            }}>Add Photo</span>
          </div>
        )}

        {/* Subtle grid overlay on photo */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(circle, rgba(159,176,200,0.08) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: hov ? 0.6 : 0.25, transition: "opacity 0.4s",
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: "24px 28px 28px" }}>
        {/* Role tag */}
        <span style={{
          display: "inline-block",
          fontFamily: inter.style.fontFamily,
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: hov ? T.glow : T.steel,
          background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.06)",
          border: `1px solid ${hov ? "rgba(221,233,255,0.18)" : T.border}`,
          padding: "3px 10px", borderRadius: "100px",
          marginBottom: "12px", transition: "all 0.3s",
        }}>
          {member.role}
        </span>

        <h3 style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "20px", fontWeight: 700,
          letterSpacing: "-0.02em", color: T.text,
          margin: "0 0 10px", lineHeight: 1.2,
        }}>{member.name}</h3>

        <p style={{
          fontFamily: inter.style.fontFamily,
          fontSize: "13px", fontWeight: 300,
          color: T.textMuted, lineHeight: 1.7,
          margin: "0 0 20px",
        }}>{member.bio}</p>

        {/* Footer: socials + portfolio link */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "8px" }}>
            {Object.entries(member.socials).map(([type, url]) => (
              <a key={type} href={url}
                style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  border: `1px solid ${T.border}`,
                  background: T.card,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: hov ? T.steel : T.textMuted,
                  textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = T.borderHov;
                  e.currentTarget.style.color = T.glow;
                  e.currentTarget.style.background = "rgba(221,233,255,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.color = hov ? T.steel : T.textMuted;
                  e.currentTarget.style.background = T.card;
                }}
              >
                <SocialIcon type={type} />
              </a>
            ))}
          </div>

          {/* Portfolio link */}
          <a href={member.portfolio} style={{
            fontFamily: inter.style.fontFamily,
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: T.cta2, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "5px",
            opacity: hov ? 1 : 0,
            transform: hov ? "translateX(0)" : "translateX(-6px)",
            transition: "all 0.3s",
          }}>
            Portfolio
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor"
                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Values list ── */
const VALUES = [
  { num: "01", title: "Craft over speed",       desc: "We take the time to build things right. Every pixel, every line of code, every interaction is considered." },
  { num: "02", title: "Client partnership",     desc: "We don't just execute briefs. We think deeply about your business goals and build toward them." },
  { num: "03", title: "AI-first thinking",      desc: "Every solution we design considers how AI can make it smarter, faster, and more valuable over time." },
  { num: "04", title: "Radical transparency",   desc: "You know exactly where your project stands, always. No surprises, no hidden complexity." },
];

/* ═══════════════════════════════════════════════════════════
   MAIN ABOUT PAGE
═══════════════════════════════════════════════════════════ */
export default function About() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valRef     = useRef(null);
  const valInView  = useInView(valRef, { once: true, margin: "-60px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>

      {/* ══ HERO BANNER ══ */}
      <section style={{
        position: "relative",
        padding: "160px 64px 100px",
        maxWidth: "1200px", margin: "0 auto",
        overflow: "hidden",
      }}>
        {/* Bg grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 80% at 60% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 60% 40%, black, transparent)",
        }} />

        <motion.div
          ref={heroRef}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={heroInView ? "show" : "hidden"}
        >
          {/* Label */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>About us</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </motion.div>

          {/* Headline — Redstone style: huge, left-aligned */}
          <motion.h1 variants={fadeUp} style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(38px, 6vw, 84px)", fontWeight: 700,
            letterSpacing: "-0.035em", lineHeight: 1.02,
            color: T.text, margin: "0 0 32px", maxWidth: "780px",
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
            color: T.textMuted, lineHeight: 1.78, maxWidth: "560px", margin: "0 0 60px",
          }}>
            vortechzy is a full-stack digital agency building web apps, SaaS platforms,
            CRM systems and mobile applications — integrating AI at every layer.
            We're a tight team of engineers, designers and strategists based in India,
            serving clients globally.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeUp} style={{
            display: "flex", flexWrap: "wrap", gap: "0",
            paddingTop: "40px", borderTop: `1px solid ${T.border}`,
            rowGap: "28px",
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{
                flex: "1 1 120px",
                paddingLeft: i === 0 ? "0" : "36px",
                borderLeft: i === 0 ? "none" : `1px solid ${T.border}`,
              }}>
                <div style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 700,
                  letterSpacing: "-0.03em", color: T.text, lineHeight: 1,
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

      {/* ══ DIVIDER ══ */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)`,
        margin: "0 64px",
      }} />

      {/* ══ TEAM SECTION ══ */}
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
            <p style={{
              fontFamily: inter.style.fontFamily, fontSize: "15px", fontWeight: 300,
              color: T.textMuted, lineHeight: 1.72, maxWidth: "340px", margin: 0,
            }}>
              A lean, senior team — every member ships real work. No juniors hidden behind a senior face.
            </p>
          </div>
        </motion.div>

        {/* Team grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }} className="team-grid">
          {TEAM.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ══ DIVIDER ══ */}
      <div style={{
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)`,
        margin: "0 64px",
      }} />

      {/* ══ VALUES ══ */}
      <section
        ref={valRef}
        style={{ padding: "100px 64px 120px", maxWidth: "1200px", margin: "0 auto" }}
      >
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
          }}>
            Our values.
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {VALUES.map((v, i) => {
            const ref2  = useRef(null);
            const inV   = useInView(ref2, { once: true, margin: "-40px" });
            const [hov2, setHov2] = useState(false);
            return (
              <motion.div
                key={i}
                ref={ref2}
                initial={{ opacity: 0, x: -24 }}
                animate={inV ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHov2(true)}
                onMouseLeave={() => setHov2(false)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: "48px",
                  padding: "36px 0",
                  borderBottom: `1px solid ${hov2 ? T.borderHov : T.border}`,
                  transition: "border-color 0.3s",
                }}
              >
                <span style={{
                  fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: hov2 ? T.steel : T.textDim,
                  minWidth: "32px", paddingTop: "4px",
                  transition: "color 0.3s",
                }}>{v.num}</span>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: cinzel.style.fontFamily,
                    fontSize: "clamp(18px, 2.2vw, 28px)", fontWeight: 700,
                    letterSpacing: "-0.02em", color: T.text,
                    margin: "0 0 12px", lineHeight: 1.15,
                    transition: "color 0.3s",
                  }}>{v.title}</h3>
                  <p style={{
                    fontFamily: inter.style.fontFamily, fontSize: "15px", fontWeight: 300,
                    color: T.textMuted, lineHeight: 1.72, margin: 0, maxWidth: "560px",
                  }}>{v.desc}</p>
                </div>

                {/* Arrow appears on hover — Redstone signature */}
                <motion.div
                  animate={{ opacity: hov2 ? 1 : 0, x: hov2 ? 0 : -10 }}
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
        @media (max-width: 600px) {
          .team-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  );
}