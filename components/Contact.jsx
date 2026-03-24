"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cinzel, Inter } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const T = {
  bg: "#0F1013",
  bg2: "#0c0e12",
  text: "#EFF1F3",
  textMuted: "rgba(239,241,243,0.50)",
  textDim: "rgba(239,241,243,0.22)",
  steel: "#9FB0C8",
  cta1: "#D9DDE2",
  cta2: "#A6B1C6",
  glow: "#DDE9FF",
  border: "rgba(255,255,255,0.06)",
  borderHov: "rgba(221,233,255,0.16)",
  card: "rgba(255,255,255,0.025)",
  cardHov: "rgba(255,255,255,0.045)",
};

/* ── Contact info ── replace with real details ── */
const CONTACT_INFO = {
  phone: "+91 98765 43210",
  email: "hello@vortechzy.com",
  support: "support@vortechzy.com",
  address: "Pune, Maharashtra, India",
};

const SOCIAL_LINKS = [
  { name: "Instagram", handle: "@vortechzy", url: "#", icon: "instagram" },
  { name: "LinkedIn", handle: "vortechzy", url: "#", icon: "linkedin" },
  { name: "Twitter/X", handle: "@vortechzy", url: "#", icon: "twitter" },
  { name: "GitHub", handle: "vortechzy", url: "#", icon: "github" },
  { name: "Behance", handle: "vortechzy", url: "#", icon: "behance" },
];

const SERVICES = [
  "Website Development", "Mobile App", "SaaS Platform",
  "CRM System", "UI/UX Design", "AI Integration",
  "SEO & Growth", "Other",
];

