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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Executive 1 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" alt="Arthur Vance" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Arthur Vance</h4>
                            <p className="text-sm text-gray-500 font-light">Chief Executive Officer</p>
                        </motion.div>
                        
                        {/* Executive 2 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop" alt="Clara Hayes" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Clara Hayes</h4>
                            <p className="text-sm text-gray-500 font-light">Chief Operating Officer</p>
                        </motion.div>

                        {/* Executive 3 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" alt="Julian Thorne" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Julian Thorne</h4>
                            <p className="text-sm text-gray-500 font-light">Chief Architect</p>
                        </motion.div>

                        {/* Executive 4 */}
                        <motion.div className="group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" alt="Isabella Rossi" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900">Isabella Rossi</h4>
                            <p className="text-sm text-gray-500 font-light">Head of Global Strategy</p>
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
