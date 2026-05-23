import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, LayoutDashboard, Heart, Settings, ChevronDown, Menu, X } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default function Navbar({ forceDark = false }) {
    const { url, props } = usePage();
    const isHome = url === '/';
    const user = props.auth?.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isDarkBackground = (isHome || forceDark) && !scrolled;
    const textColor = isDarkBackground ? 'text-white' : 'text-gray-900';
    const linkColor = isDarkBackground ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-gray-900';

    return (
        <div className={`fixed w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${scrolled ? 'top-4 md:top-6 px-4' : 'top-0 px-4 md:px-8'}`}>
            <nav className={`w-full max-w-7xl flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border rounded-full ${
                scrolled 
                    ? 'bg-white/90 backdrop-blur-md border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6 md:px-8 py-3' 
                    : 'bg-transparent border-transparent shadow-none py-5 md:py-6 px-4 md:px-6'
            }`}>
                {/* Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center">
                        <span className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-colors ${textColor}`}>
                            Elevate
                        </span>
                    </Link>
                </div>

                {/* Center Links */}
                <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
                    <Link href="/properties" className={`transition-colors ${url.startsWith('/properties') ? textColor : linkColor}`}>Residences</Link>
                    <Link href="/agents" className={`transition-colors ${url.startsWith('/agents') ? textColor : linkColor}`}>Agents</Link>
                    <Link href="/about" className={`transition-colors ${url === '/about' ? textColor : linkColor}`}>About</Link>
                    <Link href="/contact" className={`transition-colors ${url === '/contact' ? textColor : linkColor}`}>Contact</Link>
                </div>

                {/* Right Action (Profile Pill & Notifications) */}
                <div className="flex-1 flex justify-end items-center">
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
                            <Link href="/login" className={`text-sm font-medium transition-colors hidden sm:block ${isDarkBackground ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-600'}`}>
                                Sign In
                            </Link>
                            <Link href="/register" className={`text-sm font-medium px-6 py-2.5 rounded-full transition-colors hidden sm:block ${isDarkBackground ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                                Get Started
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button 
                        className={`md:hidden ml-4 p-1 rounded-full transition-colors ${textColor}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[110%] left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden z-50 md:hidden"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            <Link href="/properties" className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>Residences</Link>
                            <Link href="/agents" className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>Agents</Link>
                            <Link href="/about" className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>About</Link>
                            <Link href="/contact" className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                            
                            {!user && (
                                <div className="mt-2 pt-4 border-t border-gray-100 flex flex-col gap-2">
                                    <Link href="/login" className="px-4 py-3 text-sm font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                                    <Link href="/register" className="px-4 py-3 text-sm font-medium text-center text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
