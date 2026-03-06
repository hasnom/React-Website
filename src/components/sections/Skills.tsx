"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const skills = [
    { name: "Digital Banking Platforms", color: "bg-accent" },
    { name: "Temenos Infinity", color: "bg-accent" },
    { name: "Mobile Banking (iOS/Android)", color: "bg-accent" },
    { name: "Internet Banking", color: "bg-accent" },
    { name: "WhatsApp Banking", color: "bg-accent-2" },
    { name: "SMS Banking", color: "bg-accent-2" },
    { name: "Branchless Banking", color: "bg-accent-2" },
    { name: "Agent Network Management", color: "bg-accent-2" },
    { name: "Product Roadmapping", color: "bg-accent-3" },
    { name: "Backlog Management (JIRA)", color: "bg-accent-3" },
    { name: "Agile / Scrum", color: "bg-accent-3" },
    { name: "User Stories & Wireframes", color: "bg-accent-3" },
    { name: "P&L Management", color: "bg-gold" },
    { name: "Revenue Strategy", color: "bg-gold" },
    { name: "SBP Regulatory Compliance", color: "bg-gold" },
    { name: "NADRA / Biometric Integration", color: "bg-gold" },
    { name: "Third-Party API Integration", color: "bg-accent" },
    { name: "Embedded Finance", color: "bg-accent" },
    { name: "CX Optimization", color: "bg-accent-2" },
    { name: "Platform Migration", color: "bg-accent-2" },
    { name: "AI Tools (Cursor, v0, Bolt)", color: "bg-accent-3" },
    { name: "Fintech Consultancy", color: "bg-accent-3" },
];

export function Skills() {
    return (
        <section className="py-[100px] border-y border-card-border px-[5%] relative z-10 bg-bg-alt/30">
            <div className="max-w-[1100px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Technical & Domain Skills</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-14">
                        The full toolkit
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-3">
                    {skills.map((skill, i) => (
                        <ScrollReveal
                            key={i}
                            style={{
                                "--card-opacity": "1",
                                "--card-blur": "0px",
                                "--card-gradient": "linear-gradient(280deg, rgb(var(--accent-rgb) / 0.1) 0%, transparent 50%)"
                            } as any}
                            className="group flex flex-col md:flex-row items-center gap-2.5 glow-card rounded-xl px-4 py-3.5 transition-colors duration-300"
                        >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${skill.color}`}></div>
                            <span className="text-[14px] text-text-main group-hover:text-text-strong transition-colors">
                                {skill.name}
                            </span>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
