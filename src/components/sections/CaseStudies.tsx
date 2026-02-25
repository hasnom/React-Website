"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cases = [
    {
        num: "01",
        tagTitle: "Platform Migration",
        tagColor: "blue",
        title: "Migrating 400K+ Users to a New Digital Banking Platform — With Near-Zero Disruption",
        problem: "Bank of Punjab was running a legacy mobile banking system with only 4K–10K active users and no internet banking capability. The challenge: migrate an entire user base to Temenos Infinity without triggering mass drop-off or flooding customer support.",
        steps: [
            "Migrated all usernames to new platform backend silently",
            "Expired passwords — forcing a low-friction password reset flow on first login",
            "Optimized app flows, biometric auth, and navigation post-launch",
            "Rapid feedback loops to patch friction points within 30 days"
        ],
        metrics: [
            { icon: "🚀", val: "95%+", desc: "Active user migration within 30 days", color: "text-accent-3" },
            { icon: "⭐", val: "2.3 → 3.8", desc: "App store rating in 30 days post-launch", color: "text-accent" },
            { icon: "👥", val: "6K → 500K", desc: "Customer base growth in 90 days", color: "text-accent-2" },
        ]
    },
    {
        num: "02",
        tagTitle: "Revenue Growth",
        tagColor: "green",
        title: "Taking Digital Revenue from PKR 400M to PKR 996M — A 150% Uplift in One Year",
        problem: "Digital banking channels were under-monetized. The mandate was to significantly grow revenue from the digital portfolio without compromising customer experience or adding unsustainable operational overhead.",
        steps: [
            "Launched SMS banking incentive campaigns targeting inactive users",
            "Integrated bill payment services to drive transactional revenue",
            "Drove WhatsApp banking adoption to deflect costly IVR calls (~35% reduction)",
            "Scaled SMS subscribers to 1M+ generating PKR 1.2B annual run-rate"
        ],
        metrics: [
            { icon: "📈", val: "150%", desc: "Revenue growth year-on-year", color: "text-accent-3" },
            { icon: "💰", val: "PKR 500M+", desc: "Revenue uplift from digital initiatives", color: "text-gold" },
            { icon: "📉", val: "35%", desc: "IVR call reduction via WhatsApp deflection", color: "text-accent" },
        ]
    },
    {
        num: "03",
        tagTitle: "Regulatory Tech",
        tagColor: "purple",
        title: "Phased Biometric Device Binding Rollout — Compliance Without Customer Churn",
        problem: "State Bank of Pakistan mandated full NADRA-verified device binding across all digital banking users. The risk: forcing 800K+ existing users through a cumbersome biometric process at once would cause massive drop-off and support overload.",
        steps: [
            "Mandatory biometric for all new sign-ups immediately",
            "Segmented existing users by activity: 30-day / 90-day / 180-day active cohorts",
            "Deleted device records in phases — triggering re-verification only on next login",
            "Data-driven sequencing to minimize simultaneous friction across user base"
        ],
        metrics: [
            { icon: "✅", val: "100%", desc: "Regulatory compliance achieved on schedule", color: "text-accent-3" },
            { icon: "📊", val: "3-Cohort", desc: "Phased rollout model (30/90/180 days)", color: "text-accent" },
            { icon: "🛡️", val: "Minimal", desc: "Customer disruption during migration", color: "text-accent-2" },
        ]
    },
    {
        num: "04",
        tagTitle: "Internal Innovation",
        tagColor: "gold",
        title: "BOP Services App — Building an In-House Branch Digitization Platform",
        problem: "Branches still handled numerous non-financial services over the counter (dormant account activation, CNIC updates, credit card biometric activation, digital onboarding). The main digiBOP app had platform constraints and stability challenges that made building these features there impractical.",
        steps: [
            "Identified all over-the-counter non-financial services as digitization candidates",
            "Proposed and led in-house development using internal tech team",
            "Designed UX/UX from scratch with full product ownership",
            "Built a standalone app decoupled from legacy platform constraints"
        ],
        metrics: [
            { icon: "🏗️", val: "In-House", desc: "Full product built with internal team", color: "text-gold" },
            { icon: "📋", val: "5+ Services", desc: "Branch services digitized in one app", color: "text-accent" },
            { icon: "💡", val: "Personal", desc: "Self-initiated — no external mandate", color: "text-accent-2" },
        ]
    }
];

const tagStyles: Record<string, string> = {
    green: "bg-accent-3/10 text-accent-3",
    blue: "bg-accent/10 text-accent",
    purple: "bg-accent-2/10 text-accent-2",
    gold: "bg-gold/10 text-gold",
};

export function CaseStudies() {
    const headerRef = useRef(null);
    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start end", "center center"]
    });

    // Slow and aesthetic fade-in for header
    const headerOpacity = useTransform(headerScroll, [0, 0.8], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 0.8], [40, 0]);

    return (
        <section id="work" className="py-[120px] relative z-10 px-[5%] overflow-visible">
            <div className="max-w-[1100px] mx-auto" ref={headerRef}>
                <motion.div style={{ opacity: headerOpacity, y: headerY }}>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Case Studies</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-4">
                        Problems I've solved
                    </h2>
                    <p className="text-text-muted text-[17px] max-w-[560px] leading-[1.8]">
                        Real challenges, real constraints, and the thinking behind outcomes that moved the needle.
                    </p>
                </motion.div>

                <div className="grid gap-12 mt-20">
                    {cases.map((cs, i) => (
                        <CaseCard key={i} data={cs} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CaseCard({ data, index }: { data: typeof cases[0], index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // Slow and aesthetic fade-in for cards (now reaching full opacity earlier for better visibility)
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
    const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

    // Background number parallax
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 60]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className="bg-card border border-card-border rounded-[20px] p-[24px] md:p-[44px] flex flex-col md:grid md:grid-cols-2 gap-10 md:items-start text-justify transition-colors duration-300 hover:border-accent/20 relative overflow-hidden"
        >
            <motion.div
                style={{ y: yParallax }}
                className="absolute top-8 right-11 font-display text-[72px] font-extrabold text-white/[0.03] leading-none pointer-events-none"
            >
                {data.num}
            </motion.div>

            <div>
                <span className={`inline-block text-[11px] px-3 py-1 rounded-full mb-4 font-medium tracking-[0.06em] uppercase ${tagStyles[data.tagColor]}`}>
                    {data.tagTitle}
                </span>
                <h3 className="font-display text-[22px] font-bold text-text-strong tracking-tight mb-3 leading-[1.2]">
                    {data.title}
                </h3>
                <div className="text-[14px] text-text-muted leading-[1.7]">
                    {data.problem}
                </div>

                <div className="mt-5 pt-5 border-t border-card-border md:col-span-2">
                    <div className="text-[11px] tracking-[0.1em] uppercase text-text-muted mb-3">
                        How I approached it
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        {data.steps.map((step, k) => (
                            <div key={k} className="flex items-center gap-2 text-[13px] text-text-main bg-white/[0.03] border border-card-border px-3.5 py-2 rounded-lg">
                                <span className="w-5 h-5 rounded-full bg-accent text-bg-base flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                    {k + 1}
                                </span>
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {data.metrics.map((metric, j) => (
                    <div key={j} className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-[10px] border border-card-border">
                        <span className="text-[18px] flex-shrink-0">{metric.icon}</span>
                        <div>
                            <div className="font-display text-[clamp(24px,3vw,36px)] font-bold tracking-tight text-text-strong leading-none mb-1">
                                {metric.val}
                            </div>
                            <div className="text-[12px] text-text-muted leading-[1.4]">
                                {metric.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
