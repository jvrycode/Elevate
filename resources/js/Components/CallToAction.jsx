import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CallToAction() {
    return (
        <section className="relative w-full min-h-[70vh] flex flex-col justify-end overflow-hidden">
            {/* Background Image */}
            <motion.div 
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img 
                    src="/images/footer.png" 
                    alt="Luxury Pool View" 
                    className="w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white to-transparent"></div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 px-8 py-16 md:px-16 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-12">
                
                {/* Text Content */}
                <motion.div 
                    className="max-w-xl"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight drop-shadow-md">
                        Your perfect<br />
                        home is ready.
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-md drop-shadow-sm">
                        Whether you're browsing our collection or planning a custom build, we're here to turn your vision into reality.
                    </p>
                    <button className="bg-white/90 hover:bg-white text-gray-900 px-8 py-4 rounded-full font-medium transition-colors flex items-center gap-3">
                        Get in Touch
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer 
                className="relative z-10 mt-12 px-8 py-6 flex justify-between items-center text-white/80 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <div className="font-medium tracking-widest uppercase">
                    ELEVATE
                </div>
                <div>
                    &copy; 2026 Elevate. All rights reserved.
                </div>
            </motion.footer>
        </section>
    );
}
