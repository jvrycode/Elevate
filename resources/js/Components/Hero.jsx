import { motion } from 'framer-motion';

export default function Hero({ featuredProperties = [] }) {
    return (
        <div className="relative h-[90vh] min-h-[600px] w-full flex flex-col justify-center items-center bg-black px-4 md:px-8 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
                    alt="Elevate Luxury Real Estate"
                    className="w-full h-full object-cover opacity-50"
                />
                {/* Gradient Overlay for better contrast and cinematic fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
            </div>

            <div className="max-w-7xl w-full h-full relative z-10 flex flex-col justify-between pt-32 pb-12">
                {/* Main Hero Text */}
                <div className="flex-1 flex flex-col justify-center">
                    <motion.p
                        className="text-white/70 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to the extraordinary
                    </motion.p>
                    <motion.h1
                        className="text-[12vw] md:text-[8vw] leading-[0.9] font-black text-white uppercase tracking-tighter"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Elevate
                    </motion.h1>
                </div>

            </div>
        </div>
    );
}
