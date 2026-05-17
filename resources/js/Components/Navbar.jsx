import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, Heart, Settings, ChevronDown } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Navbar() {
    const { url, props } = usePage();
    const isHome = url === '/';
    const user = props.auth?.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`absolute top-0 w-full z-50 px-8 py-6 ${isHome ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md border-b border-gray-100'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img src="/ElevateBlue.png" alt="Elevate" className="h-24 w-auto object-contain scale-125 origin-left" />
                </Link>
                
                {/* Center Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="/properties" className={`${url.startsWith('/properties') ? 'text-gray-900' : 'hover:text-gray-900'} transition-colors`}>Residences</Link>
                    <Link href="/agents" className={`${url.startsWith('/agents') ? 'text-gray-900' : 'hover:text-gray-900'} transition-colors`}>Agents</Link>
                    <Link href="/blog" className={`${url.startsWith('/blog') ? 'text-gray-900' : 'hover:text-gray-900'} transition-colors`}>Resources</Link>
                    <Link href="/about" className={`${url === '/about' ? 'text-gray-900' : 'hover:text-gray-900'} transition-colors`}>About</Link>
                    <Link href="/contact" className={`${url === '/contact' ? 'text-gray-900' : 'hover:text-gray-900'} transition-colors`}>Contact</Link>
                </div>

                {/* Right Action (Profile Pill & Notifications) */}
                <div className="flex items-center">
                    {user ? (
                        <div className="flex items-center">
                            <NotificationBell />
                            <div className="relative" ref={dropdownRef}>
                            <motion.button 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center bg-white border border-gray-200 text-gray-900 rounded-full p-1.5 shadow-sm pr-4 hover:shadow-md transition-all gap-3"
                            >
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col text-left leading-tight hidden sm:flex">
                                    <span className="text-xs font-semibold text-gray-900">{user.name}</span>
                                    <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{user.role || 'Member'}</span>
                                </div>
                                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} className="text-gray-400">
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                                    >
                                        <div className="p-4 bg-gray-50/80 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                                <LayoutDashboard className="w-4 h-4 text-gray-400" /> Dashboard
                                            </Link>
                                            {user.role === 'client' && (
                                                <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                                    <Heart className="w-4 h-4 text-gray-400" /> Saved Properties
                                                </Link>
                                            )}
                                            <Link href="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-colors">
                                                <Settings className="w-4 h-4 text-gray-400" /> Settings
                                            </Link>
                                        </div>
                                        <div className="p-2 border-t border-gray-100">
                                            <Link href="/logout" method="post" as="button" onClick={() => setDropdownOpen(false)} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors hidden sm:block">
                                Sign In
                            </Link>
                            <Link href="/register" className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
