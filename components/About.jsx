"use client";

// ─────────────────────────────────────────────────────────────────
//  About.jsx  — Team grid component
//  Renders: section header + 3-column co-founder grid + values list
//  Used by: app/about/page.jsx
// ─────────────────────────────────────────────────────────────────

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";
import { T, EASE, fadeUp } from "./Tokens.js";
import {
  SectionLabel, SectionHeader, Divider,
  ShimmerLine, DotGrid, PillTag, SocialIcon,
} from "./ui/ui.jsx";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// ─── SECTION PADDING — one constant so page.jsx & About.jsx never drift ───
export const SECTION_PX  = "64px";   // horizontal
export const SECTION_PY  = "100px";  // vertical top
export const SECTION_PYB = "120px";  // vertical bottom

// ─── Team data ────────────────────────────────────────────────────────────
//  All three are Co-Founders. Roles reflect their primary craft, not rank.
const TEAM = [
  {
    name:      "Prathmesh Kadam",
    role:      "Co-Founder · Engineering",
    bio:       "Architects the systems that power vortechzy products. 8+ years building high-scale web platforms for global clients.",
    portfolio: "https://github.com",
    photo:     null,
    initials:  "PK",
    socials:   { linkedin: "#", github: "#" },
  },
  {
    name:      "Aditya Pawar",
    role:      "Co-Founder · Design",
    bio:       "Shapes the visual language of every product we ship. Specialist in design systems, UI/UX for SaaS and e-commerce.",
    portfolio: "#",
    photo:     null,
    initials:  "AP",
    socials:   { linkedin: "#", github: "#" },
  },
  {
    name:      "Rohit Patil",
    role:      "Co-Founder · Strategy",
    bio:       "Connects client goals to technical execution. Drives product roadmaps, partnerships, and growth across every engagement.",
    portfolio: "#",
    photo:     null,
    initials:  "RP",
    socials:   { linkedin: "#", github: "#" },
  },
];

// ─── Values list ──────────────────────────────────────────────────────────
const VALUES = [
  {
    num:   "01",
    title: "Craft over speed",
    desc:  "We take the time to build things right. Every pixel, every line of code, every interaction is considered before it ships.",
  },
  {
    num:   "02",
    title: "Client partnership",
    desc:  "We don't just execute briefs. We think deeply about your business goals and build toward them alongside you.",
  },
  {
    num:   "03",
    title: "AI-first thinking",
    desc:  "Every solution we design considers how AI can make it smarter, faster, and more valuable over time.",
  },
  {
    num:   "04",
    title: "Radical transparency",
    desc:  "You know exactly where your project stands, always. No surprises, no hidden complexity, no inflated estimates.",
  },
];

