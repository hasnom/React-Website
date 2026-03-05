"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function GradientWave() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics for the follower
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                mouseX.set(e.touches[0].clientX);
                mouseY.set(e.touches[0].clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="animated-gradient-bg" aria-hidden="true">
            {/* 
                BRIGHTER DISPERSIVE SPOTLIGHT
                Layered effects for "dispersing" feel
            */}
            {/* Inner Core - Hidden on touch devices/light mode for performance */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-10 hidden md:dark:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, var(--accent) 0%, transparent 60%)",
                    opacity: 0.3,
                    filter: "blur(50px)",
                }}
            />

            {/* Large Outer Dispersion - Hidden on touch devices/light mode for performance */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full pointer-events-none z-10 hidden md:dark:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, var(--accent2) 0%, transparent 70%)",
                    opacity: 0.15,
                    filter: "blur(120px)",
                }}
            />

            {/* Base Lively Shimmer Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent)] animate-pulse" style={{ animationDuration: "8s" }} />

            {/* Animated Gradient Mesh Blobs - Floating around */}
            <motion.div
                className="mesh-blob bg-accent/20 w-[600px] h-[600px] -top-20 -left-20"
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, 80, -80, 0],
                    rotate: [0, 20, 0],
                    scale: [1, 1.2, 0.9, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-2/15 w-[800px] h-[700px] top-[30%] right-[-10%]"
                animate={{
                    x: [0, -100, 50, 0],
                    y: [0, -100, 100, 0],
                    rotate: [0, -15, 0],
                    scale: [1, 1.1, 0.8, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="mesh-blob bg-accent-3/10 w-[500px] h-[500px] bottom-[-10%] left-[20%]"
                animate={{
                    x: [0, 50, -80, 0],
                    y: [0, -100, 50, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.3, 0.9, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}
