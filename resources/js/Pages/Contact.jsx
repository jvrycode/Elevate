import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Contact Us" />
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left Column: Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-medium text-gray-900 leading-tight mb-8">
                            Let's begin the conversation.
                        </h1>
                        <p className="text-gray-500 font-light text-lg mb-16 max-w-md">
                            Whether you're looking to acquire a new residence or list your exclusive property, our team is at your disposal.
                        </p>

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-sm font-medium tracking-widest uppercase text-gray-400 mb-4">Headquarters</h3>
                                <p className="text-gray-900 font-medium">100 Luxury Way, Suite 400<br/>New York, NY 10001</p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-medium tracking-widest uppercase text-gray-400 mb-4">Direct Inquiries</h3>
                                <p className="text-gray-900 font-medium text-lg">hello@elevate.com</p>
                                <p className="text-gray-500">+1 (800) 555-0199</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-gray-50 p-8 md:p-12 rounded-[2rem]"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-transparent border-b border-gray-300 px-0 py-3 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full bg-transparent border-b border-gray-300 px-0 py-3 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Message</label>
                                <textarea 
                                    rows="4"
                                    className="w-full bg-transparent border-b border-gray-300 px-0 py-3 text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-0 transition-colors resize-none"
                                    placeholder="Tell us about your real estate goals..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-gray-900 text-white font-medium py-4 rounded-full hover:bg-gray-800 transition-colors mt-8"
                            >
                                Send Inquiry
                            </button>
                        </form>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
