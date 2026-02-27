"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PROFILE_IMAGE_BASE64 } from "@/lib/assets";
import { InteractiveSphere } from "@/components/ui/InteractiveSphere";

export function Hero() {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const formatted = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
                " · " +
                now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
            setCurrentDateTime(formatted);
        };
        updateDate();
        const interval = setInterval(updateDate, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex items-center pt-[120px] pb-[80px] px-[5%] relative z-10 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-[40px] lg:gap-[20px] w-full max-w-[1500px] mx-auto text-center lg:text-left">

                <motion.div
                    className="flex-1 max-w-full lg:max-w-[550px]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } },
                    }}
                >
                    <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full py-1.5 px-4 text-[12px] tracking-[0.1em] uppercase text-accent mb-8">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                        {currentDateTime || "Loading..."}
                    </motion.div>

                    <motion.h1 variants={fadeUpVariants} className="font-display text-[clamp(44px,6vw,72px)] font-extrabold leading-[0.95] tracking-tight text-text-strong mb-2">
                        Hassan<br />
                        <span className="text-accent">Noman</span>
                    </motion.h1>

                    <motion.div variants={fadeUpVariants} className="font-display text-[clamp(16px,2vw,24px)] font-normal text-text-muted mb-7 pb-1 leading-normal overflow-visible">
                        Product Leader · Digital Banking & Fintech
                    </motion.div>

                    <motion.p variants={fadeUpVariants} className="text-[16px] text-text-main max-w-[500px] leading-[1.7] mb-10 text-justify mx-auto lg:mx-0 opacity-80">
                        Built and scaled digital financial products that millions of people use every day. From zero-to-scale platform migrations to multi-channel banking ecosystems — Turning complex banking infrastructure into seamless customer experiences.
                    </motion.p>

                    <motion.div variants={fadeUpVariants} className="flex gap-4 flex-wrap justify-center lg:justify-start">
                        <a
                            href="#work"
                            className="inline-flex items-center gap-2 bg-accent text-bg-base px-6 py-3 rounded-lg font-medium text-[14px] transition-all hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,212,255,0.25)] hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]"
                        >
                            View Case Studies →
                        </a>
                        <a
                            href="https://www.linkedin.com/in/hasnom89"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-transparent text-text-main px-6 py-3 rounded-lg font-normal text-[14px] border border-card-border transition-colors hover:border-accent hover:text-accent"
                        >
                            LinkedIn Profile ↗
                        </a>
                    </motion.div>
                </motion.div>

                {/* Interactive Sphere between Text and Profile */}
                <motion.div
                    className="flex-1 w-full max-w-[350px] aspect-square lg:max-w-[450px]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                >
                    <InteractiveSphere className="w-full h-full" />
                </motion.div>

                <motion.div
                    className="flex-shrink-0 flex justify-center items-center w-full lg:w-[350px] relative mt-8 lg:mt-0"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                >
                    {/* Pulsating glow behind the image */}
                    <div className="absolute inset-0 max-w-[280px] lg:max-w-[350px] mx-auto bg-accent/20 rounded-[20px] blur-[40px] animate-pulse pointer-events-none" />

                    <motion.img
                        src={PROFILE_IMAGE_BASE64}
                        alt="Hassan Noman - Product Leader"
                        className="relative z-10 w-full max-w-[280px] lg:max-w-[350px] h-auto rounded-[20px] border border-accent/10 grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        style={{
                            boxShadow: "0 20px 60px rgba(0, 212, 255, 0.1), 0 10px 30px rgba(124, 92, 252, 0.05)"
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 30px 80px rgba(0, 212, 255, 0.2), 0 15px 40px rgba(124, 92, 252, 0.15)"
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
