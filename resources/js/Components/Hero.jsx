import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Hero({ featuredProperties = [] }) {
    const featured = featuredProperties.length > 0 ? featuredProperties[0] : null;
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

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

                {/* Featured Property Glass Card */}
                {featured && (
                    <motion.div 
                        className="w-full max-w-lg self-end mt-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link 
                            href={`/properties/${featured.slug}`}
                            className="block backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Featured Residence
                                </div>
                                <div className="text-white font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2 line-clamp-1">
                                {featured.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {featured.location || 'Exclusive Location'}
                                </div>
                                <div className="text-xl font-medium text-white">
                                    {formatter.format(featured.price)}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
