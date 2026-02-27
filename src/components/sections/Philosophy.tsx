"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Philosophy() {
    return (
        <section id="philosophy" className="py-[100px] px-[5%] relative z-10">
            <div className="max-w-[1100px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Product Philosophy</div>
                    <h2 className="font-display text-[clamp(32px,4vw,52px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-14">
                        How I think about building
                    </h2>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ScrollReveal
                        className="md:col-span-2 bg-card border border-card-border rounded-2xl p-9 bg-gradient-to-br from-accent/10 via-[rgba(124,92,252,0.15)] to-bg-base/90 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                    >
                        <div className="font-display text-[clamp(24px,4vw,36px)] font-semibold text-text-strong leading-[1.3] tracking-tight mb-4">
                            "The goal isn't to live forever, the goal is to <span className="text-accent-3">create something that will.</span>"
                        </div>
                        <p className="text-[16px] md:text-[18px] text-text-main mt-5 leading-[1.8]">
                            I am here to make an impact and put a <strong>dent in the universe</strong>. I thrive on thinking outside the box and being innovative, even when it requires being unorthodox. I am fueled by a passion for doing <strong>THE GREAT THINGS</strong>. I am not afraid to build bridges or tear down walls to ensure we are doing something positive for the masses.
                        </p>
                    </ScrollReveal>

                    {[
                        {
                            tag: <>Minimal <span className="text-accent">Friction</span>,{"\n"}maximum trust</>,
                            text: <>Great banking products disappear into the background. Every flow I design is judged by one question: can a customer complete this without thinking?</>
                        },
                        {
                            tag: <><span className="text-accent">Data</span> first,{"\n"}instinct second</>,
                            text: <>The phased biometric rollout wasn't intuition — it was built on cohort segmentation data. Revenue growth wasn't luck — it was identifying monetization potential.</>
                        },
                        {
                            tag: <>If the platform{"\n"}can't, <span className="text-accent">Build</span> it</>,
                            text: <>When the main app couldn't deliver non-financial branch services on time, I didn't wait — I proposed and built an in-house solution. Constraints are just invitations to build something better, faster, and more yours.</>
                        },
                        {
                            tag: <>Ship fast,{"\n"}iterate <span className="text-accent">Faster</span></>,
                            text: <>App store rating went from 2.3 to 3.8 in 30 days not because of perfect planning — but because I stayed close to the feedback, moved fast on fixes, and cared about every interaction the customer had with the product.</>
                        },
                    ].map((item, i) => (
                        <ScrollReveal
                            key={i}
                            className="bg-card border border-card-border rounded-2xl p-9"
                        >
                            <div className="font-display text-[20px] font-bold text-text-strong leading-[1.3] whitespace-pre-line mb-4">
                                {item.tag}
                            </div>
                            <p className="text-[15px] text-text-muted leading-[1.8]">
                                {item.text}
                            </p>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
