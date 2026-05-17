import { Link, router } from '@inertiajs/react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PropertyCard({ property, isSaved: initialSaved = false }) {
    const [saved, setSaved] = useState(initialSaved);
    const [saving, setSaving] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = property.images?.length > 0 ? property.images : (property.primary_image ? [property.primary_image] : [{ image_path: '/images/hero.png' }]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const toggleSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (saving) return;
        setSaving(true);
        try {
            const res = await fetch(`/properties/${property.id}/save`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json();
                setSaved(data.saved);
            } else if (res.status === 401) {
                // Not logged in — redirect to login
                router.visit('/login');
            }
        } finally {
            setSaving(false);
        }
    };

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <Link
            href={`/properties/${property.slug}`}
            className="group block transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 group/carousel">
                <img
                    src={images[currentIndex].image_path}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white transition-all text-gray-900 z-10"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 hover:bg-white transition-all text-gray-900 z-10"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.map((_, idx) => (
                                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
                            ))}
                        </div>
                    </>
                )}

                {/* Status Badge */}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium px-4 py-2 rounded-full uppercase tracking-widest text-white shadow-sm">
                    {property.status}
                </div>

                {/* Favorite Heart Button */}
                <button
                    onClick={toggleSave}
                    disabled={saving}
                    aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
                    className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center
                        backdrop-blur-md border border-white/30 transition-all duration-200
                        ${saved
                            ? 'bg-red-500/90 text-white'
                            : 'bg-white/20 text-white hover:bg-white/40'
                        }
                        ${saving ? 'scale-90 opacity-70' : 'hover:scale-110'}
                    `}
                >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Text Content */}
            <div className="px-1 mt-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-1 mb-1">
                    {property.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-1 font-light">
                    {property.city}, {property.state}
                </p>

                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                    <div className="text-lg font-medium text-gray-900">
                        {formatter.format(property.price)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs tracking-wider uppercase">
                        <span>{property.bedrooms} BD</span>
                        <span className="text-gray-300">|</span>
                        <span>{property.bathrooms} BA</span>
                        <span className="text-gray-300">|</span>
                        <span>{property.sqft} SQFT</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function PropertyCardSkeleton() {
    return (
        <div className="animate-pulse block">
            <div className="aspect-[3/4] rounded-[2rem] bg-gray-200 mb-6"></div>
            <div className="px-1 mt-4">
                <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-full w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
            </div>
        </div>
    );
}
