import { Head, Link, router, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import PropertyCard, { PropertyCardSkeleton } from '../../Components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

const createPriceIcon = (price, isHovered = false) => L.divIcon({
    className: '',
    html: `
        <div style="
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) ${isHovered ? 'scale(1.2) translateY(-4px)' : 'scale(1)'};
            transform-origin: bottom center;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            filter: ${isHovered 
                ? 'drop-shadow(0 12px 16px rgba(0,0,0,0.3)) drop-shadow(0 4px 6px rgba(0,0,0,0.1))' 
                : 'drop-shadow(0 6px 10px rgba(0,0,0,0.15)) drop-shadow(0 2px 4px rgba(0,0,0,0.05))'};
            z-index: ${isHovered ? 1000 : 1};
            cursor: pointer;
        ">
            <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 1.5C8.43959 1.5 1.5 8.43959 1.5 17C1.5 28.5 17 42.5 17 42.5C17 42.5 32.5 28.5 32.5 17C32.5 8.43959 25.5604 1.5 17 1.5Z" 
                      fill="${isHovered ? '#111827' : '#ffffff'}" 
                      stroke="${isHovered ? '#0f172a' : '#d1d5db'}" 
                      stroke-width="1.5" 
                      stroke-linejoin="round"/>
                <circle cx="17" cy="17" r="6.5" fill="${isHovered ? '#ffffff' : '#111827'}"/>
            </svg>
        </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, -44],
});

function MapBoundsController({ properties }) {
    const map = useMap();
    useEffect(() => {
        if (properties.data.length > 0) {
            const coords = properties.data.filter(p => p.latitude && p.longitude).map(p => [p.latitude, p.longitude]);
            if (coords.length > 0) {
                const bounds = L.latLngBounds(coords);
                map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 14 });
            }
        }
    }, [properties]);
    return null;
}

function MapEventsHandler({ setShowSearchArea }) {
    useMapEvents({
        dragend: () => setShowSearchArea(true),
        zoomend: () => setShowSearchArea(true)
    });
    return null;
}
import { SlidersHorizontal, X, Search, ChevronLeft, ChevronRight, Home, MapPin, RefreshCw } from 'lucide-react';

const PROPERTY_TYPES = ['House', 'Condo', 'Townhouse', 'Apartment', 'Land'];
const BED_OPTIONS = [{ label: 'Any', value: '' }, { label: '1+', value: 1 }, { label: '2+', value: 2 }, { label: '3+', value: 3 }, { label: '4+', value: 4 }];

export default function Index({ properties, filters, savedIds }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSearchArea, setShowSearchArea] = useState(false);
    const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
    const mapRef = useRef(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        const removeStart = router.on('start', () => setIsLoading(true));
        const removeFinish = router.on('finish', () => setIsLoading(false));
        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    // Removed old pseudo-random coordinate generation

    const applyFilters = (newFilters) => {
        const cleaned = Object.fromEntries(
            Object.entries(newFilters).filter(([, v]) => v !== '' && v !== null && v !== undefined)
        );
        router.get('/properties', cleaned, { preserveScroll: true, replace: true });
    };

    const handleChange = (key, value) => {
        const updated = { ...localFilters, [key]: value };
        setLocalFilters(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters(localFilters);
        setSidebarOpen(false);
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get('/properties', {}, { replace: true });
        setSidebarOpen(false);
    };

    const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== null && v !== undefined).length;

    return (
        <div className="min-h-screen bg-white">
            <Head title="Browse Properties" />
            <Navbar />

            {/* Mobile Filter Drawer */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/40 z-40"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setSidebarOpen(false)}
                            />
                            <motion.div
                                className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl overflow-y-auto p-8"
                                initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-medium text-gray-900">Filters</h2>
                                    <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                                </div>
                                <FilterForm
                                    filters={localFilters}
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    onClear={clearFilters}
                                />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {mapOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setMapOpen(false)}
                            />
                            <motion.div
                                className="relative w-full max-w-4xl bg-white shadow-2xl rounded-[2rem] overflow-hidden flex flex-col z-10"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            >
                                <div className="w-full h-[60vh] sm:h-[70vh] relative">
                                    <button
                                        onClick={() => setMapOpen(false)}
                                        className="absolute top-4 right-4 z-[1000] bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all"
                                    >
                                        <X className="w-5 h-5 text-gray-700" />
                                    </button>
                                    {showSearchArea && (
                                        <button
                                            onClick={() => {
                                                if (mapRef.current) {
                                                    const bounds = mapRef.current.getBounds();
                                                    applyFilters({
                                                        ...localFilters,
                                                        bounds_n: bounds.getNorth(),
                                                        bounds_s: bounds.getSouth(),
                                                        bounds_e: bounds.getEast(),
                                                        bounds_w: bounds.getWest(),
                                                    });
                                                    setShowSearchArea(false);
                                                }
                                            }}
                                            className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-white/95 hover:bg-white text-gray-800 font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-md text-xs sm:text-sm transition-all hover:scale-105"
                                        >
                                            <RefreshCw className="w-3.5 h-3.5" />
                                            Search this area
                                        </button>
                                    )}
                                    <MapContainer
                                        center={[40.7128, -74.0060]}
                                        zoom={11}
                                        zoomControl={false}
                                        attributionControl={false}
                                        className="w-full h-full z-0"
                                        style={{ background: '#f8f5f0' }}
                                        ref={mapRef}
                                    >
                                        <MapBoundsController properties={properties} />
                                        <MapEventsHandler setShowSearchArea={setShowSearchArea} />
                                        <TileLayer
                                            attribution='&copy; <a href="https://carto.com">CARTO</a>'
                                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        />
                                        {properties.data.filter(p => p.latitude && p.longitude).map(prop => (
                                            <Marker key={prop.id} position={[prop.latitude, prop.longitude]} icon={createPriceIcon(prop.price, hoveredPropertyId === prop.id)}>
                                                <Popup className="custom-popup" maxWidth={320} minWidth={320}>
                                                    <div className="p-0 flex flex-col group/popup">
                                                        <Link href={`/properties/${prop.slug}`} className="block relative overflow-hidden rounded-t-[14px]">
                                                            <img src={prop.images?.[0]?.image_path || '/images/hero.png'} alt={prop.title} className="w-full h-32 object-cover transition-transform duration-700 group-hover/popup:scale-110" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/popup:opacity-100 transition-opacity duration-500"></div>
                                                            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm capitalize tracking-wide">
                                                                {prop.status || 'For Sale'}
                                                            </div>
                                                        </Link>
                                                        <div className="p-4 bg-white rounded-b-[14px] shadow-lg border-x border-b border-gray-100">
                                                            <Link href={`/properties/${prop.slug}`} className="block">
                                                                <div className="text-gray-900 font-bold text-xl mb-1 tracking-tight">${Number(prop.price).toLocaleString()}</div>
                                                                <div className="font-medium text-sm text-gray-500 mb-3 truncate">{prop.title}</div>
                                                                <div className="flex items-center gap-3 text-gray-900 text-xs font-semibold">
                                                                    <span>{prop.bedrooms} <span className="text-gray-400 font-normal">Beds</span></span>
                                                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                                    <span>{prop.bathrooms} <span className="text-gray-400 font-normal">Baths</span></span>
                                                                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                                    <span>{prop.sqft?.toLocaleString()} <span className="text-gray-400 font-normal">sqft</span></span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>

                                    {/* Carousel Navigation */}
                                    {properties.data.filter(p => p.latitude && p.longitude).length > 2 && (
                                        <>
                                            <button 
                                                onClick={() => { if(carouselRef.current) carouselRef.current.scrollBy({left: -220, behavior: 'smooth'}) }} 
                                                className="absolute bottom-24 left-2 z-[1001] bg-white/95 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white hover:scale-110 transition-all text-gray-700 hidden sm:flex"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => { if(carouselRef.current) carouselRef.current.scrollBy({left: 220, behavior: 'smooth'}) }} 
                                                className="absolute bottom-24 right-2 z-[1001] bg-white/95 p-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-white hover:scale-110 transition-all text-gray-700 hidden sm:flex"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}

                                    {/* Bottom Carousel */}
                                    <div ref={carouselRef} className="absolute bottom-4 left-0 w-full overflow-x-auto px-4 pb-4 pt-2 flex gap-3 snap-x snap-mandatory z-[1000] scrollbar-hide scroll-smooth">
                                        {properties.data.filter(p => p.latitude && p.longitude).map(prop => (
                                            <div
                                                key={prop.id}
                                                className={`snap-center shrink-0 w-52 bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-300 cursor-pointer ${hoveredPropertyId === prop.id ? 'ring-2 ring-gray-900 border-transparent shadow-xl -translate-y-1' : 'border-gray-100 hover:-translate-y-0.5 hover:shadow-lg'}`}
                                                onMouseEnter={() => setHoveredPropertyId(prop.id)}
                                                onMouseLeave={() => setHoveredPropertyId(null)}
                                            >
                                                <Link href={`/properties/${prop.slug}`} className="block relative group/card">
                                                    <div className="relative h-20 overflow-hidden">
                                                        <img src={prop.images?.[0]?.image_path || '/images/hero.png'} alt={prop.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                                                    </div>
                                                    <div className="p-3">
                                                        <div className="text-gray-900 font-bold text-sm mb-0.5 tracking-tight">${Number(prop.price).toLocaleString()}</div>
                                                        <div className="font-medium text-[11px] text-gray-500 truncate mb-1.5">{prop.title}</div>
                                                        <div className="flex items-center gap-2 text-gray-900 text-[10px] font-semibold">
                                                            <span>{prop.bedrooms} <span className="text-gray-400 font-normal">Beds</span></span>
                                                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                            <span>{prop.bathrooms} <span className="text-gray-400 font-normal">Baths</span></span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <main className="w-full pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 xl:px-16">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-8 mb-10">

                        {/* Left: Title + Filters */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl font-medium text-gray-900 mb-1">Discover Properties</h1>
                                    <p className="text-gray-500 text-sm">
                                        {properties.total} {properties.total === 1 ? 'property' : 'properties'} available
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => setMapOpen(true)}
                                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-full px-5 py-2.5 hover:border-gray-400 transition-colors font-medium shadow-sm text-sm"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Location
                                    </button>
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 rounded-full px-5 py-2.5 hover:border-gray-400 transition-colors font-medium shadow-sm text-sm"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        Filters
                                        {activeFilterCount > 0 && (
                                            <span className="ml-1 bg-gray-900 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                                {activeFilterCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {activeFilterCount > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {filters.city && <FilterTag label={`City: ${filters.city}`} onRemove={() => applyFilters({ ...filters, city: '' })} />}
                                    {filters.property_type && <FilterTag label={`Type: ${filters.property_type}`} onRemove={() => applyFilters({ ...filters, property_type: '' })} />}
                                    {filters.beds && <FilterTag label={`${filters.beds}+ Beds`} onRemove={() => applyFilters({ ...filters, beds: '' })} />}
                                    {filters.min_price && <FilterTag label={`Min: $${Number(filters.min_price).toLocaleString()}`} onRemove={() => applyFilters({ ...filters, min_price: '' })} />}
                                    {filters.max_price && <FilterTag label={`Max: $${Number(filters.max_price).toLocaleString()}`} onRemove={() => applyFilters({ ...filters, max_price: '' })} />}
                                    {filters.status && <FilterTag label={`Status: ${filters.status}`} onRemove={() => applyFilters({ ...filters, status: '' })} />}
                                    <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-800 font-medium ml-2">Clear all</button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <PropertyCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : properties.data.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm mt-4">
                            <Home className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                            <p className="text-gray-500 mb-6 text-sm">Try adjusting your filters to see more results.</p>
                            <button onClick={clearFilters} className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.data.map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <PropertyCard property={property} isSaved={savedIds?.includes(property.id)} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {properties.last_page > 1 && !isLoading && (
                        <div className="mt-12 flex justify-center items-center gap-2 pb-12">
                            {properties.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium transition-colors
                                        ${!link.url ? 'text-gray-300 cursor-not-allowed' : ''}
                                        ${link.active ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}



function FilterTag({ label, onRemove }) {
    return (
        <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">
            {label}
            <button onClick={onRemove}><X className="w-3 h-3" /></button>
        </span>
    );
}

function FilterForm({ filters, onChange, onSubmit, onClear }) {
    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={filters.city || ''}
                        onChange={e => onChange('city', e.target.value)}
                        placeholder="e.g. Miami, Austin..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
                <div className="flex flex-wrap gap-2">
                    {PROPERTY_TYPES.map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onChange('property_type', filters.property_type === type ? '' : type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                                ${filters.property_type === type
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
                <div className="flex gap-2">
                    {BED_OPTIONS.map(opt => (
                        <button
                            key={opt.label}
                            type="button"
                            onClick={() => onChange('beds', filters.beds == opt.value ? '' : opt.value)}
                            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors
                                ${filters.beds == opt.value
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="flex gap-3">
                    <input
                        type="number"
                        value={filters.min_price || ''}
                        onChange={e => onChange('min_price', e.target.value)}
                        placeholder="Min $"
                        className="w-1/2 px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                    />
                    <input
                        type="number"
                        value={filters.max_price || ''}
                        onChange={e => onChange('max_price', e.target.value)}
                        placeholder="Max $"
                        className="w-1/2 px-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                    value={filters.status || ''}
                    onChange={e => onChange('status', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                >
                    <option value="">Any Status</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <div className="space-y-3 pt-4">
                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Apply Filters
                </button>
                <button type="button" onClick={onClear} className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    Clear All
                </button>
            </div>
        </form>
    );
}
