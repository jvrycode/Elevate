import { Head, Link } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, BookOpen } from 'lucide-react';

function PostCard({ post, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
            <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-gray-300" />
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium uppercase tracking-widest text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                    </div>
                    <h2 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 uppercase">
                                {post.author?.name?.charAt(0)}
                            </div>
                            {post.author?.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function BlogIndex({ posts }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Resources & Insights | Elevate" />
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <motion.div className="mb-16 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-4">Resources & Insights</p>
                    <h1 className="text-5xl font-medium text-gray-900 mb-4 leading-tight">Real Estate<br />Knowledge Hub</h1>
                    <p className="text-gray-500 text-lg">Expert advice, market insights, and tips to help you navigate the luxury real estate market with confidence.</p>
                </motion.div>

                {/* Grid */}
                {posts.data?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.data.map((post, i) => (
                                <PostCard key={post.id} post={post} index={i} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-2">
                                {posts.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                                            ${!link.url ? 'text-gray-300 cursor-not-allowed' : ''}
                                            ${link.active ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'}
                                        `}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-32">
                        <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No articles yet</h3>
                        <p className="text-gray-500">Check back soon for real estate insights and tips.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
