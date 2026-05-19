import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import PropertyCard from '../../Components/PropertyCard';
import { motion } from 'framer-motion';
import { Phone, Star, MapPin, Award, MessageSquare, CheckCircle } from 'lucide-react';
import { useState } from 'react';

function StarRating({ rating, max = 5 }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
            ))}
        </div>
    );
}

function StarPicker({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button"
                    onClick={() => onChange(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}>
                    <Star className={`w-7 h-7 transition-colors ${n <= (hovered || value) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-300'}`} />
                </button>
            ))}
        </div>
    );
}

export default function AgentShow({ agent, activeListings, soldListings }) {
    const { flash, auth } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        body: '',
    });

    const submitReview = (e) => {
        e.preventDefault();
        post(`/agents/${agent.id}/reviews`, {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${agent.user?.name} | Elevate Agent`} />
            <Navbar />

            <main>
                {/* Hero Section */}
                <div className="bg-gray-50 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                        <motion.div className="flex flex-col md:flex-row items-start md:items-center gap-8"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center text-4xl font-medium text-gray-500 uppercase border-4 border-white shadow-lg">
                                {agent.avatar
                                    ? <img src={agent.avatar} alt={agent.user?.name} className="w-full h-full object-cover" />
                                    : agent.user?.name?.charAt(0)
                                }
                            </div>
                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="text-4xl font-medium text-gray-900 mb-1">{agent.user?.name}</h1>
                                <p className="text-gray-500 text-lg mb-3">{agent.agency_name || 'Independent Agent'}</p>
                                <div className="flex flex-wrap items-center gap-4">
                                    {agent.average_rating > 0 && (
                                        <div className="flex items-center gap-2">
                                            <StarRating rating={Math.round(agent.average_rating)} />
                                            <span className="font-medium text-gray-900">{agent.average_rating}</span>
                                            <span className="text-gray-400 text-sm">({agent.reviews?.length} reviews)</span>
                                        </div>
                                    )}
                                    {agent.phone && (
                                        <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm">
                                            <Phone className="w-4 h-4" /> {agent.phone}
                                        </a>
                                    )}
                                    {agent.license_number && (
                                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                                            <Award className="w-4 h-4" /> License #{agent.license_number}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Stats */}
                            <div className="flex gap-6">
                                {[
                                    { label: 'Active Listings', value: activeListings.length },
                                    { label: 'Sold', value: soldListings.length },
                                    { label: 'Reviews', value: agent.reviews?.length || 0 },
                                ].map(({ label, value }) => (
                                    <div key={label} className="text-center">
                                        <div className="text-3xl font-medium text-gray-900">{value}</div>
                                        <div className="text-sm text-gray-500">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Left: Bio + Contact */}
                        <div className="lg:col-span-1 space-y-6">
                            {agent.bio && (
                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                    <h3 className="font-medium text-gray-900 mb-3">About</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{agent.bio}</p>
                                </div>
                            )}
                            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                <h3 className="font-medium text-gray-900 mb-4">Contact Agent</h3>
                                {agent.phone && (
                                    <a href={`tel:${agent.phone}`}
                                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-4 py-3 font-medium text-sm transition-colors">
                                        <Phone className="w-4 h-4" /> Call {agent.user?.name?.split(' ')[0]}
                                    </a>
                                )}
                                <Link href="/contact"
                                    className="mt-3 w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 rounded-xl px-4 py-3 font-medium text-sm transition-colors">
                                    <MessageSquare className="w-4 h-4" /> Send Message
                                </Link>
                            </div>
                        </div>

                        {/* Right: Listings + Reviews */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* Active Listings */}
                            {activeListings.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Active Listings</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {activeListings.map(property => (
                                            <PropertyCard key={property.id} property={property} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Reviews */}
                            <section>
                                <h2 className="text-2xl font-medium text-gray-900 mb-6">Client Reviews</h2>

                                {flash?.success && (
                                    <div className="mb-6 bg-green-50 text-green-800 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">{flash.success}</span>
                                    </div>
                                )}

                                {agent.reviews?.length > 0 ? (
                                    <div className="space-y-4 mb-8">
                                        {agent.reviews.map(review => (
                                            <motion.div key={review.id}
                                                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 uppercase">
                                                            {review.reviewer?.name?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900 text-sm">{review.reviewer?.name}</div>
                                                            <div className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</div>
                                                        </div>
                                                    </div>
                                                    <StarRating rating={review.rating} />
                                                </div>
                                                <p className="text-gray-600 text-sm">{review.body}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500 mb-8 border border-gray-100">
                                        No reviews yet. Be the first!
                                    </div>
                                )}

                                {/* Write a Review */}
                                {auth?.user && (
                                    <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                                        <h3 className="font-medium text-gray-900 mb-4">Leave a Review</h3>
                                        <form onSubmit={submitReview} className="space-y-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Your Rating</label>
                                                <StarPicker value={data.rating} onChange={(v) => setData('rating', v)} />
                                            </div>
                                            <div>
                                                <textarea
                                                    value={data.body}
                                                    onChange={e => setData('body', e.target.value)}
                                                    placeholder="Share your experience working with this agent... (min. 20 characters)"
                                                    rows={4}
                                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm resize-none"
                                                    required
                                                />
                                                {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
                                            </div>
                                            <button type="submit" disabled={processing}
                                                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors disabled:opacity-50">
                                                {processing ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </section>

                            {/* Sold Properties */}
                            {soldListings.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-medium text-gray-900 mb-6">Past Sales</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {soldListings.map(property => (
                                            <PropertyCard key={property.id} property={property} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
