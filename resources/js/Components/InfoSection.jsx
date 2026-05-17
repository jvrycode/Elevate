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
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto bg-white">
            
            {/* Tools Section */}
            <motion.div 
                className="mb-32 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-gray-500 font-medium text-lg mb-12">Tools & render which we use</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder logos using text for now */}
                    <div className="flex items-center gap-2"><span className="text-2xl font-bold">Lionpaint</span></div>
                    <div className="flex items-center gap-2"><span>✸</span><span className="text-2xl font-semibold">Glassdoer</span></div>
                    <div className="flex items-center gap-2"><span>◮</span><span className="text-2xl font-bold">Artinterior</span></div>
                    <div className="flex items-center gap-2"><span>⸎</span><span className="text-2xl font-bold">3D CAD</span></div>
                    <div className="flex items-center gap-2"><span>◎</span><span className="text-2xl font-bold text-gray-400">Holico Sense</span></div>
                </div>
            </motion.div>

            {/* About Us Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-3">
                    <h2 className="text-gray-400 text-sm tracking-widest uppercase font-medium">About Us</h2>
                </div>
                
                <div className="md:col-span-9 space-y-12">
                    <motion.p 
                        className="text-2xl md:text-3xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        At Elevate, our passionate team of real estate experts and designers is dedicated
                        to turning your visions into breathtaking spaces. Whether you're dreaming
                        of a charming residence or a sleek office environment, we are here to bring
                        your ideas to life.
                    </motion.p>
                    
                    <motion.p 
                        className="text-gray-400 max-w-2xl text-sm leading-relaxed"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        From concept to completion, we blend creativity, functionality, and precision in every project. At
                        Elevate, your space isn't just built — it's thoughtfully crafted to inspire, impress, and endure.
                    </motion.p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-100 w-full max-w-2xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                            <div className="text-xs text-gray-500 mb-2">Established for</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl text-gray-900 font-light"><AnimatedCounter value={10} duration={2} /></span>
                                <span className="text-sm text-gray-500">Years</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                            <div className="text-xs text-gray-500 mb-2">Work across</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl text-gray-900 font-light"><AnimatedCounter value={6} duration={2} /></span>
                                <span className="text-sm text-gray-500">Countries</span>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                            <div className="text-xs text-gray-500 mb-2">Over</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl text-gray-900 font-light"><AnimatedCounter value={20} duration={2} /></span>
                                <span className="text-sm text-gray-500">Projects</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
