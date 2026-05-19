import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';

function PostCard({ post, index }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col h-full cursor-pointer"
            onClick={() => router.visit(`/blog/${post.slug}`)}
        >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-300" />
                    </div>
                )}
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-xs font-semibold text-gray-900 uppercase tracking-widest">
                    {post.category}
                </div>
            </div>
            
            <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <h2 className="text-2xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                </h2>
                <p className="text-gray-500 text-base line-clamp-2 mb-6 font-light">
                    {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-xs font-medium text-white uppercase shadow-sm">
                        {post.author?.name?.charAt(0) || 'E'}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{post.author?.name || 'Elevate Editorial'}</span>
                </div>
            </div>
        </motion.article>
    );
}

const NewsletterCTA = () => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-900 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl overflow-hidden relative my-8"
    >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-xl relative z-10 mb-8 md:mb-0">
            <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">
                <TrendingUp className="w-4 h-4" /> Exclusive Access
            </div>
            <h3 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">Elevate Insider</h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">Join our exclusive mailing list to receive off-market luxury listings, weekly elite market analysis, and priority access to new developments.</p>
        </div>
        <div className="w-full md:w-auto relative z-10">
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="bg-white/10 border border-white/20 text-white rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/50 w-full md:w-72 placeholder:text-gray-500" required />
                <button type="submit" className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shadow-xl">
                    Subscribe
                </button>
            </form>
        </div>
    </motion.div>
);

export default function BlogIndex({ posts, filters }) {
    const isFirstPage = posts.current_page === 1;
    const activeCategory = filters?.category || 'All';
    const isAll = activeCategory === 'All';
    const categories = ['All', 'Market Analysis', 'Buying Guides', 'Architecture', 'Neighborhoods', 'Technology'];

    const featuredPost = isFirstPage && isAll && posts.data.length > 0 ? posts.data[0] : null;
    const gridPosts = featuredPost ? posts.data.slice(1) : posts.data;

    const handleFilter = (cat) => {
        const url = cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`;
        router.visit(url, { preserveState: true, preserveScroll: true, only: ['posts', 'filters'] });
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Resources & Insights | Elevate" />
            
            {/* The Navbar needs to be absolute or fixed over the hero image if there is one. The existing Navbar is fixed and transparent initially. */}
            <Navbar forceDark={!!featuredPost} />

            <main>
                {/* Hero / Featured Post */}
                {featuredPost ? (
                    <div className="relative w-full h-[80vh] min-h-[600px] bg-gray-900">
                        <img src={featuredPost.cover_image} alt={featuredPost.title} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                        <div className="absolute bottom-0 w-full">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 md:pb-40">
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full">
                                            {featuredPost.category}
                                        </span>
                                        <span className="text-gray-300 text-sm flex items-center gap-1.5 font-light">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 leading-tight">
                                        {featuredPost.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-2 font-light leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all hover:gap-4 shadow-xl">
                                        Read Full Report <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                                <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">Resources & Insights</p>
                                <h1 className="text-5xl font-medium text-gray-900 mb-4 leading-tight">Real Estate<br />Knowledge Hub</h1>
                                <p className="text-gray-500 text-lg font-light">Expert advice, market insights, and tips to help you navigate the luxury real estate market with confidence.</p>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* Filter Bar */}
                <div className="bg-white border-b border-gray-100 py-6 mb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar pb-2 -mb-2 md:pb-0 md:-mb-0">
                            <div className="inline-flex p-1.5 bg-gray-50/80 border border-gray-100 rounded-full">
                                {categories.map((cat) => {
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilter(cat)}
                                            className={`relative px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300
                                                ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'}
                                            `}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeCategoryIndicator"
                                                    className="absolute inset-0 bg-gray-900 rounded-full shadow-md"
                                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                />
                                            )}
                                            <span className="relative z-10">{cat}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    {gridPosts?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                                {gridPosts.map((post, i) => {
                                    // Inject Newsletter CTA after the first row (3 items) or if there are less than 3 items, at the end
                                    const showCTA = i === 3;
                                    return (
                                        <React.Fragment key={post.id}>
                                            {showCTA && <NewsletterCTA />}
                                            <PostCard post={post} index={i} />
                                        </React.Fragment>
                                    );
                                })}
                                {/* If there were exactly 3 items, inject it at the end */}
                                {gridPosts.length > 0 && gridPosts.length <= 3 && <NewsletterCTA />}
                            </div>

                            {/* Pagination */}
                            {posts.last_page > 1 && (
                                <div className="mt-24 flex justify-center items-center gap-2">
                                    {posts.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                                                ${!link.url ? 'text-gray-300 cursor-not-allowed' : ''}
                                                ${link.active ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                                            `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-32">
                            <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-medium text-gray-900 mb-3">No insights found</h3>
                            <p className="text-gray-500 font-light">We couldn't find any articles in this category. Check back soon!</p>
                            {activeCategory !== 'All' && (
                                <button onClick={() => handleFilter('All')} className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                                    View All Resources
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
