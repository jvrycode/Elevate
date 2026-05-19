import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function AnimatedCounter({ value, duration = 2.5 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView && ref.current) {
            animate(0, value, {
                duration: duration,
                ease: [0.16, 1, 0.3, 1], // Very smooth exponential deceleration
                onUpdate: (latest) => {
                    ref.current.textContent = Math.round(latest);
                }
            });
        }
    }, [inView, value, duration]);

    return <span ref={ref}>0</span>;
}

export default function InfoSection() {
    return (
        <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-white">

            {/* Global Reach / Partners Section */}
            <motion.div
                className="mb-32 md:mb-40 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-gray-400 font-medium text-sm tracking-[0.2em] uppercase mb-12">Global Reach & Partners</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    <div className="flex items-center gap-2"><span className="text-2xl font-serif font-bold italic tracking-wider">Vanguard</span></div>
                    <div className="flex items-center gap-2"><span className="text-2xl font-light tracking-[0.2em] uppercase">Estates</span></div>
                    <div className="flex items-center gap-2"><span className="text-2xl font-bold tracking-tight">OAK & IRON</span></div>
                    <div className="flex items-center gap-2"><span className="text-2xl font-serif">The Collection</span></div>
                    <div className="flex items-center gap-2"><span className="text-xl font-medium tracking-[0.3em] uppercase">Horizon</span></div>
                </div>
            </motion.div>

            {/* About Us Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-4">
                    <motion.h2 
                        className="text-gray-400 text-sm tracking-[0.3em] uppercase font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        About Elevate
                    </motion.h2>
                </div>

                <div className="lg:col-span-8 space-y-12">
                    <motion.p
                        className="text-3xl md:text-5xl text-gray-900 leading-[1.2] font-medium tracking-tight max-w-4xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        We represent the most exceptional properties in the world, providing an unparalleled level of discretion and expertise.
                    </motion.p>

                    <motion.p
                        className="text-gray-500 max-w-2xl text-lg md:text-xl leading-relaxed font-light"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        From sweeping estates to architectural masterpieces, our curation process is uncompromising. At Elevate, we don't just sell real estate—we match visionary individuals with properties that inspire them.
                    </motion.p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 mt-16 border-t border-gray-100 w-full">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Volume</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl text-gray-900 font-light">$<AnimatedCounter value={2} duration={2} /></span>
                                <span className="text-xl text-gray-900 font-light">B+</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Global Reach</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl text-gray-900 font-light"><AnimatedCounter value={12} duration={2} /></span>
                                <span className="text-sm text-gray-500">Countries</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Collection</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl md:text-5xl text-gray-900 font-light"><AnimatedCounter value={150} duration={2} /></span>
                                <span className="text-xl text-gray-900 font-light">+</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                            <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Exclusivity</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl text-gray-900 font-light">Top <AnimatedCounter value={1} duration={2} /></span>
                                <span className="text-xl text-gray-900 font-light">%</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
