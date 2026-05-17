import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import { Heart, Calendar, MessageSquare, ChevronRight, Home } from 'lucide-react';

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function StatusBadge({ status }) {
    const styles = {
        new: 'bg-blue-50 text-blue-700',
        contacted: 'bg-yellow-50 text-yellow-700',
        tour_scheduled: 'bg-purple-50 text-purple-700',
        closed: 'bg-green-50 text-green-700',
    };
    const labels = { new: 'New', contacted: 'Contacted', tour_scheduled: 'Tour Scheduled', closed: 'Closed' };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
            {labels[status] || status}
        </span>
    );
}

function AppointmentStatusBadge({ status }) {
    const styles = {
        requested: 'bg-yellow-50 text-yellow-700',
        confirmed: 'bg-green-50 text-green-700',
        cancelled: 'bg-red-50 text-red-700',
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
            {status}
        </span>
    );
}

export default function Dashboard({ user, savedListings, appointments, inquiries }) {
    const upcoming = appointments?.filter(a => new Date(a.scheduled_at) > new Date() && a.status !== 'cancelled') || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="My Dashboard" />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-10 flex justify-between items-center border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-medium text-gray-900">Welcome back, {user.name.split(' ')[0]}</h1>
                        <p className="text-gray-500 mt-1">Your home search dashboard.</p>
                    </div>
                    <Link href="/logout" method="post" as="button"
                        className="text-gray-600 hover:text-red-600 font-medium transition-colors text-sm">
                        Sign Out
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        { icon: Heart, label: 'Saved', value: savedListings?.length || 0, color: 'text-red-500' },
                        { icon: Calendar, label: 'Tours', value: upcoming.length, color: 'text-blue-500' },
                        { icon: MessageSquare, label: 'Inquiries', value: inquiries?.length || 0, color: 'text-purple-500' },
                    ].map(({ icon: Icon, label, value, color }) => (
                        <motion.div key={label}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
                            <div className="text-2xl font-medium text-gray-900">{value}</div>
                            <div className="text-sm text-gray-500">{label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Saved Properties */}
                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-medium text-gray-900">Saved Properties</h2>
                                <Link href="/properties" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">
                                    Browse more <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            {savedListings?.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {savedListings.map(property => (
                                        <Link key={property.id} href={`/properties/${property.slug}`}
                                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                                            <div className="h-40 overflow-hidden">
                                                <img
                                                    src={property.primary_image?.image_path || '/images/hero.png'}
                                                    alt={property.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 line-clamp-1">{property.title}</h4>
                                                <p className="text-sm text-gray-500">{property.city}, {property.state}</p>
                                                <p className="text-gray-900 font-medium mt-2">{formatter.format(property.price)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
                                    <Heart className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                    <p className="text-gray-500">You haven't saved any properties yet.</p>
                                    <Link href="/properties" className="mt-4 inline-block bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                                        Browse Properties
                                    </Link>
                                </div>
                            )}
                        </motion.section>

                        {/* Inquiries */}
                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-2xl font-medium text-gray-900 mb-4">My Inquiries</h2>
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                {inquiries?.length > 0 ? (
                                    <ul className="divide-y divide-gray-50">
                                        {inquiries.map(inquiry => (
                                            <li key={inquiry.id} className="p-5 hover:bg-gray-50 transition-colors">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="min-w-0">
                                                        <Link href={inquiry.property ? `/properties/${inquiry.property.slug}` : '#'}
                                                            className="font-medium text-gray-900 hover:text-gray-600 line-clamp-1">
                                                            {inquiry.property?.title || 'Unknown Property'}
                                                        </Link>
                                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1 italic">"{inquiry.message}"</p>
                                                        <p className="text-xs text-gray-400 mt-1">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                    <StatusBadge status={inquiry.status} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-10 text-center">
                                        <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-gray-500">You haven't made any inquiries yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Upcoming Tours */}
                        <motion.div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-500" /> Upcoming Tours
                            </h3>
                            {upcoming.length > 0 ? (
                                <ul className="space-y-3">
                                    {upcoming.map(appt => (
                                        <li key={appt.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
                                            <Link href={`/properties/${appt.property?.slug}`}
                                                className="font-medium text-gray-900 text-sm hover:text-gray-600 line-clamp-1">
                                                {appt.property?.title}
                                            </Link>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(appt.scheduled_at).toLocaleDateString('en-US', {
                                                    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                            {appt.agent?.user && (
                                                <div className="text-xs text-gray-400 mt-1">Agent: {appt.agent.user.name}</div>
                                            )}
                                            <div className="mt-2"><AppointmentStatusBadge status={appt.status} /></div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500">No upcoming tours.</p>
                                    <Link href="/properties" className="mt-3 inline-block text-xs font-medium text-gray-900 hover:underline">
                                        Find a property to tour →
                                    </Link>
                                </div>
                            )}
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link href="/properties"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900">
                                    <Home className="w-4 h-4" /> Browse Properties
                                </Link>
                                <Link href="/agents"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900">
                                    <MessageSquare className="w-4 h-4" /> Find an Agent
                                </Link>
                                <Link href="/blog"
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900">
                                    <ChevronRight className="w-4 h-4" /> Resources & Blog
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
