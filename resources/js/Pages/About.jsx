import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="About Us" />
            <Navbar />

            <main className="pt-24 pb-32">
                {/* Manifesto Section */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32">
                    <motion.h1 
                        className="text-5xl md:text-7xl font-medium text-gray-900 leading-tight mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Redefining the standard of luxury living.
                    </motion.h1>
                    <motion.p 
                        className="text-lg md:text-xl text-gray-500 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Elevate was founded on a simple principle: real estate isn't just about transactions, it's about curating a lifestyle. We represent the most exclusive properties and provide an unmatched level of editorial presentation and bespoke service.
                    </motion.p>
                </section>

                {/* Team Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-gray-400 text-sm tracking-widest uppercase font-medium mb-2">The Core Team</h2>
                        <h3 className="text-3xl font-medium text-gray-900">Curators of fine real estate.</h3>
                    </div>

                    <div className="flex justify-center">
                        {/* John Viray - CEO */}
                        <motion.div className="group w-72" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                                <img src="/MeBlack2.png" alt="John Viray" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />

                                {/* Permanent gradient fade at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                                {/* Hover glass overlay */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-6 text-center z-10">
                                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                        <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Chief Executive Officer</p>
                                        <h4 className="text-2xl font-medium text-white mb-6">John Viray</h4>
                                        <div className="w-10 h-px bg-white/40 mx-auto"></div>
                                    </div>
                                </div>

                                {/* Default bottom info */}
                                <div className="absolute bottom-0 left-0 w-full p-5 group-hover:opacity-0 group-hover:translate-y-3 transition-all duration-400 z-20">
                                    <h4 className="text-lg font-medium text-white">John Viray</h4>
                                    <p className="text-sm text-gray-300 font-light">Chief Executive Officer</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mt-32 py-32 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="mb-12">
                            <span className="text-gray-400 text-sm tracking-widest uppercase font-medium">Clientele</span>
                        </div>
                        <motion.h2 
                            className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            "Elevate didn't just find us a house. They understood exactly what kind of architecture we resonated with and delivered a masterpiece."
                        </motion.h2>
                        <p className="text-gray-500 uppercase tracking-widest text-sm font-medium">— The Harrison Family</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
