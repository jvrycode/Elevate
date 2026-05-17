import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { useState } from 'react';
import { User, Bell, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsIndex({ user }) {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile Information', icon: User },
        { id: 'preferences', label: 'Notification Preferences', icon: Bell },
        { id: 'security', label: 'Security & Password', icon: Lock },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Settings" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="mb-10">
                    <h1 className="text-3xl font-medium text-gray-900">Account Settings</h1>
                    <p className="text-gray-500 mt-2">Manage your personal information, security, and app preferences.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <nav className="flex flex-col space-y-2">
                            {tabs.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all text-left
                                            ${isActive ? 'bg-white text-gray-900 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}
                                        `}
                                    >
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 max-w-3xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                            >
                                {activeTab === 'profile' && <ProfileForm user={user} />}
                                {activeTab === 'preferences' && <PreferencesForm user={user} />}
                                {activeTab === 'security' && <SecurityForm user={user} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileForm({ user }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        agent: user.role === 'agent' ? {
            bio: user.agent?.bio || '',
            agency_name: user.agent?.agency_name || '',
            license_number: user.agent?.license_number || '',
        } : null
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/settings/profile');
    };

    return (
        <form onSubmit={submit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                        {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="(555) 123-4567"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                        {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                    </div>
                </div>
            </div>

            {user.role === 'agent' && (
                <div className="pt-6 border-t border-gray-100 mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Agent Information</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                            <textarea value={data.agent.bio} onChange={e => setData('agent', { ...data.agent, bio: e.target.value })}
                                rows="4" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none resize-none" />
                            {errors['agent.bio'] && <div className="text-red-500 text-xs mt-1">{errors['agent.bio']}</div>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage / Agency Name</label>
                                <input type="text" value={data.agent.agency_name} onChange={e => setData('agent', { ...data.agent, agency_name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                                <input type="text" value={data.agent.license_number} onChange={e => setData('agent', { ...data.agent, license_number: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-4 flex items-center gap-4">
                <button disabled={processing} className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                    Save Changes
                </button>
                <AnimatePresence>
                    {recentlySuccessful && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-green-600 flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Saved
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
}

function PreferencesForm({ user }) {
    const defaultPrefs = user.preferences || {};
    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        preferences: {
            tour_reminders: defaultPrefs.tour_reminders ?? true,
            saved_search_alerts: defaultPrefs.saved_search_alerts ?? false,
            message_alerts: defaultPrefs.message_alerts ?? true,
        }
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/settings/preferences');
    };

    const Toggle = ({ label, desc, checked, onChange }) => (
        <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
            <div>
                <p className="font-medium text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <button
                type="button"
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-gray-900' : 'bg-gray-200'}`}
            >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );

    return (
        <form onSubmit={submit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Email & SMS Notifications</h3>
            <div className="space-y-2 mb-8">
                <Toggle
                    label="Tour Reminders"
                    desc="Receive a reminder 24 hours before your scheduled tours."
                    checked={data.preferences.tour_reminders}
                    onChange={(val) => setData('preferences', { ...data.preferences, tour_reminders: val })}
                />
                <Toggle
                    label="Saved Search Alerts"
                    desc="Get notified when new properties match your saved searches."
                    checked={data.preferences.saved_search_alerts}
                    onChange={(val) => setData('preferences', { ...data.preferences, saved_search_alerts: val })}
                />
                <Toggle
                    label="Message Alerts"
                    desc="Receive an email when you get a new message from an agent."
                    checked={data.preferences.message_alerts}
                    onChange={(val) => setData('preferences', { ...data.preferences, message_alerts: val })}
                />
            </div>
            <div className="flex items-center gap-4">
                <button disabled={processing} className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                    Update Preferences
                </button>
                <AnimatePresence>
                    {recentlySuccessful && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-green-600 flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Saved
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </form>
    );
}

function SecurityForm({ user }) {
    const { data, setData, put, processing, errors, recentlySuccessful, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put('/settings/password', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={submit} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Update Password</h3>
                {!user.google_id && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input type="password" value={data.current_password} onChange={e => setData('current_password', e.target.value)}
                            className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                        {errors.current_password && <div className="text-red-500 text-xs mt-1">{errors.current_password}</div>}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                        {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-300 outline-none" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button disabled={processing} className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50">
                        Update Password
                    </button>
                    <AnimatePresence>
                        {recentlySuccessful && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-green-600 flex items-center gap-2 text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4" /> Password Updated
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>

            <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                <h3 className="text-lg font-medium text-red-900 mb-2">Danger Zone</h3>
                <p className="text-red-700 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                <button type="button" className="bg-white text-red-600 border border-red-200 px-6 py-3 rounded-full font-medium hover:bg-red-50 transition-colors">
                    Delete Account
                </button>
            </div>
        </div>
    );
}
