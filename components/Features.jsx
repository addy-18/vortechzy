"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Database, Zap, Shield, BarChart3 } from "lucide-react";
import { Inter, Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter  = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

/* ─── Palette ───────────────────────────────────────────── */
const T = {
  bg:        "#0F1013",
  bg2:       "#0c0e12",
  text:      "#EFF1F3",
  textMuted: "rgba(239,241,243,0.48)",
  textDim:   "rgba(239,241,243,0.20)",
  steel:     "#9FB0C8",
  cta1:      "#D9DDE2",
  cta2:      "#A6B1C6",
  glow:      "#DDE9FF",
  border:    "rgba(255,255,255,0.055)",
  borderHov: "rgba(221,233,255,0.16)",
  card:      "rgba(255,255,255,0.022)",
  cardHov:   "rgba(255,255,255,0.042)",
};

/* ═══════════════════════════════════════════════════════════
   MAGNETIC CARD — cursor tilts the card in 3D
═══════════════════════════════════════════════════════════ */
function MagneticCard({ children, style, className }) {
  const ref  = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 120, damping: 18 });
  const sRotY = useSpring(rotY, { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotX.set(-dy * 7);
    rotY.set( dx * 7);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════════════════════ */
function Counter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref  = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const t0 = performance.now(), dur = 1600;
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * end));
        if (p < 1) requestAnimationFrame(tick); else setVal(end);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   PARTICLE RING — decorative canvas orbiting a card
═══════════════════════════════════════════════════════════ */
function ParticleRing({ size = 120, color = T.steel, speed = 1 }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  useEffect(() => {
    const c   = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const S   = size * window.devicePixelRatio;
    c.width = c.height = S;
    const R = (S / 2) * 0.78;
    const pts = 32;
    const loop = (t) => {
      ctx.clearRect(0, 0, S, S);
      for (let i = 0; i < pts; i++) {
        const angle = (i / pts) * Math.PI * 2 + t * 0.0008 * speed;
        const x = S / 2 + Math.cos(angle) * R;
        const y = S / 2 + Math.sin(angle) * R;
        const alpha = (Math.sin(angle * 2 + t * 0.001) + 1) / 2;
        const r = 1.2 + alpha * 1.4;
        const [cr, cg, cb] = color === T.glow ? [221,233,255] : [159,176,200];
        ctx.beginPath();
        ctx.arc(x, y, r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${0.15 + alpha * 0.45})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, color, speed]);
  return (
    <canvas ref={canvasRef}
      style={{ width: size, height: size, pointerEvents: "none", position: "absolute" }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   FEATURES DATA
═══════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    num: "01", tag: "Performance",
    title: "Real-time Sync",
    description: "Sub-millisecond latency for your most critical data pipelines. Always in sync, never behind.",
    icon: Zap,
    stat: { value: 0.8, suffix: "ms", label: "avg latency" },
    accent: T.glow,
    size: "hero",   // spans 2×2
  },
  {
    num: "02", tag: "Security",
    title: "Enterprise Security",
    description: "Bank-grade AES-256 encryption at rest and in transit. SOC2 Type II compliant.",
    icon: Shield,
    stat: { value: 100, suffix: "%", label: "uptime SLA" },
    accent: T.steel,
    size: "normal",
  },
  {
    num: "03", tag: "Insights",
    title: "Advanced Analytics",
    description: "Built-in predictive models and custom reporting that surfaces what matters.",
    icon: BarChart3,
    stat: { value: 12, suffix: "x", label: "faster insights" },
    accent: T.cta2,
    size: "normal",
  },
  {
    num: "04", tag: "Integrations",
    title: "Universal Connectors",
    description: "Connect any database, API, or cloud service in one click. Zero config required.",
    icon: Database,
    stat: { value: 300, suffix: "+", label: "integrations" },
    accent: T.steel,
    size: "wide",   // spans 2×1
  },
];

/* ═══════════════════════════════════════════════════════════
   HERO CARD (large 2×2)
═══════════════════════════════════════════════════════════ */
function HeroCard({ f, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = f.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: "span 2", gridRow: "span 2" }}
    >
      <MagneticCard
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: "100%",
          background: hov ? T.cardHov : T.card,
          border: `1px solid ${hov ? T.borderHov : T.border}`,
          borderRadius: "24px",
          padding: "44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          position: "relative",
          transition: "background 0.35s, border-color 0.35s",
          cursor: "default",
        }}
      >
        {/* Animated particle ring in top-right */}
        <div style={{
          position: "absolute", top: -20, right: -20,
          opacity: hov ? 0.9 : 0.4,
          transition: "opacity 0.5s ease",
        }}>
          <ParticleRing size={180} color={f.accent} speed={hov ? 2.2 : 1} />
        </div>

        {/* Large glow orb */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "340px", height: "340px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(221,233,255,${hov ? 0.07 : 0.03}) 0%, transparent 65%)`,
          transform: "translate(30%, -30%)",
          transition: "opacity 0.5s",
          pointerEvents: "none",
        }} />

        {/* Top: num + tag */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: T.steel,
            }}>{f.num}</span>
            <span style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
            <span style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "10.5px", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: hov ? T.glow : T.steel,
              background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.05)",
              border: `1px solid ${hov ? "rgba(221,233,255,0.18)" : T.border}`,
              padding: "4px 12px", borderRadius: "100px",
              transition: "all 0.3s",
            }}>{f.tag}</span>
          </div>

          {/* Icon box */}
          <div style={{
            width: "60px", height: "60px", borderRadius: "16px",
            background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.05)",
            border: `1px solid ${hov ? T.borderHov : T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "28px",
            transition: "all 0.35s",
          }}>
            <Icon size={26} color={hov ? T.glow : T.steel} strokeWidth={1.4} />
          </div>
        </div>

        {/* Bottom: title + desc + stat */}
        <div>
          <h3 style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 700, letterSpacing: "-0.025em",
            color: T.text, margin: "0 0 14px", lineHeight: 1.1,
          }}>
            {f.title}
          </h3>
          <p style={{
            fontFamily: inter.style.fontFamily,
            fontSize: "15px", fontWeight: 300,
            color: T.textMuted, lineHeight: 1.72,
            margin: "0 0 32px", maxWidth: "340px",
          }}>
            {f.description}
          </p>

          {/* Big stat + learn more */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{
                fontFamily: cinzel.style.fontFamily,
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 700, letterSpacing: "-0.04em",
                background: `linear-gradient(90deg, ${T.cta1}, ${T.glow})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text", lineHeight: 1,
              }}>
                <Counter end={f.stat.value} suffix={f.stat.suffix} />
              </div>
              <div style={{
                fontFamily: inter.style.fontFamily,
                fontSize: "11px", fontWeight: 500,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: T.textMuted, marginTop: "4px",
              }}>{f.stat.label}</div>
            </div>

            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              style={{
                fontFamily: inter.style.fontFamily,
                fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: T.cta1, textDecoration: "none",
                display: "flex", alignItems: "center", gap: "8px",
                opacity: hov ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              Learn more
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke={T.cta1}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: 0, left: "8%", right: "8%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${T.steel}, ${T.glow}, ${T.steel}, transparent)`,
            transformOrigin: "left",
          }}
        />
      </MagneticCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NORMAL CARD (1×1)
