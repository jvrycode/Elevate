import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function CallToAction() {
    return (
        <section className="relative w-full min-h-[80vh] flex flex-col justify-end overflow-hidden bg-black mt-24">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
                    alt="Luxury Property Exterior" 
                    className="w-full h-full object-cover opacity-40"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 px-4 md:px-8 py-24 md:py-32 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">

                {/* Text Content */}
                <motion.div
                    className="max-w-2xl"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-5xl md:text-7xl font-medium text-white mb-8 leading-[1.1] tracking-tight">
                        Your extraordinary<br />
                        future awaits.
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-lg font-light leading-relaxed">
                        Discover a curated collection of the world's most exceptional properties. We are ready to help you find your next masterpiece.
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                        <Link href="/properties" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-medium transition-colors flex items-center gap-3">
                            Explore Portfolio
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 font-medium transition-colors">
                            Contact a Broker
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                className="relative z-10 border-t border-white/10 mx-4 md:mx-8 px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm max-w-7xl xl:mx-auto w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="font-bold tracking-[0.3em] uppercase text-gray-400">
                    ELEVATE
                </div>
                <div className="font-light">
                    &copy; 2026 Elevate. All rights reserved.
                </div>
            </motion.footer>
        </section>
    );
}
