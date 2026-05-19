import { useScroll, useTransform, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CustomScrollbar() {
    const { scrollYProgress } = useScroll();
    
    // Map scroll progress smoothly:
    // When progress is 0, thumb is at top: 0%, y: 0%
    // When progress is 1, thumb is at top: 100%, y: -100% (so it doesn't overflow the bottom)
    const topPosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const thumbOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    const [pathname, setPathname] = useState(() =>
        typeof window !== 'undefined' ? window.location.pathname : '/'
    );

    useEffect(() => {
        const handleNav = () => setPathname(window.location.pathname);
        document.addEventListener('inertia:navigate', handleNav);
        return () => document.removeEventListener('inertia:navigate', handleNav);
    }, []);

    // Hide on properties and about pages
    if (pathname.startsWith('/properties') || pathname.startsWith('/about')) {
        return null;
    }

    return (
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] pointer-events-none">
            {/* The Track */}
            <div className="w-[3px] h-32 md:h-48 bg-gray-200/60 rounded-full relative backdrop-blur-sm">
                {/* The Smooth Thumb */}
                <motion.div 
                    className="absolute left-0 w-full h-10 bg-gray-900 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                    style={{ 
                        top: topPosition,
                        y: thumbOffset
                    }}
                />
            </div>
        </div>
    );
}
