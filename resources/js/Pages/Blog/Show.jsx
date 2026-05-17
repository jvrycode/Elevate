import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Star, CheckCircle, BookOpen } from 'lucide-react';

function StarPicker({ value, onChange }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(n => (
                <button key={n} type="button" onClick={() => onChange(n)}>
                    <Star className={`w-6 h-6 transition-colors ${n <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-300'}`} />
                </button>
            ))}
        </div>
    );
}

export default function BlogShow({ post, related }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${post.title} | Elevate Blog`} />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main>
                {/* Hero */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Resources
                        </Link>
                        <span className="text-xs font-medium uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mt-4 mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium uppercase">
                                    {post.author?.name?.charAt(0)}
                                </div>
                                {post.author?.name}
                            </div>
                            <span className="text-gray-200">•</span>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                        <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100">
                            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <motion.div
                        className="prose prose-lg prose-gray max-w-none"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                        dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br/>') }}
                    />

                    {/* Related Posts */}
                    {related?.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-gray-100">
                            <h2 className="text-2xl font-medium text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {related.map(rel => (
                                    <Link key={rel.id} href={`/blog/${rel.slug}`}
                                        className="group block bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">{rel.category}</span>
                                        <h4 className="font-medium text-gray-900 mt-2 line-clamp-2 group-hover:text-gray-600 transition-colors">{rel.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
