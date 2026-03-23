"use client";

// ─────────────────────────────────────────────────────────────────
//  app/about/page.jsx
//  Sections: Hero → Stats → Values Cards → Team + Values list
//  All spacing driven by SECTION_PX / SECTION_PY from About.jsx.
// ─────────────────────────────────────────────────────────────────

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import About, { SECTION_PX, SECTION_PY, SECTION_PYB } from "@/components/About";
import { T, EASE, fadeUp } from "@/components/Tokens.js";
import {
  SectionLabel, SectionHeader, Divider,
  ShimmerLine, DotGrid, PillTag,
} from "@/components/ui/ui.jsx";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

// ─── Shared section wrapper ──────────────────────────────────────
// Every section uses this exact padding so nothing ever drifts.
const sectionStyle = {
  padding:   `${SECTION_PY} ${SECTION_PX} ${SECTION_PYB}`,
  maxWidth:  "1200px",
  margin:    "0 auto",
  position:  "relative",
};

// ─── Stats ───────────────────────────────────────────────────────
// const STATS = [
//   { value: "8+",   label: "Years of experience" },
//   { value: "150+", label: "Projects delivered"  },
//   { value: "3",    label: "Co-founders"         },
//   { value: "100%", label: "Client satisfaction" },
// ];

// ─── Core values (cards) ─────────────────────────────────────────
const CORE_VALUES = [
  {
    num:   "01",
    title: "Innovation First",
    desc:  "We stay ahead of the curve, leveraging cutting-edge technologies and methodologies to deliver next-generation solutions that truly move the needle.",
  },
  {
    num:   "02",
    title: "Client Success",
    desc:  "Your success is our success. We align our goals with yours, ensuring every project delivers measurable, lasting impact for your business.",
  },
  {
    num:   "03",
    title: "Excellence",
    desc:  "We maintain the highest standards of quality and craftsmanship in everything we do — from architecture to the smallest interface detail.",
  },
];

// ─────────────────────────────────────────────────────────────────
//  ValueCard — glass card (identical anatomy to TeamCard)
// ─────────────────────────────────────────────────────────────────
function ValueCard({ value, index }) {
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
        padding:      "36px 32px 40px",
        overflow:     "hidden",
        transition:   "background 0.35s, border-color 0.35s, transform 0.35s",
        transform:    hov ? "translateY(-4px)" : "translateY(0)",
        cursor:       "default",
        position:     "relative",
      }}
    >
      <ShimmerLine visible={hov} />
      <DotGrid visible={hov} />

      {/* Number pill */}
      <div style={{ marginBottom: "24px" }}>
        <PillTag hov={hov}>{value.num}</PillTag>
      </div>

      <h3 style={{
        fontFamily:    cinzel.style.fontFamily,
        fontSize:      "clamp(18px, 1.8vw, 24px)",
        fontWeight:    700,
        letterSpacing: "-0.02em",
        color:         T.text,
        margin:        "0 0 14px",
        lineHeight:    1.2,
      }}>
        {value.title}
      </h3>

      <p style={{
        fontFamily: inter.style.fontFamily,
        fontSize:   "13px",
        fontWeight: 300,
        color:      T.textMuted,
        lineHeight: 1.72,
        margin:     0,
      }}>
        {value.desc}
      </p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  StatItem — animated number + label
