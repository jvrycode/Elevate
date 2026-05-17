import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Hero({ featuredProperties = [] }) {
    return (
        <div className="relative pt-32 pb-16 w-full flex flex-col items-center bg-white px-4 md:px-8">
            <div className="max-w-7xl w-full">
                {/* Top Text Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <motion.h1 
                        className="text-5xl md:text-7xl text-gray-900 leading-tight font-medium max-w-2xl"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Let's bring your dream building to life!
                    </motion.h1>
                    
                    <motion.p 
                        className="text-gray-600 max-w-sm text-sm md:text-base leading-relaxed text-right md:text-left"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    >
                        Our skilled team offers tailored solutions for all your
                        real estate needs. Get the support you require today!
                    </motion.p>
                </div>

                {/* Bottom Image Section */}
                <motion.div 
                    className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                >
                    <img 
                        src="/images/hero.png" 
                        alt="Modern Architecture" 
                        className="w-full h-full object-cover object-center"
                    />

                    {/* Glassmorphism Carousel overlay (Dynamic) */}
                    {featuredProperties.length > 0 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 hidden sm:flex">
                            {featuredProperties.map((property, index) => {
                                const imageUrl = property.primary_image ? property.primary_image.image_path : '/images/thumb1.png';
                                const isActive = index === 1; // Highlight the second one as an example
                                
                                return (
                                    <Link key={property.id} href={`/properties/${property.slug}`}>
                                        <div className={`w-24 h-16 rounded-xl overflow-hidden shadow-sm transition-all cursor-pointer relative group ${isActive ? 'border-2 border-white' : 'opacity-60 hover:opacity-100'}`}>
                                            <img src={imageUrl} className="w-full h-full object-cover" alt={property.title} />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-[10px] font-medium text-center px-1 truncate w-full">{property.title}</span>
                                            </div>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs text-gray-900">▶</div>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                            
                            <Link href="/properties">
                                <div className="w-24 h-16 rounded-xl overflow-hidden shadow-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                                    <span className="text-white text-xs font-medium">View All</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
