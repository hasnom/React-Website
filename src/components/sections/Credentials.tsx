"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const credentials = [
    { org: "LUMS", title: "Fintech Strategy & Innovation", year: "2025" },
    { org: "Scrum Alliance", title: "Certified Scrum Product Owner (CSPO)", year: "2023" },
    { org: "Scrum Alliance", title: "Certified Scrum Master (CSM)", year: "2023" },
    { org: "Google", title: "AI Essentials", year: "2024" },
    { org: "IoBM", title: "MBA — Marketing", year: "2017" },
    { org: "SSUET", title: "BSc — Electronics Engineering", year: "2012" },
    {
        org: "🏆 Bank of Punjab",
        title: "Enabling Champion Award",
        year: "2023",
        special: true,
    },
    {
        org: "🏆 United Bank Limited",
        title: `"You Made It Possible" Award`,
        year: "2019",
        special: true,
    },
];

export function Credentials() {
    return (
        <section className="py-[100px] px-[5%] relative z-10">
            <div className="max-w-[1100px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Credentials</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-12">
                        Education, certifications & recognition
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {credentials.map((cert, i) => (
                        <ScrollReveal
                            key={i}
                            style={{
                                "--card-opacity": "1",
                                "--card-blur": "0px",
                                "--card-gradient": "linear-gradient(280deg, rgb(var(--accent-rgb) / 0.1) 0%, transparent 50%)"
                            } as any}
                            className={`glow-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 
                ${cert.special
                                    ? 'border-gold/30 bg-gradient-to-br from-gold/5 to-transparent hover:border-gold/50'
                                    : ''}`}
                        >
                            <div className={`text-[11px] uppercase tracking-[0.1em] mb-2 ${cert.special ? 'text-gold' : 'text-accent'}`}>
                                {cert.org}
                            </div>
                            <h4 className="font-display text-[16px] font-semibold text-text-strong mb-1 leading-snug">
                                {cert.title}
                            </h4>
                            <div className="text-[13px] text-text-muted">{cert.year}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
