"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const T = {
  bg:        "#0F1013",
  bg2:       "#0B1622",
  bg3:       "#06101A",
  text:      "#EFF1F3",
  textMuted: "rgba(239,241,243,0.52)",
  textDim:   "rgba(239,241,243,0.22)",
  steel:     "#9FB0C8",
  cta1:      "#D9DDE2",
  cta2:      "#A6B1C6",
  glow:      "#DDE9FF",
  border:    "rgba(255,255,255,0.06)",
};

/* ═══════════════════════════════════════════════════════════
   BACKGROUND: Particle field with connections + morphing orbs
   — Particles drift slowly, connected by fading lines when close
   — 3 large gradient orbs pulse and drift independently
   — Mouse proximity attracts nearby particles
═══════════════════════════════════════════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Mouse tracking ── */
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.parentElement.addEventListener("mousemove", onMove);
    canvas.parentElement.addEventListener("mouseleave", onLeave);

    /* ── Particles ── */
    const COUNT = 88;
    const particles = Array.from({ length: COUNT }, () => ({
      x:   Math.random(),       // fraction of W
      y:   Math.random(),       // fraction of H
      vx:  (Math.random() - 0.5) * 0.00012,
      vy:  (Math.random() - 0.5) * 0.00012,
      r:   0.6 + Math.random() * 1.2,
      // color index 0=steel 1=glow 2=cta2
      col: Math.floor(Math.random() * 3),
      alpha: 0.25 + Math.random() * 0.45,
      // each particle has a tiny wobble
      wobbleSpd: 0.0008 + Math.random() * 0.001,
      wobblePhs: Math.random() * Math.PI * 2,
      wobbleAmp: 0.003 + Math.random() * 0.006,
    }));

    const COLORS = [
      [159, 176, 200],   // steel
      [221, 233, 255],   // glow
      [166, 177, 198],   // cta2
    ];

    /* ── 3 large drifting orbs ── */
    const orbs = [
      { fx: 0.75, fy: 0.30, spd: 0.00009, phs: 0,       range: 0.18, r: 0.32, col: [159,176,200], a: 0.09 },
      { fx: 0.85, fy: 0.65, spd: 0.00007, phs: 2.1,     range: 0.14, r: 0.28, col: [221,233,255], a: 0.06 },
      { fx: 0.60, fy: 0.50, spd: 0.00011, phs: 4.2,     range: 0.12, r: 0.22, col: [166,177,198], a: 0.05 },
    ];

    const CONNECT_DIST = 0.16; // fraction of screen diagonal
    const MOUSE_PULL   = 80;   // px radius

    const loop = (t) => {
      ctx.clearRect(0, 0, W, H);

      const diag = Math.hypot(W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* ── Draw orbs ── */
      orbs.forEach((o) => {
        const ox = W * (o.fx + o.range * Math.sin(t * o.spd + o.phs));
        const oy = H * (o.fy + o.range * Math.cos(t * o.spd * 1.3 + o.phs));
        const radius = Math.min(W, H) * o.r;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0,    `rgba(${o.col},${o.a})`);
        grad.addColorStop(0.5,  `rgba(${o.col},${o.a * 0.4})`);
        grad.addColorStop(1,    `rgba(${o.col},0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* ── Update + draw particles ── */
      particles.forEach((p) => {
        // Wobble
        p.x += p.vx + p.wobbleAmp * Math.sin(t * p.wobbleSpd + p.wobblePhs) * 0.001;
        p.y += p.vy + p.wobbleAmp * Math.cos(t * p.wobbleSpd * 1.3 + p.wobblePhs) * 0.001;

        // Wrap around edges
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        // Mouse attraction — subtle pull toward cursor
        const px = p.x * W, py = p.y * H;
        const dx = mx - px, dy = my - py;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_PULL && dist > 0) {
          const force = (1 - dist / MOUSE_PULL) * 0.00004;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity so particles don't fly away
        p.vx *= 0.998;
        p.vy *= 0.998;

        // Draw dot
        const [r, g, b] = COLORS[p.col];
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      });

      /* ── Draw connections between close particles ── */
      const maxDist = CONNECT_DIST * diag;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b2 = particles[j];
          const ax = a.x * W, ay = a.y * H;
          const bx = b2.x * W, by = b2.y * H;
          const d = Math.hypot(ax - bx, ay - by);

          if (d < maxDist) {
            const opacity = (1 - d / maxDist) * 0.18;
            const [r, g, bl] = COLORS[a.col];

            // Gradient line: fades from particle a color to particle b color
            const lineGrad = ctx.createLinearGradient(ax, ay, bx, by);
            const [r2, g2, b2c] = COLORS[b2.col];
            lineGrad.addColorStop(0, `rgba(${r},${g},${bl},${opacity})`);
            lineGrad.addColorStop(1, `rgba(${r2},${g2},${b2c},${opacity})`);

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* ── Mouse proximity highlight ring ── */
      if (mx > 0 && mx < W) {
        const ringGrad = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_PULL);
        ringGrad.addColorStop(0,    "rgba(221,233,255,0.00)");
        ringGrad.addColorStop(0.75, "rgba(221,233,255,0.03)");
        ringGrad.addColorStop(1,    "rgba(221,233,255,0.00)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_PULL, 0, Math.PI * 2);
        ctx.fillStyle = ringGrad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.parentElement?.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

/* ─── Vignette + grid ───────────────────────────────────── */
function BgOverlays() {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
      background: `
        radial-gradient(ellipse 52% 100% at 0% 55%,  rgba(15,16,19,0.96) 0%, transparent 100%),
        radial-gradient(ellipse 100% 22% at 50% 100%, rgba(15,16,19,1.0) 0%, transparent 100%),
        radial-gradient(ellipse 100% 18% at 50% 0%,   rgba(15,16,19,0.88) 0%, transparent 100%)
      `,
    }} />
  );
}

/* ─── Tech marquee ──────────────────────────────────────── */
const TECHS = [
  "Next.js","React","TypeScript","Node.js","Python",
  "Supabase","Vercel","AWS","Tailwind CSS","Figma",
  "OpenAI","Prisma","Docker","PostgreSQL","GraphQL",
];

function Marquee() {
  const doubled = [...TECHS, ...TECHS];
  return (
    <div style={{
      overflow: "hidden",
      maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
    }}>
      <div style={{ display: "flex", width: "max-content", animation: "marquee 32s linear infinite" }}>
        {doubled.map((name, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 26px", gap: "26px" }}>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: T.textDim, flexShrink: 0 }} />
            <span style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "12.5px", fontWeight: 500,
              color: T.textMuted, letterSpacing: "0.03em", whiteSpace: "nowrap",
            }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stat counter ──────────────────────────────────────── */
function StatCounter({ end, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now(), dur = 1800;
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) requestAnimationFrame(tick); else setCount(end);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{
        fontFamily: cinzel.style.fontFamily,
        fontSize: "clamp(28px, 3.8vw, 42px)",
        fontWeight: 700, letterSpacing: "-0.03em",
        color: T.text, lineHeight: 1,
        display: "flex", alignItems: "baseline", gap: "2px",
      }}>
        {count}
        <span style={{ color: T.steel, fontSize: "0.58em", fontWeight: 600 }}>{suffix}</span>
      </div>
      <div style={{
        fontFamily: inter.style.fontFamily,
        fontSize: "11px", fontWeight: 400,
        color: T.textMuted, letterSpacing: "0.07em",
        textTransform: "uppercase", lineHeight: 1.4,
      }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════════════ */
export default function Hero() {
  const [ctaHov, setCtaHov] = useState(false);
  const [secHov, setSecHov] = useState(false);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      background: `linear-gradient(155deg, ${T.bg} 0%, ${T.bg2} 55%, ${T.bg3} 100%)`,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>

      <ParticleCanvas />
      <BgOverlays />

      {/* ── CONTENT ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "140px 64px 64px",
          maxWidth: "1200px", width: "100%",
          margin: "0 auto",
          position: "relative", zIndex: 2,
        }}
      >
        {/* AI badge */}
        <motion.div variants={fadeUp} style={{ marginBottom: "30px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "5px 14px 5px 8px",
            background: "rgba(221,233,255,0.05)",
            border: "1px solid rgba(221,233,255,0.12)",
            borderRadius: "100px",
            fontFamily: inter.style.fontFamily,
            fontSize: "12px", fontWeight: 500,
            color: T.steel, letterSpacing: "0.04em",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: T.glow, boxShadow: `0 0 8px ${T.glow}`,
              display: "block", animation: "pulse-dot 2.2s ease infinite",
            }} />
            Powered by AI
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} style={{
          fontFamily: cinzel.style.fontFamily,
          fontSize: "clamp(40px, 6vw, 82px)",
          fontWeight: 700, lineHeight: 1.04,
          letterSpacing: "-0.03em",
          color: T.text, margin: "0 0 28px", maxWidth: "860px",
        }}>
          We build what makes{" "}
          <span style={{ color: "transparent", WebkitTextStroke: `1.5px rgba(239,241,243,0.28)` }}>
            you
          </span>
          <br />
          digitally{" "}
          <span style={{
            background: `linear-gradient(95deg, ${T.cta1} 0%, ${T.steel} 45%, ${T.glow} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            unstoppable.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={fadeUp} style={{
          fontFamily: inter.style.fontFamily,
          fontSize: "clamp(15px, 1.7vw, 18px)", fontWeight: 300,
          color: T.textMuted, lineHeight: 1.78,
          margin: "0 0 46px", maxWidth: "500px",
        }}>
          Web apps, CRM systems, SaaS platforms and mobile apps —
          crafted with precision, integrated with AI, and built to scale your business.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} style={{
          display: "flex", alignItems: "center", gap: "14px",
          flexWrap: "wrap", marginBottom: "76px",
        }}>
          <a href="#"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "13.5px", fontWeight: 700,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: T.bg,
              background: ctaHov
                ? `linear-gradient(90deg, ${T.glow}, ${T.cta1})`
                : `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
              padding: "14px 32px", borderRadius: "100px",
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "9px",
              boxShadow: ctaHov ? "0 8px 32px rgba(217,221,226,0.28)" : "0 3px 16px rgba(217,221,226,0.10)",
              transform: ctaHov ? "translateY(-2px)" : "translateY(0)",
              transition: "all 0.22s ease",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            Get free proposal
          </a>

          <a href="#"
            onMouseEnter={() => setSecHov(true)}
            onMouseLeave={() => setSecHov(false)}
            style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "13.5px", fontWeight: 500,
              color: secHov ? T.text : T.textMuted,
              background: "transparent",
              border: `1px solid ${secHov ? "rgba(255,255,255,0.16)" : T.border}`,
              padding: "14px 28px", borderRadius: "100px",
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "8px",
              transition: "all 0.22s ease",
            }}
          >
            View our work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} style={{
          display: "flex", alignItems: "flex-start",
          paddingTop: "40px", borderTop: `1px solid ${T.border}`,
          flexWrap: "wrap", rowGap: "28px",
        }}>
          {[
            { end: 92,  suffix: "+", label: "Projects completed" },
            { end: 100, suffix: "",  label: "PageSpeed score"    },
            { end: 49,  suffix: "",  label: "Rating 4.9 ★"       },
            { end: 150, suffix: "+", label: "Satisfied clients"  },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 120px",
              paddingLeft: i === 0 ? "0"    : "36px",
              borderLeft:  i === 0 ? "none" : `1px solid ${T.border}`,
            }}>
              <StatCounter end={s.end} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div style={{
        position: "relative", zIndex: 2,
        borderTop: `1px solid ${T.border}`,
        padding: "18px 0", background: "rgba(0,0,0,0.20)",
      }}>
        <Marquee />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1;    transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }
        @media (max-width: 768px) {
          section > div { padding: 100px 24px 48px !important; }
        }
      `}</style>
    </section>
  );
}