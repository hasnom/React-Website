"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    style?: any;
    yOffset?: number;
    delay?: number;
}

export function ScrollReveal({ children, className = "", style = {}, yOffset = 30 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Fade in from bottom, stay visible, fade out when leaving top
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [yOffset, 0, 0, -yOffset]);
    const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Variation for elements that should only animate in from the bottom without fading out at the top
export function ScrollRevealIn({ children, className = "", style = {}, yOffset = 30 }: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