═══════════════════════════════════════════════════════════ */
function NormalCard({ f, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = f.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <MagneticCard
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          height: "100%", minHeight: "240px",
          background: hov ? T.cardHov : T.card,
          border: `1px solid ${hov ? T.borderHov : T.border}`,
          borderRadius: "20px", padding: "32px",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden", position: "relative",
          transition: "background 0.35s, border-color 0.35s",
          cursor: "default",
        }}
      >
        {/* Corner accent */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "120px", height: "120px", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(159,176,200,${hov ? 0.09 : 0.03}) 0%, transparent 70%)`,
          transform: "translate(35%, -35%)",
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />

        <div>
          {/* Num + icon row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: T.textDim,
            }}>{f.num}</span>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.04)",
              border: `1px solid ${hov ? T.borderHov : T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}>
              <Icon size={18} color={hov ? T.glow : T.steel} strokeWidth={1.4} />
            </div>
          </div>

          {/* Tag pill */}
          <span style={{
            display: "inline-block",
            fontFamily: inter.style.fontFamily,
            fontSize: "10px", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: hov ? T.glow : T.steel,
            background: hov ? "rgba(221,233,255,0.06)" : "rgba(159,176,200,0.05)",
            border: `1px solid ${hov ? "rgba(221,233,255,0.15)" : T.border}`,
            padding: "3px 10px", borderRadius: "100px",
            marginBottom: "16px",
            transition: "all 0.3s",
          }}>{f.tag}</span>

          <h3 style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(16px, 1.8vw, 22px)",
            fontWeight: 700, letterSpacing: "-0.02em",
            color: T.text, margin: "0 0 10px", lineHeight: 1.15,
          }}>{f.title}</h3>
          <p style={{
            fontFamily: inter.style.fontFamily,
            fontSize: "13px", fontWeight: 300,
            color: T.textMuted, lineHeight: 1.7, margin: 0,
          }}>{f.description}</p>
        </div>

        {/* Stat + arrow */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "24px" }}>
          <div>
            <div style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(22px, 3vw, 30px)",
              fontWeight: 700, letterSpacing: "-0.03em",
              background: `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", lineHeight: 1,
            }}>
              <Counter end={f.stat.value} suffix={f.stat.suffix} />
            </div>
            <div style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.09em", textTransform: "uppercase",
              color: T.textMuted, marginTop: "3px",
            }}>{f.stat.label}</div>
          </div>

          <motion.div
            animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -6 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: `1px solid ${T.borderHov}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(221,233,255,0.05)",
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke={T.cta1}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Bottom shimmer */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: 0, left: "8%", right: "8%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${T.steel}, transparent)`,
            transformOrigin: "left",
          }}
        />
      </MagneticCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WIDE CARD (2×1)
