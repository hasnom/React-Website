'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Slot, type WithAsChild } from '@/components/animate-ui/primitives/animate/slot';

type LiquidButtonProps = WithAsChild<
    HTMLMotionProps<'button'> & {
        delay?: string;
        fillHeight?: string;
        hoverScale?: number;
        tapScale?: number;
    }
>;

function LiquidButton({
    asChild,
    delay = '0.4s',
    fillHeight = '0.2em',
    hoverScale = 1.05,
    tapScale = 0.95,
    ...props
}: LiquidButtonProps) {
    const Component = asChild ? Slot : motion.button;

    return (
        <Component
            whileHover={{
                scale: hoverScale,
                // @ts-ignore
                '--liquid-button-fill-width': '100%',
                '--liquid-button-fill-height': '100%',
                '--liquid-button-delay': delay,
                transition: {
                    '--liquid-button-fill-width': { duration: 0 },
                    '--liquid-button-fill-height': { duration: 0 },
                    '--liquid-button-delay': { duration: 0 },
                },
            }}
            whileTap={{ scale: tapScale }}
            style={{
                // @ts-ignore
                '--liquid-button-fill-width': '-1%',
                '--liquid-button-fill-height': fillHeight,
                '--liquid-button-delay': '0s',
                background:
                    'linear-gradient(var(--liquid-button-color) 0 0) no-repeat calc(200% - var(--liquid-button-fill-width, -1%)) 100% / 200% var(--liquid-button-fill-height, 0.2em)',
                backgroundColor: 'var(--liquid-button-background-color)',
                transition: `background ${delay} var(--liquid-button-delay, 0s), color ${delay} ${delay}, background-position ${delay} calc(${delay} - var(--liquid-button-delay, 0s))`,
            } as React.CSSProperties}
            {...props}
        />
    );
}

export { LiquidButton, type LiquidButtonProps };
