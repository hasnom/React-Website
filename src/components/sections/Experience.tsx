"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineData = [
    {
        period: "Jun 2022 – Present",
        title: "Product Owner — Digital Channels",
        company: "The Bank of Punjab · Lahore, Pakistan · VP Level",
        highlights: [
            "Full product ownership of digiBOP mobile banking, internet banking, WhatsApp banking, and SMS banking.",
            "Grew active user base from 6K to 850K+ and digital revenue from PKR 400M to PKR 996M (+150%) in one year.",
            "Led seamless platform migration to Temenos Infinity with 95%+ migration rate in 30 days.",
            "Scaled WhatsApp banking to 350K+ users and SMS banking to 1M+ subscribers with PKR 1.2B revenue contribution.",
            "Initiated embedded finance integrations (BookMe, CardWalla) and delivered SBP regulatory compliance roadmap on time.",
            "Self-initiated and leading development of BOP Services App — an in-house branch services digitization platform."
        ],
        dim: false,
    },
    {
        period: "Jun 2018 – Jun 2022",
        title: "Product Owner — Omni (Branchless Banking)",
        company: "United Bank Limited · Karachi, Pakistan",
        highlights: [
            "Managed branchless banking portfolio of 35,000+ agents and 3.5M wallet customers.",
            "Spearheaded kick-off of Temenos T24 Digital Platform to replace legacy branchless banking system.",
            "Served as Country Coordinator for Strategic Initiatives — direct engagement across all clusters and regions from Head Office.",
            "Indirectly managed a 400+ Feet-on-Street sales team; designed KPI frameworks and incentive structures.",
            "Delivered key innovations: Digital Qurbani, COC International Remittance, cash management projects.",
            "Designed agent onboarding journeys, wireframes, and user stories. Led SBP regulatory audit closures."
        ],
        dim: false,
    },
    {
        period: "2017 – 2018",
        title: "Co-Founder",
        company: "F1 Logistics & Decor Shekor · Karachi, Pakistan",
        highlights: [
            "Co-founded F1 Logistics — a last-mile cash-on-delivery startup serving 80+ clients with 300+ daily deliveries across Karachi. Sunset due to hyper-growth infrastructure challenges without external investment.",
            "Co-founded Decor Shekor — a digital-first premium home décor e-commerce store. Led sourcing, branding, and digital marketing. Successfully exited; venture continues under a new brand."
        ],
        dim: true,
    },
    {
        period: "Jan 2016 – Jun 2016",
        title: "Project Officer",
        company: "Subh-e-Nau (Environmental NGO) · Karachi, Pakistan",
        highlights: [
            "Managed CSR and environmental projects in collaboration with corporate partners. Led field visits, cross-functional coordination, and stakeholder alignment for plantation and environmental impact initiatives."
        ],
        dim: true,
    },
    {
        period: "2013 – 2018 (Part-time · Two stints)",
        title: "Operations Manager & Trainer",
        company: "Kinetix Fitness Consultancy · Karachi, Pakistan",
        highlights: [
            "Managed on-site fitness facilities for Standard Chartered Bank, UBL, PSO, Shell, and other corporates. Handled staff supervision, client retention, group classes, and gym setup operations."
        ],
        dim: true,
    }
];

export function Experience() {
    const headerRef = useRef(null);
    const { scrollYProgress: headerScroll } = useScroll({
        target: headerRef,
        offset: ["start end", "center center"]
    });

    const headerOpacity = useTransform(headerScroll, [0, 0.08], [0, 1]);
    const headerY = useTransform(headerScroll, [0, 0.08], [40, 0]);

    const lineRef = useRef(null);
    const { scrollYProgress: lineScroll } = useScroll({
        target: lineRef,
        offset: ["start center", "end center"],
    });

    const pathHeight = useTransform(lineScroll, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="py-[120px] border-t border-card-border px-[5%] relative z-10 bg-bg-alt/50">
            <div className="max-w-[1100px] mx-auto" ref={headerRef}>
                <motion.div style={{ opacity: headerOpacity, y: headerY }}>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Journey</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-14">
                        Experience
                    </h2>
                </motion.div>

                <div className="relative mt-20" ref={lineRef}>
                    {/* Timeline background line */}
                    <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent via-accent-2 to-transparent opacity-10" />

                    {/* Animated line drawing as scroll */}
                    <motion.div
                        className="absolute left-5 top-0 w-[2px] bg-gradient-to-b from-accent to-accent-2 origin-top"
                        style={{ height: pathHeight }}
                        initial={{ scaleY: 0 }}
                    />

                    {timelineData.map((item, i) => (
                        <div key={i} className="grid grid-cols-[56px_1fr] gap-6 mb-16 relative z-10">
                            <div className="flex justify-center pt-1">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 relative z-10 
                    ${item.dim ? 'bg-text-muted' : 'bg-accent shadow-[0_0_12px_var(--color-accent)]'}`}
                                />
                            </div>
                            <TimelineItem item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item }: { item: typeof timelineData[0] }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 0.05], [20, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x }}
            className="bg-card border border-card-border rounded-2xl p-7 md:p-8 transition-colors hover:border-accent/20"
        >
            <div className="text-[11px] tracking-[0.1em] uppercase text-accent mb-1.5">
                {item.period}
            </div>
            <h3 className={`font-display text-[22px] md:text-[24px] font-bold leading-[1.2] tracking-tight mb-2 ${item.dim ? 'text-text-strong opacity-80' : 'text-text-strong'}`}>
                {item.title}
            </h3>
            <div className="text-text-muted text-[14px] mb-4">
                {item.company}
            </div>

            <div className="flex flex-col gap-2 mt-3">
                {item.highlights?.map((hl, j) => (
                    <div key={j} className="flex gap-2.5 text-[14px] text-text-main items-start">
                        <span className="text-accent font-bold flex-shrink-0">›</span>
                        {hl}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
