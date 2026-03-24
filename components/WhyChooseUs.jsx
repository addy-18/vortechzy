"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cinzel, Inter } from "next/font/google";
import { Network, Infinity as InfinityIcon, Shield } from "lucide-react";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      },
    });

    // Heading reveal from faint to fully solid
    tl.to(
      ".heading-text",
      { opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" },
      "0" // start early with the scroll
    );

    // Slide apart a bit to create a gap and avoid 3D collisions
    tl.to(cardsRef.current[0], { xPercent: -15, duration: 1, ease: "power2.inOut" }, "split")
      .to(cardsRef.current[2], { xPercent: 15, duration: 1, ease: "power2.inOut" }, "split");

    // Reveal borders and fully round corners on split
    tl.to(".card-front", {
      borderWidth: "1px",
      borderRadius: "16px",
      duration: 1,
      ease: "power2.inOut"
    }, "split");

    // Staggered Flip
    tl.to(cardsRef.current, {
      rotateY: 180,
      duration: 2,
      stagger: 0.3,
      ease: "power2.inOut",
    });

  }, { scope: containerRef });

  const features = [
    {
      title: "Built for Uncapped Scale",
      desc: "Distributed architectures designed to grow with your business. Fast, stable, and secure—from ten users to ten million.",
      icon: <Network className="w-7 h-7 text-[var(--glow)]" />,
      bg: "linear-gradient(145deg, rgba(20,28,45,0.96) 0%, rgba(10,14,20,0.98) 100%)"
    },
    {
      title: "End-to-End Velocity",
      desc: "We handle the complete product lifecycle. From backend infrastructure to cloud deployment, expect frictionless execution and faster launches.",
      icon: <InfinityIcon className="w-7 h-7 text-[var(--glow)]" />,
      bg: "linear-gradient(145deg, rgba(32,20,40,0.96) 0%, rgba(13,10,20,0.98) 100%)"
    },
    {
      title: "Future-Proof Engineering",
      desc: "No shortcuts, zero technical debt. We deliver clean, optimized software that is easy to maintain and built to last.",
      icon: <Shield className="w-7 h-7 text-[var(--glow)]" />,
      bg: "linear-gradient(145deg, rgba(20,35,28,0.96) 0%, rgba(10,15,12,0.98) 100%)"
    }
  ];

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full h-screen bg-[var(--bg)] overflow-hidden"
    >
      <div className="absolute top-12 left-6 md:top-20 md:left-20 z-10 flex flex-col items-start pointer-events-none">
        <h2 className={`${cinzel.className} text-5xl md:text-6xl lg:text-8xl font-bold flex flex-col gap-2`}>
          {["Why", "Choose", "Us?"].map((word, i) => (
            <span key={i} className="heading-text text-[var(--text-light)] opacity-20 drop-shadow-lg">
              {word}
            </span>
          ))}
        </h2>
        <div className="heading-text w-24 h-1 mt-8 bg-gradient-to-r from-[var(--glow)] to-transparent rounded-full opacity-20" />
      </div>

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-[var(--pro)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-[var(--glow)]/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      {/* Cards Stage */}
      <div
        className="relative self-end flex w-[85vw] md:w-[70vw] lg:w-[55vw] h-[50vh] md:h-[60vh] mt-16 mr-4 md:mr-16 lg:mr-24"
        style={{ perspective: "1500px" }}
      >
        {features.map((feat, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="w-1/3 h-full relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Face (Image Split) */}
            <div
              className="card-front absolute inset-0 w-full h-full shadow-xl overflow-hidden box-border"
              style={{
                backgroundImage: "url('/Why.png')",
                backgroundSize: "300% 100%",
                backgroundPosition: `${i * 50}% 50%`,
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,0.07)",
                borderWidth: i === 0 ? "0 0 0 1px" : i === 2 ? "0 1px 0 0" : "0px",
                borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : "0px",
              }}
            >
              {/* Subtle overlay to enhance contrast and richness */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Back Face (Content) */}
            <div
              className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center shadow-2xl rounded-2xl`}
              style={{
                background: feat.bg,
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}
            >
              <div className="w-16 h-16 rounded-full mb-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shadow-inner">
                {feat.icon}
              </div>
              <h3 className={`${cinzel.className} text-xl md:text-2xl font-semibold mb-3 text-[var(--text-light)]`}>
                {feat.title}
              </h3>
              <p className={`${inter.className} text-sm md:text-base text-[var(--pro)] leading-relaxed`}>
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
