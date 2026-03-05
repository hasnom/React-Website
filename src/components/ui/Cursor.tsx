"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Cursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile/touch
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsHovering(
                target.closest('a, button, [role="button"], .glow-card') !== null
            );
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener('resize', checkMobile);
        };
    }, [mouseX, mouseY, isVisible]);

    // Hide on mobile strictly
    if (isMobile) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Main Cursor Dot */}
            <motion.div
                className="absolute w-2 h-2 bg-accent rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Outer Ring/Glow - Only in Dark Mode or on Hover */}
            <motion.div
                className={cn(
                    "absolute w-10 h-10 border border-accent/30 rounded-full hidden dark:block",
                    isHovering && "bg-accent/5 border-accent/50 scale-150"
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 0.6 : 0,
                    transition: "transform 0.3s ease, background 0.3s ease, border 0.3s ease",
                }}
            />

            {/* Dispersion Glow - Follower */}
            <motion.div
                className="absolute w-60 h-60 bg-accent/10 rounded-full blur-[60px] hidden dark:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 0.3 : 0,
                }}
            />
        </div>
    );
}
