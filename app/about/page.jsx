"use client";

import Navbar from "@/components/Navbar";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text-light)] selection:bg-[var(--pro)] selection:text-[var(--bg)]">
      <Navbar />
      <section className="pt-[25px] px-6 md:px-12 lg:px-20">
        {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-3xl text-[var(--text-muted)] leading-relaxed mb-10">
          This is the dedicated About page for vortechzy. Learn more about our team and values.
        </p> */}
        <About />
      </section>
    </main>
  );
}
