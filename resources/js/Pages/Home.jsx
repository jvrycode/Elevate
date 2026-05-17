import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import InfoSection from '../Components/InfoSection';
import CallToAction from '../Components/CallToAction';

export default function Home({ featuredProperties }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Exceptional Living" />
            
            <Navbar />
            
            <main>
                <Hero featuredProperties={featuredProperties} />
                <InfoSection />
                <CallToAction />
            </main>
        </div>
    );
}
