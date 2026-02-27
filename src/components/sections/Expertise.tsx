"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const expertiseList = [
    {
        icon: "📱",
        color: "rgba(0,212,255,0.1)",
        title: "Digital Banking Platforms",
        desc: "End-to-end ownership of mobile banking, internet banking, WhatsApp banking, and SMS banking channels. Platform migration, feature backlog management, and customer experience optimization.",
        tags: ["Temenos Infinity", "Mobile Banking", "Internet Banking"],
    },
    {
        icon: "📊",
        color: "rgba(124,92,252,0.1)",
        title: "P&L & Revenue Management",
        desc: "Managed a nearly PKR 1.2B+ digital revenue portfolio. Revenue-generating initiatives include bill payments, SMS banking, and digital channel monetization using third party integrations.",
        tags: ["Revenue Growth", "Channel P&L", "Monetization"],
    },
    {
        icon: "🧩",
        color: "rgba(0,255,163,0.1)",
        title: "Agile Product Management",
        desc: "Certified Scrum Product Owner and Scrum Master. Expert in JIRA-based backlog management, sprint planning, stakeholder communication, and cross-functional delivery leadership.",
        tags: ["CSPO", "CSM", "JIRA", "User Stories"],
    },
    {
        icon: "🏦",
        color: "rgba(244,193,91,0.1)",
        title: "Branchless & Agent Banking",
        desc: "Administered a network of 35,000+ agents and 3.5M wallet customers. Designed agent onboarding journeys, loyalty programs, and operational efficiency frameworks.",
        tags: ["Branchless Banking", "Agent Networks", "Wallet Products"],
    },
    {
        icon: "🔒",
        color: "rgba(0,212,255,0.1)",
        title: "Regulatory & Compliance",
        desc: "Deep expertise in SBP regulations, biometric verification frameworks, NADRA integrations, device binding, and InfoSec vulnerability management. Delivering regulatory roadmaps on time.",
        tags: ["SBP Regulations", "NADRA", "InfoSec", "Device Binding"],
    },
    {
        icon: "🔗",
        color: "rgba(124,92,252,0.1)",
        title: "Third-Party Integrations",
        desc: "Led embedded finance integrations (BookMe, CardWalla), fintech partnerships, and technical certification of third-party digital services. Functional and technical requirements definition.",
        tags: ["Embedded Finance", "APIs", "Partnerships"],
    },
];

export function Expertise() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Slow Header reveal
    const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const headerY = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

    return (
        <section ref={containerRef} id="expertise" className="relative z-10 h-[300vh] bg-bg-base/20">
            {/* Sticky wrapper: using svh for Safari/macOS consistency */}
            <div className="sticky top-0 min-h-[100svh] flex flex-col justify-center py-20 px-[5%]">
                <div className="max-w-[1100px] w-full mx-auto relative">

                    <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-10 md:mb-14">
                        <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Core Expertise</div>
                        <h2 className="font-display text-[clamp(28px,3vw,42px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-4">
                            Owning the full product lifecycle
                        </h2>
                        <p className="text-text-muted text-[17px] max-w-[560px] leading-[1.8]">
                            From customer-facing features to Revenue to Regulatory compliance — Managing the whole stack.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {expertiseList.map((item, i) => {
                            // Staggered slow triggers
                            const start = 0.05 + (i * 0.12);
                            const end = start + 0.20; // Increased duration for "slower" feel

                            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
                            const y = useTransform(scrollYProgress, [start, end], [1000, 0.5]);

                            return (
                                <motion.div
                                    key={i}
                                    style={{ opacity, y }}
                                    className="group relative bg-card border border-card-border rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:border-accent/25 hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Top Gradient Border on Hover */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 bg-gradient-to-r from-accent to-accent-2 transition-opacity duration-300 group-hover:opacity-100 rounded-t-2xl" />

                                    <div className="w-12 h-12 text-[24px] rounded-xl bg-[var(--color-white-5)] border border-[var(--color-white-10)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>

                                    <h3 className="font-display text-[20px] font-bold text-text-strong mb-3 tracking-tight leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] text-text-muted leading-[1.7]">
                                        {item.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {item.tags.map((tag, j) => (
                                            <span
                                                key={j}
                                                className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--color-white-5)] text-text-muted tracking-[0.04em]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* Safe spacer to avoid overlap with next section */}
            <div className="h-[20vh]" />
        </section>
    );
}