/* ── Social icons ── */
function Icon({ type, size = 18 }) {
  const icons = {
    instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />,
    linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />,
    twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
    github: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
    behance: <path d="M20.07 7h-4.14V5.72h4.14V7zm-9.36 3.3c.48-.37.72-.88.72-1.53 0-1.56-.98-2.35-2.94-2.35H3v10.16h5.77c1.04 0 1.88-.28 2.52-.85.64-.57.96-1.33.96-2.27 0-1.14-.51-1.92-1.54-2.34V10.3zm-4.68-.85h1.73c.77 0 1.16.34 1.16 1.01 0 .67-.39 1.01-1.16 1.01H6.03V9.45zm3.01 5.48H6.03v-2.24h3.01c.85 0 1.27.38 1.27 1.13 0 .74-.42 1.11-1.27 1.11zm8.74-4.09c-.54-.58-1.3-.87-2.28-.87-1.02 0-1.82.32-2.4.95-.58.64-.87 1.48-.87 2.54 0 1.09.3 1.96.89 2.58.6.62 1.41.93 2.44.93 1.44 0 2.47-.56 3.08-1.69l-1.48-.73c-.29.62-.84.93-1.64.93-.54 0-.97-.16-1.28-.47-.31-.31-.49-.77-.53-1.37h4.98c.02-.15.03-.36.03-.63 0-.97-.31-1.72-.94-2.17zm-4.07 1.56c.07-.52.23-.91.5-1.17.27-.25.62-.38 1.06-.38.41 0 .75.13 1.01.38.26.25.42.64.47 1.17h-3.04z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

/* ── Info card ── */
function InfoCard({ icon, label, value, sub, href }) {
  const [hov, setHov] = useState(false);
  const el = href ? "a" : "div";
  const props = href ? { href, target: "_blank", rel: "noopener" } : {};

  return (
    <motion.div
      {...props}
      as={el}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "flex-start", gap: "20px",
        padding: "28px 32px",
        background: hov ? T.cardHov : T.card,
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        borderRadius: "16px",
        textDecoration: "none", cursor: href ? "pointer" : "default",
        transition: "all 0.3s",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Shimmer on hover */}
      <motion.div
        animate={{ scaleX: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", top: 0, left: "6%", right: "6%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${T.steel}, transparent)`,
          transformOrigin: "left",
        }}
      />

      {/* Icon box */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
        background: hov ? "rgba(221,233,255,0.07)" : "rgba(159,176,200,0.05)",
        border: `1px solid ${hov ? T.borderHov : T.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? T.glow : T.steel,
        transition: "all 0.3s",
      }}>
        {icon}
      </div>

      <div>
        <div style={{
          fontFamily: inter.style.fontFamily, fontSize: "10.5px", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: T.textDim, marginBottom: "6px",
        }}>{label}</div>
        <div style={{
          fontFamily: inter.style.fontFamily, fontSize: "16px", fontWeight: 500,
          color: T.text, lineHeight: 1.3,
        }}>{value}</div>
        {sub && (
          <div style={{
            fontFamily: inter.style.fontFamily, fontSize: "13px", fontWeight: 300,
            color: T.textMuted, marginTop: "3px",
          }}>{sub}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Form field ── */
function Field({ label, type = "text", name, placeholder, required, options, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width: "100%", boxSizing: "border-box",
    background: focused ? "rgba(255,255,255,0.04)" : T.card,
    border: `1px solid ${focused ? T.borderHov : T.border}`,
    borderRadius: "12px",
    padding: "14px 18px",
    fontFamily: inter.style.fontFamily, fontSize: "14px", fontWeight: 400,
    color: T.text, outline: "none",
    transition: "all 0.25s",
    appearance: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label style={{
        fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? T.steel : T.textMuted,
        transition: "color 0.25s",
      }}>
        {label}{required && <span style={{ color: T.steel, marginLeft: "3px" }}>*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name} placeholder={placeholder} required={required}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          rows={5}
          style={{ ...baseStyle, resize: "vertical", minHeight: "120px" }}
        />
      ) : type === "select" ? (
        <select
          name={name} required={required}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...baseStyle, cursor: "pointer" }}
        >
          <option value="" style={{ background: T.bg }}>Select a service</option>
          {options.map(o => (
            <option key={o} value={o} style={{ background: T.bg }}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          type={type} name={name} placeholder={placeholder} required={required}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN CONTACT PAGE
═══════════════════════════════════════════════════════════ */
export default function Contact() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your actual form submission logic (e.g. Resend, Formspree, API route)
    await new Promise(r => setTimeout(r, 1400));
    setStatus("sent");
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <main style={{ background: T.bg, minHeight: "100vh" }}>

      {/* ══ HERO ══ */}
      <section style={{
        position: "relative",
        padding: "160px 64px 80px",
        maxWidth: "1200px", margin: "0 auto",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 70% 70% at 70% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 70% 30%, black, transparent)",
        }} />

        <motion.div
          ref={heroRef}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate={heroInView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <span style={{
              fontFamily: inter.style.fontFamily, fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.16em", textTransform: "uppercase", color: T.steel,
            }}>Contact us</span>
            <span style={{ width: "48px", height: "1px", background: `linear-gradient(90deg, ${T.steel}, transparent)` }} />
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontFamily: cinzel.style.fontFamily,
            fontSize: "clamp(38px,6vw,84px)", fontWeight: 700,
            letterSpacing: "-0.035em", lineHeight: 1.02,
            color: T.text, margin: "0 0 28px", maxWidth: "720px",
          }}>
            Let's build something{" "}
            <span style={{
              background: `linear-gradient(95deg,${T.cta1} 0%,${T.steel} 50%,${T.glow} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>great together.</span>
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontFamily: inter.style.fontFamily, fontSize: "clamp(15px,1.7vw,18px)", fontWeight: 300,
            color: T.textMuted, lineHeight: 1.78, maxWidth: "520px", margin: 0,
          }}>
            Tell us about your project and we'll get back to you within 12 hours.
            No commitment, no pressure — just a real conversation.
          </motion.p>
        </motion.div>
      </section>

      {/* ══ MAIN CONTENT: form + info side by side ══ */}
      <section style={{ padding: "20px 64px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "48px",
          alignItems: "start",
        }} className="contact-grid">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: "24px",
              padding: "48px",
              position: "relative", overflow: "hidden",
            }}>
              {/* Ambient glow top-right */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "260px", height: "260px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(159,176,200,0.06) 0%, transparent 65%)",
                transform: "translate(35%, -35%)", pointerEvents: "none",
              }} />

              <div style={{ marginBottom: "36px" }}>
                <h2 style={{
                  fontFamily: cinzel.style.fontFamily,
                  fontSize: "24px", fontWeight: 700,
                  letterSpacing: "-0.02em", color: T.text,
                  margin: "0 0 8px",
                }}>Start a project</h2>
                <p style={{
                  fontFamily: inter.style.fontFamily, fontSize: "14px", fontWeight: 300,
                  color: T.textMuted, margin: 0,
                }}>Fill in the details and we'll be in touch shortly.</p>
              </div>

              {status === "sent" ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "60px 20px", gap: "20px", textAlign: "center",
                  }}
                >
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "50%",
                    background: "rgba(221,233,255,0.08)",
                    border: `1px solid ${T.borderHov}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke={T.glow} strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontFamily: cinzel.style.fontFamily, fontSize: "22px", fontWeight: 700,
                    color: T.text, margin: 0,
                  }}>Message sent!</h3>
                  <p style={{
                    fontFamily: inter.style.fontFamily, fontSize: "14px", fontWeight: 300,
                    color: T.textMuted, maxWidth: "320px", lineHeight: 1.7,
                  }}>
                    Thanks for reaching out. We'll review your project details
                    and get back to you within 12 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                  {/* Row 1: name + email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                    <Field label="Full Name" name="name" placeholder="Aryan Sharma" required value={form.name} onChange={handleChange} />
                    <Field label="Email" name="email" type="email" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                  </div>

                  {/* Row 2: company + service */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-row">
                    <Field label="Company" name="company" placeholder="Your company" value={form.company} onChange={handleChange} />
                    <Field label="Service needed" name="service" type="select" options={SERVICES} required value={form.service} onChange={handleChange} />
                  </div>

                  {/* Budget */}
                  <Field label="Approximate Budget" name="budget" placeholder="e.g. $5,000 – $10,000" value={form.budget} onChange={handleChange} />

                  {/* Message */}
                  <Field label="Tell us about your project" name="message" type="textarea"
                    placeholder="Describe what you're looking to build, any deadlines, and anything else that's relevant..."
                    required value={form.message} onChange={handleChange} />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01, y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={status === "sending"}
                    style={{
                      fontFamily: inter.style.fontFamily,
                      fontSize: "13.5px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      color: T.bg,
                      background: status === "sending"
                        ? `rgba(217,221,226,0.6)`
                        : `linear-gradient(90deg, ${T.cta1}, ${T.cta2})`,
                      border: "none",
                      padding: "16px 36px", borderRadius: "100px",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", gap: "10px",
                      alignSelf: "flex-start",
                      boxShadow: "0 4px 20px rgba(217,221,226,0.15)",
                      transition: "background 0.3s",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                          style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeDashoffset="20" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7h9M7.5 3L11.5 7l-4 4" stroke="currentColor"
                            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* ── RIGHT: Info column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Response time badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 16px 8px 10px",
                background: "rgba(221,233,255,0.05)",
                border: "1px solid rgba(221,233,255,0.12)",
                borderRadius: "100px", marginBottom: "8px", alignSelf: "flex-start",
              }}
            >
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#4ade80", boxShadow: "0 0 8px #4ade80",
                display: "block", animation: "pulse-dot 2s ease infinite",
              }} />
              <span style={{
                fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 500,
                color: T.steel, letterSpacing: "0.03em",
              }}>Available — replies within 12h</span>
            </motion.div>

            {/* Contact info cards */}
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                label: "Phone", value: CONTACT_INFO.phone, sub: "Mon–Fri, 10am–7pm IST",
                href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                label: "General enquiries", value: CONTACT_INFO.email, sub: "For new projects",
                href: `mailto:${CONTACT_INFO.email}`,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                label: "Support", value: CONTACT_INFO.support, sub: "For existing clients",
                href: `mailto:${CONTACT_INFO.support}`,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                label: "Location", value: CONTACT_INFO.address, sub: "Remote-first, global clients",
                href: null,
              },
            ].map((info, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <InfoCard {...info} />
              </motion.div>
            ))}

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: "16px", padding: "28px 32px",
              }}
            >
              <div style={{
                fontFamily: inter.style.fontFamily, fontSize: "10.5px", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: T.textDim, marginBottom: "18px",
              }}>Follow us</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {SOCIAL_LINKS.map((s, i) => {
                  const [hov, setHov] = useState(false);
                  return (
                    <a key={i} href={s.url}
                      onMouseEnter={() => setHov(true)}
                      onMouseLeave={() => setHov(false)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 14px", borderRadius: "10px",
                        background: hov ? "rgba(255,255,255,0.04)" : "transparent",
                        textDecoration: "none", transition: "background 0.2s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <span style={{ color: hov ? T.glow : T.steel, transition: "color 0.2s" }}>
                          <Icon type={s.icon} size={16} />
                        </span>
                        <span style={{
                          fontFamily: inter.style.fontFamily, fontSize: "13px", fontWeight: 500,
                          color: hov ? T.text : T.textMuted, transition: "color 0.2s",
                        }}>{s.name}</span>
                      </div>
                      <span style={{
                        fontFamily: inter.style.fontFamily, fontSize: "12px", fontWeight: 400,
                        color: T.textDim,
                      }}>{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse-dot {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.5;transform:scale(0.7)}
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder {
          color: rgba(239,241,243,0.22);
        }
        select option { background: #0F1013; color: #EFF1F3; }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}