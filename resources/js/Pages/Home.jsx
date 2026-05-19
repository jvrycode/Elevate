import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import InfoSection from '../Components/InfoSection';
import CallToAction from '../Components/CallToAction';
import PropertyCard from '../Components/PropertyCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home({ featuredProperties }) {
    // The first property is used in the Hero. Use the next 4 for the grid.
    const gridProperties = featuredProperties.slice(1, 5);

    return (
        <div className="min-h-screen bg-white">
            <Head title="Exceptional Living | Elevate" />
            
            <Navbar forceDark={true} />
            
            <main>
                <Hero featuredProperties={featuredProperties} />
                
                {/* Featured Residences Section */}
                <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-2">Curated Collection</h2>
                            <h3 className="text-4xl md:text-5xl font-medium text-gray-900">Featured Residences</h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden md:block"
                        >
                            <Link href="/properties" className="flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition-colors">
                                View Portfolio <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {gridProperties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                <PropertyCard property={property} />
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-12 text-center md:hidden">
                        <Link href="/properties" className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition-colors">
                            View Portfolio <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                <InfoSection />
                <CallToAction />
            </main>
        </div>
    );
}
