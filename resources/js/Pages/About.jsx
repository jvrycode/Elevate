import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="About Us" />
            
            {/* Navbar Area */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20">
                    <Navbar />
                </div>
            </div>

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Agent 1 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="James Sterling" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">James Sterling</h4>
                            <p className="text-sm text-gray-500 font-light">Founder & Principal</p>
                        </motion.div>
                        
                        {/* Agent 2 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Elena Rostova" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Elena Rostova</h4>
                            <p className="text-sm text-gray-500 font-light">Head of Acquisitions</p>
                        </motion.div>

                        {/* Agent 3 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" alt="Michael Chen" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Michael Chen</h4>
                            <p className="text-sm text-gray-500 font-light">Luxury Specialist</p>
                        </motion.div>

                        {/* Agent 4 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" alt="Sarah Jenkins" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Sarah Jenkins</h4>
                            <p className="text-sm text-gray-500 font-light">Client Relations</p>
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