═══════════════════════════════════════════════════════════ */
function WideCard({ f, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon   = f.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ gridColumn: "span 2" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        background: hov ? T.cardHov : T.card,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: "20px", padding: "36px 44px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "40px",
        overflow: "hidden", position: "relative",
        flexWrap: "wrap",
        transition: "background 0.35s, border-color 0.35s",
        cursor: "default",
      }}>

        {/* Animated line across the middle */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 0.3 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${T.steel}, ${T.glow}, ${T.steel}, transparent)`,
            transformOrigin: "left",
          }}
        />

        {/* Left: num + icon + title */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px", flex: 1, minWidth: "280px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px", flexShrink: 0,
            background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.05)",
            border: `1px solid ${hov ? T.borderHov : T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.35s",
          }}>
            <Icon size={24} color={hov ? T.glow : T.steel} strokeWidth={1.4} />
          </div>
          <div>
            <div style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "10.5px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: T.textDim, marginBottom: "6px",
            }}>{f.num} — {f.tag}</div>
            <h3 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontWeight: 700, letterSpacing: "-0.02em",
              color: T.text, margin: 0, lineHeight: 1.1,
            }}>{f.title}</h3>
          </div>
        </div>

        {/* Middle: description */}
        <p style={{
          fontFamily: inter.style.fontFamily,
          fontSize: "14px", fontWeight: 300,
          color: T.textMuted, lineHeight: 1.72,
          margin: 0, flex: "1 1 240px", maxWidth: "320px",
        }}>{f.description}</p>

        {/* Right: stat + cta */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px", flexShrink: 0 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700, letterSpacing: "-0.04em",
              background: `linear-gradient(90deg, ${T.cta1}, ${T.steel})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", lineHeight: 1,
            }}>
              <Counter end={f.stat.value} suffix={f.stat.suffix} />
            </div>
            <div style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "10px", fontWeight: 500,
              letterSpacing: "0.09em", textTransform: "uppercase",
              color: T.textMuted, marginTop: "3px",
            }}>{f.stat.label}</div>
          </div>

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            style={{
              width: "48px", height: "48px", borderRadius: "50%",
              border: `1px solid ${T.borderHov}`,
              background: hov ? "rgba(221,233,255,0.07)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", flexShrink: 0,
              transition: "background 0.3s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke={T.cta1}
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Bottom shimmer */}
        <motion.div
          animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: 0, left: "5%", right: "5%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${T.steel}, ${T.glow}, ${T.steel}, transparent)`,
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════ */
export default function Features() {
  const headRef    = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  const hero    = FEATURES.find(f => f.size === "hero");
  const normals = FEATURES.filter(f => f.size === "normal");
  const wide    = FEATURES.find(f => f.size === "wide");

  return (
    <section style={{
      position: "relative",
      background: T.bg,
      padding: "130px 0 150px",
      overflow: "hidden",
    }}>

      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 0%, transparent 100%)",
      }} />

      {/* Drifting ambient orbs */}
      <div style={{
        position: "absolute", top: "15%", right: "8%",
        width: "460px", height: "460px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(159,176,200,0.055) 0%, transparent 65%)",
        pointerEvents: "none",
        animation: "drift1 18s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(221,233,255,0.035) 0%, transparent 65%)",
        pointerEvents: "none",
        animation: "drift2 22s ease-in-out infinite",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 64px" }}>

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "80px" }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily,
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>Services</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "48px", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: cinzel.style.fontFamily,
              fontSize: "clamp(32px, 5vw, 66px)",
              fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.04,
              color: T.text, margin: 0, maxWidth: "640px",
            }}>
              Everything you need.{" "}
              <span style={{
                background: `linear-gradient(95deg, ${T.cta1} 0%, ${T.steel} 50%, ${T.glow} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Nothing you don't.
              </span>
            </h2>

            <div style={{ maxWidth: "300px" }}>
              <p style={{
                fontFamily: inter.style.fontFamily,
                fontSize: "15px", fontWeight: 300,
                color: T.textMuted, lineHeight: 1.75, margin: "0 0 24px",
              }}>
                A complete toolkit for modern digital products — built for teams that move fast.
              </p>
              <a href="#" style={{
                fontFamily: inter.style.fontFamily,
                fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: T.bg,
                background: `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
                padding: "11px 24px", borderRadius: "100px",
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}>
                View all services
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Bento grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "240px",
          gap: "16px",
        }} className="feat-grid">

          {/* Hero card 2×2 */}
          <HeroCard f={hero} index={0} />

          {/* Two normal cards stacked on right */}
          <NormalCard f={normals[0]} index={1} />
          <NormalCard f={normals[1]} index={2} />

          {/* Wide card spans full 3 cols below */}
          <div style={{ gridColumn: "span 3" }}>
            <WideCard f={wide} index={3} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-24px, 18px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(18px, -22px); }
        }
        @media (max-width: 900px) {
          .feat-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: auto !important;
          }
          .feat-grid > div {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            min-height: 220px;
          }
        }
        @media (max-width: 640px) {
          section > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}