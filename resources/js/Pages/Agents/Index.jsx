import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { Star, Phone, Mail, ChevronRight } from 'lucide-react';

function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/30'}`} />
            ))}
        </div>
    );
}

export default function AgentsIndex({ agents }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Our Agents | Elevate" />
            <Navbar forceDark={true} />

            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" 
                        alt="Elevate Luxury Estate" 
                        className="w-full h-full object-cover scale-105 opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-300 mb-6">The Elevate Roster</p>
                        <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 tracking-tight">Our Agents</h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                            Expert real estate professionals dedicated to finding you the perfect property. Discretion, expertise, and unparalleled service.
                        </p>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {agents.map((agent, i) => (
                        <motion.div 
                            key={agent.id}
                            initial={{ opacity: 0, y: 30 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <Link href={`/agents/${agent.id}`} className="group block h-full">
                                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
                                    {/* Agent Image */}
                                    <img 
                                        src={agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.user?.name)}&size=400&background=random`} 
                                        alt={agent.user?.name} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    
                                    {/* Permanent Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    
                                    {/* Hover Glass Panel Overlay */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-center items-center p-6 text-center">
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
                                            {agent.average_rating > 0 && (
                                                <div className="flex flex-col items-center gap-2 mb-6">
                                                    <StarRating rating={Math.round(agent.average_rating)} />
                                                    <span className="text-sm text-gray-300">{agent.average_rating} ({agent.reviews?.length || 0} Reviews)</span>
                                                </div>
                                            )}
                                            
                                            <div className="flex gap-4 justify-center mb-8">
                                                <div className="text-center">
                                                    <div className="text-2xl font-medium text-white">{agent.properties_count}</div>
                                                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Listings</div>
                                                </div>
                                                <div className="w-px h-8 bg-white/20 self-center"></div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-medium text-white">{agent.sold_count || 0}</div>
                                                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Sold</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium transition-colors">
                                                View Profile <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Default Visible Info (Slides down on hover) */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 transform group-hover:translate-y-8 group-hover:opacity-0 transition-all duration-500 z-20">
                                        <h2 className="text-2xl font-medium text-white mb-1">{agent.user?.name}</h2>
                                        <p className="text-gray-300 text-sm font-light tracking-wide">{agent.agency_name || 'Independent Agent'}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
