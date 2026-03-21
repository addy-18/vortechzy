"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

/* ─── vortechzy palette ─────────────────────────────────── */
const T = {
  bg:        "#0F1013",
  text:      "#EFF1F3",
  textMuted: "rgba(239,241,243,0.52)",
  steel:     "#9FB0C8",
  cta1:      "#D9DDE2",
  cta2:      "#A6B1C6",
  glow:      "#DDE9FF",
  border:    "rgba(255,255,255,0.07)",
  borderHov: "rgba(221,233,255,0.18)",
  card:      "rgba(255,255,255,0.025)",
};

const NAV_LINKS = [
  { label: "Portfolio",        href: "#", hasPlus: true  },
  { label: "Services",         href: "#", hasPlus: true  },
  { label: "Technologies",     href: "#", hasPlus: true  },
  { label: "About",            href: "#", hasPlus: false },
  { label: "Awards & Reviews", href: "#", hasPlus: false },
  { label: "Blog",             href: "#", hasPlus: false },
  { label: "Contact Us",       href: "#", hasPlus: false },
];

function NavLink({ label, href, hasPlus, compact }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: inter.style.fontFamily,
        fontSize: compact ? "11px" : "12px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: hov ? T.text : T.textMuted,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "3px",
        whiteSpace: "nowrap",
        transition: "color 0.2s",
        position: "relative",
        paddingBottom: "2px",
      }}
    >
      {label}
      {hasPlus && (
        <span style={{ fontSize: "13px", lineHeight: 1, opacity: 0.45, fontWeight: 400 }}>+</span>
      )}
      <motion.span
        animate={{ scaleX: hov ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
          transformOrigin: "left",
        }}
      />
    </a>
  );
}

function Burger({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      style={{
        background: "none", border: "none", cursor: "pointer",
        padding: "6px", display: "flex", flexDirection: "column",
        gap: "5px", alignItems: "flex-end",
      }}
    >
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.25 }}
        style={{ display: "block", width: "20px", height: "1.5px", background: T.textMuted, borderRadius: "1px" }} />
      <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }}
        style={{ display: "block", width: "13px", height: "1.5px", background: T.textMuted, borderRadius: "1px" }} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.25 }}
        style={{ display: "block", width: "20px", height: "1.5px", background: T.textMuted, borderRadius: "1px" }} />
    </button>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: "80px", left: "16px", right: "16px",
            background: "rgba(15,16,19,0.95)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: `1px solid ${T.border}`,
            borderRadius: "20px",
            padding: "12px 0",
            zIndex: 99,
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={onClose}
              style={{
                display: "block",
                fontFamily: inter.style.fontFamily,
                fontSize: "13px", fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: T.textMuted, textDecoration: "none",
                padding: "14px 24px",
                borderBottom: `1px solid ${T.border}`,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}
            >
              {l.label}{l.hasPlus ? " +" : ""}
            </a>
          ))}
          <div style={{ padding: "16px 24px 4px" }}>
            <a href="#" style={{
              display: "block", textAlign: "center",
              fontFamily: inter.style.fontFamily,
              fontSize: "13px", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: T.bg,
              background: `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
              padding: "12px 16px", borderRadius: "100px", textDecoration: "none",
            }}>
              Let's talk
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ctaHov,   setCtaHov]   = useState(false);
  const [backHov,  setBackHov]  = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only switch between flat ↔ pill. Never hide the navbar.
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          /* Pill offsets animate via CSS transition */
          top:    scrolled ? "14px"  : "0px",
          left:   scrolled ? "24px"  : "0px",
          right:  scrolled ? "24px"  : "0px",
          height: scrolled ? "52px"  : "72px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: scrolled ? "0 16px" : "0 40px",

          borderRadius: scrolled ? "100px" : "0px",

          /* FIX 2: much more transparent — 0.35 opacity in pill mode */
          background: scrolled
            ? "rgba(15,16,19,0.38)"
            : "transparent",

          backdropFilter:       scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",

          border: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",

          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "none",

          transition: [
            "top 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "left 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "right 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "height 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "padding 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "border-radius 0.45s cubic-bezier(0.25,0.1,0.25,1)",
            "background 0.4s ease",
            "border-color 0.4s ease",
            "box-shadow 0.4s ease",
          ].join(", "),
        }}
      >
        {/* ── Logo ── */}
        <a
          href="/"
          style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: scrolled ? "15px" : "18px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: T.text,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            flexShrink: 0,
            transition: "font-size 0.45s ease",
          }}
        >
          <span style={{
            width:  scrolled ? "24px" : "30px",
            height: scrolled ? "24px" : "30px",
            borderRadius: "50%",
            border: "1px solid rgba(221,233,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "width 0.45s ease, height 0.45s ease",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: `radial-gradient(circle, ${T.glow} 0%, ${T.steel} 100%)`,
              boxShadow: `0 0 8px ${T.glow}55`,
            }} />
          </span>
          vortechzy
        </a>

        {/* ── Desktop links ── */}
        <nav
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: scrolled ? "16px" : "26px",
            transition: "gap 0.45s ease",
          }}
        >
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              label={l.label}
              href={l.href}
              hasPlus={l.hasPlus}
              compact={scrolled}
            />
          ))}
        </nav>

        {/* ── CTA + back button ── */}
        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <a
            href="#"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              fontFamily: inter.style.fontFamily,
              fontSize: scrolled ? "11px" : "12px",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: T.bg,
              background: ctaHov
                ? `linear-gradient(90deg, ${T.glow}, ${T.cta1})`
                : `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
              padding: scrolled ? "8px 16px" : "10px 24px",
              borderRadius: "100px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: ctaHov ? "0 4px 20px rgba(221,233,255,0.2)" : "none",
              transform: ctaHov ? "translateY(-1px)" : "translateY(0)",
              transition: "all 0.22s ease, padding 0.45s ease, font-size 0.45s ease",
            }}
          >
            Let's talk
          </a>

          <button
            onMouseEnter={() => setBackHov(true)}
            onMouseLeave={() => setBackHov(false)}
            aria-label="Back"
            style={{
              width:  scrolled ? "34px" : "42px",
              height: scrolled ? "34px" : "42px",
              borderRadius: "50%",
              border: `1px solid ${backHov ? T.borderHov : T.border}`,
              background: backHov ? "rgba(255,255,255,0.06)" : T.card,
              color: backHov ? T.text : T.textMuted,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
              transition: "all 0.45s ease",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Mobile burger ── */}
        <div className="nav-burger" style={{ display: "none" }}>
          <Burger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        .nav-links, .nav-cta { display: flex !important; }
        .nav-burger           { display: none  !important; }
        @media (max-width: 1100px) { .nav-links { gap: 12px !important; } }
        @media (max-width: 960px)  { .nav-links { display: none !important; } }
        @media (max-width: 768px)  {
          .nav-links  { display: none !important; }
          .nav-cta    { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}