"use client";

import { motion } from "framer-motion";

export function GradientWave() {
    return (
        <div className="animated-gradient-bg" aria-hidden="true">
            {/* Lively Shimmer Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)] animate-pulse" style={{ animationDuration: "8s" }} />

            <div className="dotted-overlay" />

            {/* Animated Gradient Mesh Blobs - Faster and more variance */}
            <motion.div
                className="mesh-blob bg-accent/40 w-[600px] h-[600px] -top-20 -left-20"
                animate={{
                    x: [0, 150, -50, 0],
                    y: [0, 80, -100, 0],
                    rotate: [0, 45, 0],
                    scale: [1, 1.3, 0.9, 1]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-2/30 w-[800px] h-[700px] top-[30%] right-[-10%]"
                animate={{
                    x: [0, -150, 80, 0],
                    y: [0, -120, 120, 0],
                    rotate: [0, -30, 0],
                    scale: [1, 1.2, 0.8, 1]
                }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-3/20 w-[500px] h-[500px] bottom-[-10%] left-[20%]"
                animate={{
                    x: [0, 80, -120, 0],
                    y: [0, -150, 80, 0],
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.4, 0.9, 1]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