// ─────────────────────────────────────────────────────────────────────────
//  TeamCard
// ─────────────────────────────────────────────────────────────────────────
function TeamCard({ member, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? T.cardHov : T.card,
        border:       `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: "20px",
        overflow:     "hidden",
        transition:   "background 0.35s, border-color 0.35s, transform 0.35s",
        transform:    hov ? "translateY(-4px)" : "translateY(0)",
        cursor:       "default",
        position:     "relative",
        display:      "flex",
        flexDirection:"column",
      }}
    >
      <ShimmerLine visible={hov} />

      {/* ── Photo / avatar area ── */}
      <div style={{
        height:     "220px",
        background: hov
          ? `linear-gradient(135deg, rgba(159,176,200,0.13), rgba(221,233,255,0.07))`
          : `linear-gradient(135deg, rgba(159,176,200,0.06), rgba(15,16,19,0.8))`,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        position:       "relative",
        overflow:       "hidden",
        transition:     "background 0.4s",
        flexShrink:     0,
      }}>
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          /* Avatar with animated ring on hover */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <div style={{
              width:        "88px",
              height:       "88px",
              borderRadius: "50%",
              background:   `linear-gradient(135deg, rgba(159,176,200,0.15), rgba(221,233,255,0.08))`,
              border:       `1px solid ${hov ? T.steel : T.borderHov}`,
              display:      "flex",
              alignItems:   "center",
              justifyContent:"center",
              transition:   "border-color 0.35s, box-shadow 0.35s",
              boxShadow:    hov ? `0 0 0 6px rgba(159,176,200,0.07)` : "none",
            }}>
              <span style={{
                fontFamily:            cinzel.style.fontFamily,
                fontSize:              "26px",
                fontWeight:            700,
                background:            `linear-gradient(135deg, ${T.cta1}, ${T.steel})`,
                WebkitBackgroundClip:  "text",
                WebkitTextFillColor:   "transparent",
                backgroundClip:        "text",
              }}>
                {member.initials}
              </span>
            </div>
            <span style={{
              fontFamily:    inter.style.fontFamily,
              fontSize:      "10px",
              fontWeight:    500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         T.textDim,
            }}>
              Add Photo
            </span>
          </div>
        )}

        {/* Dot grid overlay */}
        <DotGrid visible={hov} />

        {/* "Co-Founder" badge — pinned top-right, always visible */}
        <div style={{
          position:     "absolute",
          top:          "14px",
          right:        "14px",
          background:   "rgba(15,16,19,0.72)",
          border:       `1px solid ${T.border}`,
          borderRadius: "100px",
          padding:      "3px 10px",
          backdropFilter:"blur(8px)",
        }}>
          <span style={{
            fontFamily:    inter.style.fontFamily,
            fontSize:      "9px",
            fontWeight:    700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         T.steel,
          }}>
            Co-Founder
          </span>
        </div>
      </div>

      {/* ── Info area ── */}
      <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Craft role pill */}
        <PillTag hov={hov}>
          {member.role.split(" · ")[1] /* shows "Engineering" / "Design" / "Strategy" */}
        </PillTag>

        <h3 style={{
          fontFamily:    cinzel.style.fontFamily,
          fontSize:      "20px",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         T.text,
          margin:        "12px 0 10px",
          lineHeight:    1.2,
        }}>
          {member.name}
        </h3>

        <p style={{
          fontFamily: inter.style.fontFamily,
          fontSize:   "13px",
          fontWeight: 300,
          color:      T.textMuted,
          lineHeight: 1.72,
          margin:     "0 0 20px",
          flex:       1,   // pushes footer to bottom so all cards align
        }}>
          {member.bio}
        </p>

        {/* Footer: socials + portfolio */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {Object.entries(member.socials).map(([type, url]) => (
              <SocialButton key={type} type={type} url={url} cardHov={hov} />
            ))}
          </div>

          {/* Portfolio arrow — slides in on hover */}
          <a
            href={member.portfolio}
            style={{
              fontFamily:    inter.style.fontFamily,
              fontSize:      "11px",
              fontWeight:    700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         T.cta2,
              textDecoration:"none",
              display:       "flex",
              alignItems:    "center",
              gap:           "5px",
              opacity:       hov ? 1 : 0,
              transform:     hov ? "translateX(0)" : "translateX(-8px)",
              transition:    "opacity 0.3s, transform 0.3s",
            }}
          >
            Portfolio
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5"
                stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Small social icon button (extracted to avoid inline onMouse logic) */
function SocialButton({ type, url, cardHov }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={url}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:          "32px",
        height:         "32px",
        borderRadius:   "8px",
        border:         `1px solid ${hov ? T.borderHov : T.border}`,
        background:     hov ? "rgba(221,233,255,0.06)" : T.card,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        color:          hov ? T.glow : cardHov ? T.steel : T.textMuted,
        textDecoration: "none",
        transition:     "all 0.2s",
      }}
    >
      <SocialIcon type={type} />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  ValueRow  — animated horizontal list item
// ─────────────────────────────────────────────────────────────────────────
function ValueRow({ value, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: EASE }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:     "flex",
        alignItems:  "flex-start",
        gap:         "48px",
        padding:     "36px 0",
        borderBottom:`1px solid ${hov ? T.borderHov : T.border}`,
        transition:  "border-color 0.3s",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily:    inter.style.fontFamily,
        fontSize:      "12px",
        fontWeight:    700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color:         hov ? T.steel : T.textDim,
        minWidth:      "32px",
        paddingTop:    "4px",
        transition:    "color 0.3s",
      }}>
        {value.num}
      </span>

      {/* Title + desc */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily:    cinzel.style.fontFamily,
          fontSize:      "clamp(18px, 2.2vw, 28px)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         T.text,
          margin:        "0 0 12px",
          lineHeight:    1.15,
        }}>
          {value.title}
        </h3>
        <p style={{
          fontFamily: inter.style.fontFamily,
          fontSize:   "15px",
          fontWeight: 300,
          color:      T.textMuted,
          lineHeight: 1.72,
          margin:     0,
          maxWidth:   "560px",
        }}>
          {value.desc}
        </p>
      </div>

      {/* Arrow circle — Redstone signature */}
      <div style={{
        paddingTop: "4px",
        opacity:    hov ? 1 : 0,
        transform:  hov ? "translateX(0)" : "translateX(-10px)",
        transition: "opacity 0.25s, transform 0.25s",
      }}>
        <div style={{
          width:          "44px",
          height:         "44px",
          borderRadius:   "50%",
          border:         `1px solid ${T.borderHov}`,
          background:     "rgba(221,233,255,0.05)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 7h9M7.5 3L11.5 7l-4 4"
              stroke={T.cta1} strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
//  About  — default export consumed by page.jsx
//  Renders ONLY the inner content (no <main>, no Navbar).
//  page.jsx wraps it in its own <section> with shared padding.
// ─────────────────────────────────────────────────────────────────────────
export default function About() {
  const teamRef    = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-60px" });
  const valRef     = useRef(null);
  const valInView  = useInView(valRef, { once: true, margin: "-60px" });

  return (
    <>
      {/* ══ TEAM HEADER ══ */}
      <motion.div
        ref={teamRef}
        initial={{ opacity: 0, y: 24 }}
        animate={teamInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ marginBottom: "64px" }}
      >
        <SectionHeader
          label="Our team"
          title="The people behind"
          accent="vortechzy."
          subtitle="Three co-founders. Every decision made together. Every line of work owned end-to-end."
        />
      </motion.div>

      {/* ══ TEAM GRID ══ */}
      <div
        className="team-grid"
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "20px",
          marginBottom:        "0",
        }}
      >
        {TEAM.map((member, i) => (
          <TeamCard key={i} member={member} index={i} />
        ))}
      </div>

      {/* ══ INLINE DIVIDER ══ */}
      <Divider margin="80px 0" />

      {/* ══ VALUES HEADER ══ */}
      <motion.div
        ref={valRef}
        initial={{ opacity: 0, y: 24 }}
        animate={valInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ marginBottom: "64px" }}
      >
        <SectionHeader
          label="How we work"
          title="Our values."
        />
      </motion.div>

      {/* ══ VALUES LIST ══ */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {VALUES.map((v, i) => (
          <ValueRow key={i} value={v} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}