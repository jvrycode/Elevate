import { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, Calendar, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get('/api/notifications');
            setNotifications(res.data.notifications);
            setUnreadCount(res.data.unread_count);
        } catch (e) {
            console.error('Failed to fetch notifications', e);
        }
    };

    useEffect(() => {
        fetchNotifications();
        
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = async (id) => {
        await axios.patch(`/api/notifications/${id}/read`);
        fetchNotifications();
    };

    const markAllAsRead = async () => {
        await axios.patch('/api/notifications/read-all');
        fetchNotifications();
    };

    const deleteNotification = async (id) => {
        await axios.delete(`/api/notifications/${id}`);
        fetchNotifications();
    };

    return (
        <div className="relative mr-4 flex items-center" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[100] origin-top-right flex flex-col max-h-[400px]"
                    >
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="overflow-y-auto flex-1 p-2 space-y-1 bg-white">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 text-sm">
                                    <Bell className="w-8 h-8 mx-auto text-gray-200 mb-3" />
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map(notif => {
                                    const isUnread = notif.read_at === null;
                                    const Icon = notif.data.type === 'tour_request' ? Calendar : Mail;
                                    return (
                                        <div key={notif.id} className={`p-3 rounded-xl flex gap-3 group transition-colors ${isUnread ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
                                            <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUnread ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => isUnread && markAsRead(notif.id)}>
                                                <p className={`text-sm ${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                    {notif.data.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                                                    {notif.data.message}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                                                    {new Date(notif.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {isUnread && (
                                                    <button onClick={() => markAsRead(notif.id)} className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors" title="Mark as read">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button onClick={() => deleteNotification(notif.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
