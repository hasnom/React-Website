"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LiquidButton } from "../ui/LiquidButton";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] px-[5%] py-5 flex justify-between items-center transition-all duration-300",
                scrolled
                    ? "bg-bg-base/80 backdrop-blur-xl border-b border-card-border py-4"
                    : "bg-transparent border-b border-transparent"
            )}
        >
            <Link href="/" className="font-display font-bold text-lg tracking-tight text-white">
                hassannoman.com<span className="text-accent"></span>
            </Link>

            <div className="hidden md:flex gap-4 items-center">
                <NavLink href="#impact">Impact</NavLink>
                <NavLink href="#work">Case Studies</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#philosophy">Philosophy</NavLink>
                <LiquidButton asChild variant="default" className="font-bold text-sm tracking-wide ml-4">
                    <Link href="#contact">
                        Let's Talk
                    </Link>
                </LiquidButton>
                <ThemeToggle />
            </div>
        </motion.nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <LiquidButton asChild variant="glass" className="h-8 px-4 font-body uppercase tracking-wider text-[11px]">
            <Link href={href}>
                {children}
            </Link>
        </LiquidButton>
    );
}
