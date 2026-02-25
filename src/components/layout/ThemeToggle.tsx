"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-card-border transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                className="flex h-6 w-6 items-center justify-center rounded-full bg-card shadow-sm"
                animate={{ x: isDark ? 28 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {isDark ? (
                    <Moon className="h-3.5 w-3.5 text-accent" />
                ) : (
                    <Sun className="h-3.5 w-3.5 text-gold" />
                )}
            </motion.div>
        </button>
    );
}
