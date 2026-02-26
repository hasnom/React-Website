"use client";

import { useEffect } from "react";

export function SecurityProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // 2. Disable Key Shortcuts for Inspect Element, View Source, etc.
        const handleKeyDown = (e: KeyboardEvent) => {
            // Disable F12
            if (e.key === "F12") {
                e.preventDefault();
            }

            // Disable Ctrl+Shift+I / Cmd+Shift+I (Inspect)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I") {
                e.preventDefault();
            }

            // Disable Ctrl+Shift+J / Cmd+Shift+J (Console)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "J") {
                e.preventDefault();
            }

            // Disable Ctrl+U / Cmd+U (View Source)
            if ((e.ctrlKey || e.metaKey) && e.key === "u") {
                e.preventDefault();
            }

            // Disable Ctrl+Shift+C / Cmd+Shift+C (Element Selector)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        // 3. Prevent Content Copying (Global CSS Injection)
        const style = document.createElement("style");
        style.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
      }
      input, textarea {
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -ms-user-select: text !important;
        user-select: text !important;
      }
    `;
        document.head.appendChild(style);

        // 4. Advanced Deterrent: Debugger loop
        // This makes it difficult to use DevTools if they are already open or opened later
        const devToolsDeterrent = setInterval(() => {
            (function () {
                (function a() {
                    try {
                        (function b(i) {
                            if (("" + i / i).length !== 1 || i % 20 === 0) {
                                (function () { }).constructor("debugger")();
                            } else {
                                debugger;
                            }
                            b(++i);
                        })(0);
                    } catch (e) {
                        setTimeout(a, 5000);
                    }
                })();
            })();
        }, 1000);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.head.removeChild(style);
            clearInterval(devToolsDeterrent);
        };
    }, []);

    return <>{children}</>;
}
