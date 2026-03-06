"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function LookingFor() {
    return (
        <section className="py-[100px] border-t border-card-border px-[5%] relative z-10">
            <div className="max-w-[1100px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Next Chapter</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-14">
                        What I'm building toward
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ScrollReveal
                        style={{
                            "--card-opacity": "1",
                            "--card-blur": "0px",
                            "--card-gradient": "linear-gradient(280deg, rgb(var(--accent-rgb) / 0.1) 0%, transparent 50%)"
                        } as any}
                        className="glow-card rounded-2xl p-8 md:p-10 relative overflow-hidden"
                    >
                        <span className="inline-block text-[12px] px-3.5 py-1.5 rounded-full font-medium bg-accent/10 text-accent mb-4">
                            Head of Product · Open to Hire
                        </span>
                        <h3 className="font-display text-[24px] font-bold text-text-strong mb-3 tracking-tight">Head of Product</h3>
                        <p className="text-[15px] text-text-muted leading-[1.8] mb-6">
                            I'm ready to step into a Head of Product role where I can set the vision, build the team, and take a digital financial product from early scale to dominant market position. I want to own the roadmap, shape the culture, and build something that actually matters to customers.
                        </p>
                        <div className="flex gap-2.5 flex-wrap">
                            {["Saudi Arabia", "UAE / Dubai", "Pakistan", "🌐 Remote / Global / Local"].map((tag, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[13px] text-text-strong bg-[var(--color-white-5)] border border-[var(--color-white-10)] px-3.5 py-2 rounded-lg">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal
                        style={{
                            "--card-opacity": "1",
                            "--card-blur": "0px",
                            "--card-gradient": "linear-gradient(280deg, rgb(var(--accent-rgb) / 0.1) 0%, transparent 50%)"
                        } as any}
                        className="glow-card rounded-2xl p-8 md:p-10 relative overflow-hidden"
                    >
                        <span className="inline-block text-[12px] px-3.5 py-1.5 rounded-full font-medium bg-accent-2/10 text-accent-2 mb-4">
                            Co-Founding · Open to Partner
                        </span>
                        <h3 className="font-display text-[24px] font-bold text-text-strong mb-3 tracking-tight">Co-Founder, Fintech</h3>
                        <p className="text-[15px] text-text-muted leading-[1.8] mb-6">
                            I want to build a mission-driven fintech or lifestyle banking product — something fast, customer-obsessed, and designed for real people. If you're building in digital financial services, embedded finance, or consumer payments, and you need a product co-founder who knows banking from the inside — let's talk.
                        </p>
                        <div className="flex gap-2.5 flex-wrap">
                            {["💡 Fintech / Neobank", "💳 Payments", "🌱 Early Stage"].map((tag, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[13px] text-text-strong bg-[var(--color-white-5)] border border-[var(--color-white-10)] px-3.5 py-2 rounded-lg">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
