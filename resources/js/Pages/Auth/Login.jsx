import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex bg-white">
            <Head title="Sign In | Elevate" />
            
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative">
                <Link href="/" className="absolute top-12 left-8 sm:left-16 md:left-24 xl:left-32 text-sm text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest font-medium">
                    &larr; Back to Home
                </Link>

                <motion.div 
                    className="w-full max-w-md mx-auto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 leading-tight mb-2">
                        Welcome back.
                    </h2>
                    <p className="text-gray-500 mb-12 font-light">
                        Sign in to access your portfolio and saved listings.
                    </p>
                    
                    <form className="space-y-8" onSubmit={submit}>
                        <div className="space-y-6">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="block w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 transition-colors placeholder-transparent peer"
                                    placeholder="Email address"
                                    required
                                />
                                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gray-900 peer-focus:text-sm font-light pointer-events-none">
                                    Email address
                                </label>
                                {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
                            </div>
                            
                            <div className="relative">
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="block w-full px-0 py-3 border-0 border-b border-gray-200 bg-transparent text-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 transition-colors placeholder-transparent peer"
                                    placeholder="Password"
                                    required
                                />
                                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gray-900 peer-focus:text-sm font-light pointer-events-none">
                                    Password
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 focus:outline-none transition-colors font-medium text-sm disabled:opacity-50"
                            >
                                Sign In
                            </button>
                            
                            <Link href="/register" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-light">
                                Create an account
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                            <a href="/auth/google/redirect" className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Continue with Google
                            </a>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Right Side: Image Cover */}
            <div className="hidden lg:block w-1/2 relative bg-gray-100">
                <img 
                    src="/images/hero.png" 
                    alt="Elevate Architecture" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </div>
    );
}
