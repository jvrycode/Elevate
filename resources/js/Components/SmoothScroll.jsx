import { useEffect } from 'react';
import Lenis from 'lenis';
import CustomScrollbar from './CustomScrollbar';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // Don't apply window smooth scroll on pages that manage their own internal scroll
        if (window.location.pathname.startsWith('/properties')) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <CustomScrollbar />
            {children}
        </>
    );
}
