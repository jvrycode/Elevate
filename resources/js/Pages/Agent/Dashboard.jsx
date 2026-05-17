import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { BarChart3, Eye, MessageSquare, Calendar, Home, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
    { name: 'Week 1', views: 400, inquiries: 24 },
    { name: 'Week 2', views: 300, inquiries: 13 },
    { name: 'Week 3', views: 550, inquiries: 45 },
    { name: 'Week 4', views: 700, inquiries: 60 },
];

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const STATUS_OPTIONS = ['new', 'contacted', 'tour_scheduled', 'closed'];
const STATUS_LABELS = { new: 'New', contacted: 'Contacted', tour_scheduled: 'Tour Scheduled', closed: 'Closed' };
const STATUS_COLORS = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    tour_scheduled: 'bg-purple-50 text-purple-700 border-purple-200',
    closed: 'bg-green-50 text-green-700 border-green-200',
};
const PROP_STATUS_COLORS = {
    available: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    sold: 'bg-gray-100 text-gray-600',
};

function InquiryStatusSelect({ inquiry }) {
    const { data, setData, patch, processing } = useForm({ status: inquiry.status });

    const update = (value) => {
        setData('status', value);
        patch(`/agent/inquiries/${inquiry.id}`, {
            data: { status: value },
            preserveScroll: true,
        });
    };

    return (
        <select
            value={data.status}
            onChange={e => update(e.target.value)}
            disabled={processing}
            className={`text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:outline-none transition-colors ${STATUS_COLORS[data.status]}`}
        >
            {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
        </select>
    );
}

export default function AgentDashboard({ user, analytics, upcomingAppointments }) {
    const agent = user.agent;
    const properties = agent?.properties || [];
    const allInquiries = properties
        .flatMap(p => (p.inquiries || []).map(inq => ({ ...inq, property_title: p.title, property_slug: p.slug })))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Agent Portal" />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-medium text-gray-900">Agent Portal</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {user.name.split(' ')[0]}.</p>
                    </div>
                    <Link href="/logout" method="post" as="button"
                        className="text-gray-600 hover:text-red-600 font-medium transition-colors text-sm">
                        Sign Out
                    </Link>
                </div>

                {/* Analytics Widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: Eye, label: 'Total Views', value: analytics?.total_views ?? 0, color: 'text-blue-500', bg: 'bg-blue-50' },
                        { icon: MessageSquare, label: 'Total Inquiries', value: analytics?.total_inquiries ?? 0, color: 'text-purple-500', bg: 'bg-purple-50' },
                        { icon: Home, label: 'Active Listings', value: analytics?.active_listings ?? 0, color: 'text-green-500', bg: 'bg-green-50' },
                        { icon: Calendar, label: 'Upcoming Tours', value: analytics?.upcoming_tours ?? 0, color: 'text-amber-500', bg: 'bg-amber-50' },
                    ].map(({ icon: Icon, label, value, color, bg }) => (
                        <motion.div key={label}
                            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                            <div className={`inline-flex p-2 rounded-xl ${bg} mb-3`}>
                                <Icon className={`w-5 h-5 ${color}`} />
                            </div>
                            <div className="text-2xl font-medium text-gray-900">{value}</div>
                            <div className="text-sm text-gray-500">{label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Performance Chart */}
                <motion.div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-10" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-500" /> Performance Overview
                    </h2>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                                />
                                <Area type="monotone" dataKey="views" name="Views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="inquiries" name="Inquiries" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorInquiries)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Actions */}
                        <motion.div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
                            <Link href="/agent/properties/create"
                                className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-4 py-3 font-medium transition-colors">
                                + Create New Listing
                            </Link>
                            <Link href={`/agents/${agent?.id}`}
                                className="mt-3 block w-full text-center bg-white border border-gray-200 hover:border-gray-400 text-gray-700 rounded-xl px-4 py-3 font-medium transition-colors text-sm">
                                View My Public Profile
                            </Link>
                        </motion.div>

                        {/* Upcoming Appointments */}
                        <motion.div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-amber-500" /> Upcoming Tours
                            </h2>
                            {upcomingAppointments?.length > 0 ? (
                                <ul className="space-y-3">
                                    {upcomingAppointments.slice(0, 5).map(appt => (
                                        <li key={appt.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                            <div className="font-medium text-gray-900 text-sm line-clamp-1">{appt.property?.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                Client: {appt.user?.name || 'Unknown'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(appt.scheduled_at).toLocaleDateString('en-US', {
                                                    weekday: 'short', month: 'short', day: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                            <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full capitalize
                                                ${appt.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                                                {appt.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500">No upcoming tours scheduled.</p>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Listings Table */}
                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <h2 className="text-2xl font-medium text-gray-900 mb-4">My Listings</h2>
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                {properties.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-100">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-50">
                                            {properties.map(property => (
                                                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900 text-sm">{property.title}</div>
                                                        <div className="text-xs text-gray-500">{property.city}, {property.state}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {formatter.format(property.price)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                                            <Eye className="w-3.5 h-3.5 text-gray-400" /> {property.views ?? 0}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full uppercase ${PROP_STATUS_COLORS[property.status]}`}>
                                                            {property.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                        <Link href={`/properties/${property.slug}`} className="text-gray-500 hover:text-gray-900">View</Link>
                                                        <Link href={`/agent/properties/${property.id}/edit`} className="text-blue-600 hover:text-blue-800">Edit</Link>
                                                        <Link href={`/agent/properties/${property.id}`} method="delete" as="button"
                                                            onClick={() => { if (!confirm('Delete this listing?')) { event.preventDefault(); } }}
                                                            className="text-red-500 hover:text-red-700">Delete</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-10 text-center">
                                        <Home className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-gray-500 mb-4">You don't have any listings yet.</p>
                                        <Link href="/agent/properties/create"
                                            className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                                            Create First Listing
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* Lead Management */}
                        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-2xl font-medium text-gray-900 mb-4">Lead Management</h2>
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                                {allInquiries.length > 0 ? (
                                    <table className="min-w-full divide-y divide-gray-100">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-50">
                                            {allInquiries.map(inquiry => (
                                                <tr key={inquiry.id} className={`hover:bg-gray-50 transition-colors ${inquiry.status === 'new' ? 'font-medium' : ''}`}>
                                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        {new Date(inquiry.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{inquiry.user?.name || inquiry.name}</div>
                                                        <div className="text-xs text-gray-500">{inquiry.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={`/properties/${inquiry.property_slug}`} className="text-sm text-gray-700 hover:text-gray-900 hover:underline line-clamp-1 max-w-[120px] block">
                                                            {inquiry.property_title}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                                        <p className="truncate">{inquiry.message}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <InquiryStatusSelect inquiry={inquiry} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="p-10 text-center">
                                        <MessageSquare className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                                        <p className="text-gray-500">No inquiries yet.</p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>
        </div>
    );
}
