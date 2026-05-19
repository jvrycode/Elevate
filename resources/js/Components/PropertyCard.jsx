import { Link, router } from '@inertiajs/react';
import { Heart, ChevronLeft, ChevronRight, Bath, BedDouble, Box } from 'lucide-react';
import { useState } from 'react';

export default function PropertyCard({ property, isSaved: initialSaved = false }) {
    const [saved, setSaved] = useState(initialSaved);
    const [saving, setSaving] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getImages = () => {
        if (property.images && property.images.length > 0) return property.images;
        if (property.primaryImage) return [property.primaryImage];
        if (property.primary_image) return [property.primary_image];
        return [{ image_path: '/images/hero.png' }];
    };

    const images = getImages();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const toggleSave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Optimistic UI update
        setSaved(!saved);
        setSaving(true);

        router.post(`/properties/${property.id}/save`, {}, {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setSaving(false),
            onError: () => {
                // Revert on error
                setSaved(saved);
            }
        });
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
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4 group/carousel">
                <img
                    src={images[currentIndex]?.image_path || '/images/hero.png'}
                    alt={property.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/hero.png'; }}
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

                {/* Top Right Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/95 text-gray-800 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full shadow-sm capitalize">
                        {property.property_type || 'Villa'}
                    </div>
                    <div className="bg-white/95 text-gray-800 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full shadow-sm capitalize">
                        {property.status || 'For Sale'}
                    </div>
                </div>

                {/* Favorite Heart Button */}
                <button
                    onClick={toggleSave}
                    disabled={saving}
                    aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
                    className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center
                        backdrop-blur-md border border-white/30 transition-all duration-200
                        ${saved
                            ? 'bg-red-500/90 text-white'
                            : 'bg-black/30 text-white hover:bg-black/50'
                        }
                        ${saving ? 'scale-90 opacity-70' : 'hover:scale-110'}
                    `}
                >
                    <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Text Content */}
            <div className="px-1 mt-3">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-500 transition-colors line-clamp-1">
                        {property.title}
                    </h3>
                    <div className="text-lg font-bold text-gray-900 ml-4 shrink-0">
                        {formatter.format(property.price)}{property.status?.toLowerCase().includes('rent') && <span className="text-xs font-normal text-gray-500"> / month</span>}
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {property.description || `Experience the perfect blend of elegance and comfort in our ${property.title.toLowerCase()}.`}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BedDouble className="w-4 h-4" />
                        <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Box className="w-4 h-4" />
                        <span>{property.sqft?.toLocaleString() || property.sqft} sq ft</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function PropertyCardSkeleton() {
    return (
        <div className="animate-pulse block">
            <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4"></div>
            <div className="px-1 mt-3">
                <div className="flex justify-between items-start mb-2">
                    <div className="h-5 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                </div>
            </div>
        </div>
    );
}
