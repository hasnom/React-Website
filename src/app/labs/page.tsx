"use client";

import { InteractiveSphere } from "@/components/ui/InteractiveSphere";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LabsPage() {
    return (
        <main className="min-h-screen bg-bg-base text-text-main relative overflow-hidden flex flex-col items-center justify-center">
            {/* The Experiment */}
            <div className="absolute inset-0 z-0">
                <InteractiveSphere className="w-full h-full opacity-60" />
            </div>

            {/* UI Overlay */}
            <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-text-strong mb-4">
                        Experimental <span className="text-accent">Labs</span>
                    </h1>
                    <p className="text-text-muted max-w-[500px] mx-auto leading-relaxed">
                        This is a sandbox for testing interactive 3D animations and UI experiments.
                        The primary focus here is the <strong>Interactive Lat/Lon Sphere</strong>.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-card-border bg-card-bg/50 backdrop-blur-sm hover:border-accent hover:text-accent transition-all text-sm uppercase tracking-widest"
                    >
                        ← Back to Portfolio
                    </Link>
                </motion.div>
            </div>

            {/* Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-[10px] uppercase tracking-[0.3em] text-text-muted/30">
                Lat/Lon Sphere Experiment v1.0
            </div>
        </main>
    );
}
