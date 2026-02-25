"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Contact() {
    return (
        <section id="contact" className="py-[100px] px-[5%] text-center relative z-10">
            <div className="max-w-[600px] mx-auto">
                <ScrollReveal>
                    <div className="text-[11px] tracking-[0.18em] uppercase text-accent font-medium mb-4">Get in Touch</div>
                    <h2 className="font-display text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-text-strong leading-[1.1] mb-5">
                        Let's build something great
                    </h2>
                    <p className="text-[17px] text-text-muted leading-[1.8] mb-10">
                        Whether you're hiring a Head of Product, looking for a fintech co-founder, or just want to talk about digital banking — my inbox is open.
                    </p>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href="mailto:hassan.noman@example.com"
                            className="inline-flex items-center gap-2 bg-accent text-[var(--color-bg-base)] px-7 py-3.5 rounded-lg font-medium text-[15px] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,212,255,0.25)] hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]"
                        >
                            ✉️ Email
                        </a>
                        <a
                            href="https://www.linkedin.com/in/hasnom89"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-transparent text-text-main px-7 py-3.5 rounded-lg font-normal text-[15px] border border-card-border transition-colors hover:border-accent hover:text-accent"
                        >
                            LinkedIn ↗
                        </a>
                        <a
                            href="https://wa.me/923332272322?text=Hi%20Hassan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-transparent text-text-main px-7 py-3.5 rounded-lg font-normal text-[15px] border border-card-border transition-colors hover:border-accent-3 hover:text-accent-3"
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
