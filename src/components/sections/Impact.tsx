"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const impacts = [
    { value: "850K+", label: "Active Digital\nBanking Users", color: "text-accent" },
    { value: "40M+", label: "Monthly\nTransactions Count", color: "text-accent-2" },
    { value: "PKR 1.2B+", label: "Annual Channel\nRevenue", color: "text-accent-3" },
    { value: "PKR 500B+", label: "Monthly Transaction\nThroughput", color: "text-gold" },
    { value: "1M+", label: "SMS Banking\nSubscribers", color: "text-accent" },
    { value: "350K+", label: "WhatsApp Banking\nUsers", color: "text-accent-2" },
    { value: "150%", label: "Revenue Growth\nYoY", color: "text-accent-3" },
    { value: "35K+", label: "Branchless Banking\nAgents", color: "text-gold" },
];

function Counter({ value }: { value: string }) {
    const count = useMotionValue(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-50px" });

    // Parse the value string
    // Examples: "850K+", "PKR 1.2B+", "150%", "40M+"
    const prefixMatch = value.match(/^[^\d.]+/);
    const suffixMatch = value.match(/[^\d.]+$/);
    const numberMatch = value.match(/[\d.]+/);

    const prefix = prefixMatch ? prefixMatch[0] : "";
    const suffix = suffixMatch ? suffixMatch[0] : "";
    const target = numberMatch ? parseFloat(numberMatch[0]) : 0;
    const decimals = numberMatch?.[0].includes(".") ? numberMatch[0].split(".")[1].length : 0;

    const rounded = useTransform(count, (latest) => {
        return latest.toFixed(decimals);
    });

    useEffect(() => {
        if (isInView) {
            count.set(0);
            const controls = animate(count, target, {
                duration: 2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, target, count]);

    return (
        <span ref={ref}>
            {prefix}
            <motion.span>{rounded}</motion.span>
            {suffix}
        </span>
    );
}

export function Impact() {
    return (
        <section id="impact" className="py-[100px] relative z-10 px-[5%]">
            <div className="max-w-[1400px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4 text-center lg:text-left">Scale & Execution</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-12 text-center lg:text-left">
                        Numbers that matter
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch auto-rows-fr">
                    {impacts.map((item, index) => {
                        const isLeft = index < 4;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 0 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: (index % 4) * 0.1, type: "spring", stiffness: 80 }}
                                className="h-full group relative overflow-hidden bg-card border border-card-border rounded-2xl p-6 md:p-8 flex flex-col justify-center text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:border-accent/30"
                            >
                                {/* Hover top gradient line */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent-2 to-accent-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className={`font-display text-[clamp(28px,3vw,42px)] font-extrabold tracking-tight leading-none mb-3 ${item.color}`}>
                                    <Counter value={item.value} />
                                </div>
                                <div className="text-[13px] text-text-muted uppercase tracking-[0.08em] leading-relaxed whitespace-pre-line">
                                    {item.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
