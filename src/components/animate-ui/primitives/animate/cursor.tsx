"use client";

import * as React from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    type SpringOptions,
} from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Context ---
interface CursorContextProps {
    mouseX: any;
    mouseY: any;
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    global: boolean;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) throw new Error("useCursor must be used within CursorProvider");
    return context;
}

// --- Provider ---
export interface CursorProviderProps {
    children: React.ReactNode;
    global?: boolean;
}

export function CursorProvider({ children, global = false }: CursorProviderProps) {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        if (global) {
            window.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseleave", handleMouseLeave);
            document.addEventListener("mouseenter", handleMouseEnter);
        }

        return () => {
            if (global) {
                window.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseleave", handleMouseLeave);
                document.removeEventListener("mouseenter", handleMouseEnter);
            }
        };
    }, [global, mouseX, mouseY, isVisible]);

    return (
        <CursorContext.Provider value={{ mouseX, mouseY, isVisible, setIsVisible, global }}>
            {children}
        </CursorContext.Provider>
    );
}

// --- Container ---
export interface CursorContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function CursorContainer({ children, className }: CursorContainerProps) {
    return (
        <div className={cn("relative w-full h-full", className)}>
            {children}
        </div>
    );
}

// --- Main Cursor ---
export interface CursorProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    springConfig?: SpringOptions;
}

export function Cursor({ children, asChild, className, springConfig }: CursorProps) {
    const { mouseX, mouseY, isVisible } = useCursor();
    const x = useSpring(mouseX, springConfig || { damping: 10, stiffness: 400, mass: 0.1 });
    const y = useSpring(mouseY, springConfig || { damping: 10, stiffness: 400, mass: 0.1 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) return null;

    return (
        <motion.div
            className={cn("fixed top-0 left-0 pointer-events-none z-[9999]", className)}
            style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
            }}
        >
            {children}
        </motion.div>
    );
}

// --- Follower ---
export interface CursorFollowProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
    sideOffset?: number;
    alignOffset?: number;
}

export function CursorFollow({ children, className }: CursorFollowProps) {
    // Simplified follower for this implementation
    return (
        <div className={cn("pointer-events-none", className)}>
            {children}
        </div>
    );
}
