"use client";

import { motion } from "framer-motion";

export function GradientWave() {
    return (
        <div className="animated-gradient-bg" aria-hidden="true">
            {/* Animated Gradient Mesh Blobs */}
            <motion.div
                className="mesh-blob bg-accent/40 w-[600px] h-[600px] -top-20 -left-20"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-2/30 w-[800px] h-[700px] top-[30%] right-[-10%]"
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.1, 0.9, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-3/20 w-[500px] h-[500px] bottom-[-10%] left-[20%]"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -100, 50, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
