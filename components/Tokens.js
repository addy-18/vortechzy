// ─────────────────────────────────────────────
//  tokens.js  — single source of truth for the
//  vortechzy design system (About page family)
// ─────────────────────────────────────────────

export const T = {
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

// Shared easing / spring used everywhere
export const EASE = [0.22, 1, 0.36, 1];

// Common stagger-fade-up variant
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};