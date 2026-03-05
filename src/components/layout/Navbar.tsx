"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LiquidButton } from "../ui/LiquidButton";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "#impact", label: "Impact" },
    { href: "#work", label: "Case Studies" },
    { href: "#experience", label: "Experience" },
    { href: "#philosophy", label: "Philosophy" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] px-[5%] py-5 flex justify-between items-center transition-all duration-300",
                    scrolled || mobileOpen
                        ? "bg-bg-base/90 backdrop-blur-xl border-b border-card-border py-4"
                        : "bg-transparent border-b border-transparent"
                )}
            >
                <Link href="/" className="font-display font-bold text-lg tracking-tight text-text-strong">
                    hassannoman.com<span className="text-accent"></span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-4 items-center">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                    ))}
                    <LiquidButton asChild variant="default" className="font-bold text-sm tracking-wide ml-4">
                        <Link href="#contact">Let's Talk</Link>
                    </LiquidButton>
                    <ThemeToggle />
                </div>

                {/* Mobile: Theme Toggle + Hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle Menu"
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-card-border bg-card/60 backdrop-blur-sm text-text-main transition-colors"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[61px] left-0 right-0 z-[99] bg-bg-base/95 backdrop-blur-xl border-b border-card-border px-[5%] py-4 flex flex-col gap-2 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-text-main text-[15px] font-medium py-3 px-2 border-b border-card-border/50 last:border-b-0 hover:text-accent transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2">
                            <LiquidButton asChild variant="default" className="w-full font-bold text-sm tracking-wide justify-center">
                                <Link href="#contact" onClick={() => setMobileOpen(false)}>Let's Talk</Link>
                            </LiquidButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