// ─────────────────────────────────────────────────────────────────
function StatItem({ stat, index, isFirst }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.08, ease: EASE }}
      style={{
        flex:        "1 1 120px",
        paddingLeft: isFirst ? "0" : "36px",
        borderLeft:  isFirst ? "none" : `1px solid ${T.border}`,
      }}
    >
      <div style={{
        fontFamily:           cinzel.style.fontFamily,
        fontSize:             "clamp(28px, 3.8vw, 44px)",
        fontWeight:           700,
        letterSpacing:        "-0.03em",
        lineHeight:           1,
        background:           `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip:       "text",
      }}>
        {stat.value}
      </div>
      <div style={{
        fontFamily:    inter.style.fontFamily,
        fontSize:      "11px",
        fontWeight:    400,
        color:         T.textMuted,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        lineHeight:    1.4,
        marginTop:     "5px",
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const valRef     = useRef(null);
  const valInView  = useInView(valRef, { once: true, margin: "-60px" });

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>
      <Navbar />

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section style={{
        ...sectionStyle,
        paddingTop:    "160px",
        paddingBottom: "100px",
        overflow:      "hidden",
      }}>
        {/* Background grid — same as About.jsx hero */}
        <div style={{
          position:        "absolute",
          inset:           0,
          pointerEvents:   "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
          `,
          backgroundSize:    "72px 72px",
          maskImage:         "radial-gradient(ellipse 80% 80% at 60% 40%, black, transparent)",
          WebkitMaskImage:   "radial-gradient(ellipse 80% 80% at 60% 40%, black, transparent)",
        }} />

        {/* Ambient glow blob */}
        <div style={{
          position:     "absolute",
          top:          "20%",
          right:        "-10%",
          width:        "520px",
          height:       "520px",
          borderRadius: "50%",
          background:   `radial-gradient(circle, rgba(159,176,200,0.06) 0%, transparent 70%)`,
          pointerEvents:"none",
        }} />

        <motion.div
          ref={heroRef}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
          initial="hidden"
          animate={heroInView ? "show" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp}>
            <SectionLabel text="Our mission" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily:    cinzel.style.fontFamily,
              fontSize:      "clamp(38px, 6vw, 84px)",
              fontWeight:    700,
              letterSpacing: "-0.035em",
              lineHeight:    1.02,
              color:         T.text,
              margin:        "0 0 32px",
              maxWidth:      "860px",
            }}
          >
            We don't just build{" "}
            <span style={{
              background:           `linear-gradient(95deg, ${T.cta1} 0%, ${T.steel} 50%, ${T.glow} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}>
              digital products
            </span>
            <br />— we transform visions.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: inter.style.fontFamily,
              fontSize:   "clamp(15px, 1.7vw, 18px)",
              fontWeight: 300,
              color:      T.textMuted,
              lineHeight: 1.78,
              maxWidth:   "600px",
              margin:     "0 0 60px",
            }}
          >
            Our goal is not to simply complete projects — it is to build effective solutions
            that fully serve the client and their customers. We believe in the power of
            innovation, strategic thinking, and exceptional execution.
          </motion.p>

          {/* Stats row */}
          {/* <motion.div
            variants={fadeUp}
            style={{
              display:    "flex",
              flexWrap:   "wrap",
              gap:        "0",
              paddingTop: "40px",
              borderTop:  `1px solid ${T.border}`,
              rowGap:     "28px",
            }}
          >
            {STATS.map((s, i) => (
              <StatItem key={i} stat={s} index={i} isFirst={i === 0} />
            ))}
          </motion.div> */}
        </motion.div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════
          2. CORE VALUES (cards)
      ══════════════════════════════════════════ */}
      <section ref={valRef} style={sectionStyle}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={valInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "64px" }}
        >
          <SectionHeader
            label="How we think"
            title="Our core"
            accent="values."
            subtitle="Three principles that guide every decision, every line of code, and every client relationship."
          />
        </motion.div>

        <div
          className="values-grid"
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap:                 "20px",
          }}
        >
          {CORE_VALUES.map((v, i) => (
            <ValueCard key={i} value={v} index={i} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════
          3. TEAM + VALUES LIST  (About component)
      ══════════════════════════════════════════ */}
      <section style={sectionStyle}>
        <About />
      </section>

      {/* ══════════════════════════════════════════
          4. FOOTER CTA STRIP
      ══════════════════════════════════════════ */}
      <FooterCTA />

      <style>{`
        @media (max-width: 900px) {
          .values-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
//  FooterCTA — closing strip (Redstone-style)
// ─────────────────────────────────────────────────────────────────
function FooterCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);

  return (
    <>
      <Divider />
      <section style={{
        padding:   "80px 64px 100px",
        maxWidth:  "1200px",
        margin:    "0 auto",
        textAlign: "center",
      }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p style={{
            fontFamily:    inter.style.fontFamily,
            fontSize:      "11px",
            fontWeight:    700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color:         T.steel,
            marginBottom:  "24px",
          }}>
            Ready to build something great?
          </p>

          <h2 style={{
            fontFamily:    cinzel.style.fontFamily,
            fontSize:      "clamp(28px, 4vw, 54px)",
            fontWeight:    700,
            letterSpacing: "-0.03em",
            lineHeight:    1.05,
            color:         T.text,
            margin:        "0 0 40px",
          }}>
            Let's make it happen.
          </h2>

          {/* CTA button */}
          <a
            href="/contact"
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "10px",
              fontFamily:    inter.style.fontFamily,
              fontSize:      "13px",
              fontWeight:    700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         hov ? T.bg : T.text,
              background:    hov
                ? `linear-gradient(95deg, ${T.cta1}, ${T.steel})`
                : "rgba(255,255,255,0.05)",
              border:        `1px solid ${hov ? "transparent" : T.borderHov}`,
              borderRadius:  "100px",
              padding:       "14px 32px",
              textDecoration:"none",
              transition:    "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              transform:     hov ? "scale(1.04)" : "scale(1)",
            }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3L11.5 7l-4 4"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </section>
    </>
  );
}