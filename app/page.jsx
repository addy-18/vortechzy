"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-light)] selection:bg-[var(--pro)] selection:text-[var(--bg)]">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      {!isLoading && <Navbar />}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={isLoading ? "h-screen overflow-hidden" : ""}
      >
        <Hero isReady={!isLoading} />
        <Features />
        <About/>
        <Contact/>
      </motion.div>
    </main>
  );
}
