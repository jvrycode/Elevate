import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { Star, Phone, Award } from 'lucide-react';

function StarRating({ rating }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
            ))}
        </div>
    );
}

export default function AgentsIndex({ agents }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Our Agents | Elevate" />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-4">Meet the Team</p>
                    <h1 className="text-5xl font-medium text-gray-900 mb-4">Our Agents</h1>
                    <p className="text-gray-500 text-lg max-w-xl">Expert real estate professionals dedicated to finding you the perfect property.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, i) => (
                        <motion.div key={agent.id}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                            <Link href={`/agents/${agent.id}`}
                                className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all block">
                                <div className="p-8 text-center">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-500 uppercase mx-auto mb-4 border-4 border-gray-50 group-hover:border-gray-200 transition-colors">
                                        {agent.avatar
                                            ? <img src={agent.avatar} alt={agent.user?.name} className="w-full h-full object-cover" />
                                            : agent.user?.name?.charAt(0)
                                        }
                                    </div>
                                    <h2 className="text-xl font-medium text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">{agent.user?.name}</h2>
                                    <p className="text-gray-500 text-sm mb-4">{agent.agency_name || 'Independent Agent'}</p>
                                    {agent.average_rating > 0 && (
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <StarRating rating={Math.round(agent.average_rating)} />
                                            <span className="text-sm text-gray-500">{agent.average_rating}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-50">
                                        <div><span className="font-medium text-gray-900">{agent.properties_count}</span> Listings</div>
                                        <div><span className="font-medium text-gray-900">{agent.reviews?.length || 0}</span> Reviews</div>
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
