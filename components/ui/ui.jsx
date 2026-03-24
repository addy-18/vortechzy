"use client";

// ─────────────────────────────────────────────────────────────────
//  ui.jsx  — shared presentational primitives for the About family
//  Import from here; never duplicate these inline.
// ─────────────────────────────────────────────────────────────────

import { Inter, Cinzel } from "next/font/google";
import { T } from "../Tokens.js";

const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });

/* ── Eyebrow label + decorative line ── */
export function SectionLabel({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
      <span style={{
        fontFamily: inter.style.fontFamily,
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: T.steel,
      }}>
        {text}
      </span>
      <span style={{
        width: "48px", height: "1px",
        background: `linear-gradient(90deg, ${T.steel}, transparent)`,
      }} />
    </div>
  );
}

/* ── Full-bleed horizontal rule ── */
export function Divider({ margin = "0 64px" }) {
  return (
    <div style={{
      height: "1px",
      background: `linear-gradient(90deg, transparent, ${T.border} 20%, ${T.border} 80%, transparent)`,
      margin,
    }} />
  );
}

/* ── Two-column section header: big h2 left + subtitle right ── */
export function SectionHeader({ label, title, accent, subtitle }) {
  return (
    <>
      <SectionLabel text={label} />
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
      }}>
        <h2 style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "clamp(28px, 4vw, 54px)", fontWeight: 700,
          letterSpacing: "-0.03em", lineHeight: 1.05,
          color: T.text, margin: 0,
        }}>
          {title}
          {accent && (
            <>
              <br />
              <span style={{
                background: `linear-gradient(95deg, ${T.cta1}, ${T.steel})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {accent}
              </span>
            </>
          )}
        </h2>

        {subtitle && (
          <p style={{
            fontFamily: inter.style.fontFamily,
            fontSize: "15px", fontWeight: 300,
            color: T.textMuted, lineHeight: 1.72,
            maxWidth: "340px", margin: 0,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}

/* ── Shimmer line that slides in on hover (top edge of cards) ── */
export function ShimmerLine({ visible }) {
  return (
    <div style={{
      position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
      background: `linear-gradient(90deg, transparent, ${T.steel}, ${T.glow}, ${T.steel}, transparent)`,
      transformOrigin: "left",
      transform: `scaleX(${visible ? 1 : 0})`,
      opacity: visible ? 1 : 0,
      transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s cubic-bezier(0.22,1,0.36,1)",
    }} />
  );
}

/* ── Dot-grid texture overlay (bottom layer of cards) ── */
export function DotGrid({ visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
      backgroundImage: `radial-gradient(circle, rgba(159,176,200,0.07) 1px, transparent 1px)`,
      backgroundSize: "24px 24px",
      opacity: visible ? 0.8 : 0.28,
      transition: "opacity 0.4s ease",
    }} />
  );
}

/* ── Pill tag (role / number labels) ── */
export function PillTag({ children, hov }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: inter.style.fontFamily,
      fontSize: "10px", fontWeight: 700,
      letterSpacing: "0.12em", textTransform: "uppercase",
      color: hov ? T.glow : T.steel,
      background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.06)",
      border: `1px solid ${hov ? "rgba(221,233,255,0.18)" : T.border}`,
      padding: "3px 10px", borderRadius: "100px",
      transition: "all 0.3s",
    }}>
      {children}
    </span>
  );
}

/* ── Social icon set ── */
export function SocialIcon({ type }) {
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
    instagram: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  };
  return icons[type] || null;
}