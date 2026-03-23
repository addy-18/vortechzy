"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-light)] selection:bg-[var(--pro)] selection:text-[var(--bg)]">
        <Navbar/>
        <Contact/>

    </main>
  );
}
