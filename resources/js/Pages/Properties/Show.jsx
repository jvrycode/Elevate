import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import { Bed, Bath, Square, MapPin, CheckCircle, Heart, Calendar, X, Star, ChevronRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// ─── Mortgage Calculator ───────────────────────────────────────────────────────
function MortgageCalculator({ price }) {
    const [downPct, setDownPct] = useState(20);
    const [rate, setRate] = useState(6.5);
    const [term, setTerm] = useState(30);

    const loanAmount = price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    const monthlyPayment = monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - loanAmount;

    const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    return (
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mt-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Mortgage Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ({downPct}%)</label>
                    <input type="range" min="5" max="50" step="5" value={downPct} onChange={e => setDownPct(Number(e.target.value))}
                        className="w-full accent-gray-900" />
                    <div className="text-sm text-gray-500 mt-1">{fmt(price * downPct / 100)}</div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate ({rate}%)</label>
                    <input type="range" min="2" max="12" step="0.25" value={rate} onChange={e => setRate(Number(e.target.value))}
                        className="w-full accent-gray-900" />
                    <div className="text-sm text-gray-500 mt-1">{rate}% APR</div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term</label>
                    <div className="flex gap-2 mt-2">
                        {[10, 15, 20, 30].map(y => (
                            <button key={y} onClick={() => setTerm(y)}
                                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors
                                    ${term === y ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'}`}
                            >{y}yr</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-white rounded-2xl p-6 border border-gray-100">
                <div className="text-center">
                    <div className="text-2xl font-medium text-gray-900">{fmt(monthlyPayment)}</div>
                    <div className="text-sm text-gray-500 mt-1">Monthly Payment</div>
                </div>
                <div className="text-center border-x border-gray-100">
                    <div className="text-2xl font-medium text-gray-900">{fmt(totalInterest)}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Interest</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-medium text-gray-900">{fmt(totalCost)}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Cost</div>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-4">* Estimates only. Consult a mortgage advisor for precise figures.</p>
        </div>
    );
}

// ─── Schedule Tour Modal ───────────────────────────────────────────────────────
function TourModal({ property, onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        scheduled_at: '',
        notes: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post(`/properties/${property.id}/appointments`, {
            onSuccess: () => onClose(),
        });
    };

    // Get tomorrow as the minimum date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().slice(0, 16);

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-medium text-gray-900">Schedule a Tour</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-gray-500 mb-6 text-sm">Choose a date and time to visit <span className="font-medium text-gray-900">{property.title}</span>.</p>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
                        <input
                            type="datetime-local"
                            value={data.scheduled_at}
                            min={minDate}
                            onChange={e => setData('scheduled_at', e.target.value)}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        />
                        {errors.scheduled_at && <div className="text-red-500 text-xs mt-1">{errors.scheduled_at}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            placeholder="Any special requests or questions..."
                            rows={3}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-4 py-4 font-medium transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Scheduling...' : 'Confirm Tour Request'}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5, size = 'sm' }) {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <Star key={i} className={`${sizeClass} ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
            ))}
        </div>
    );
}

// ─── Main Show Page ────────────────────────────────────────────────────────────
export default function Show({ property, isSaved: initialSaved, myAppointment }) {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    const [saved, setSaved] = useState(initialSaved);
    const [saving, setSaving] = useState(false);
    const [tourModalOpen, setTourModalOpen] = useState(false);
    const [activeImg, setActiveImg] = useState(null);

    const { flash } = usePage().props;
    const primaryImage = property.images?.find(img => img.is_primary)?.image_path || '/images/hero.png';
    const galleryImages = property.images?.filter(img => !img.is_primary).slice(0, 3) || [];

    const displayImg = activeImg || primaryImage;

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submitInquiry = (e) => {
        e.preventDefault();
        post(`/properties/${property.id}/inquire`, { onSuccess: () => reset() });
    };

    const toggleSave = async () => {
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
                router.visit('/login');
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title={property.title} />

            <AnimatePresence>
                {tourModalOpen && <TourModal property={property} onClose={() => setTourModalOpen(false)} />}
            </AnimatePresence>

            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
                <div className="relative h-20"><Navbar /></div>
            </div>

            <main>
                {/* Image Gallery */}
                <div className={`w-full h-[60vh] grid gap-2 bg-gray-100 p-2 ${
                    galleryImages.length > 0 ? 'grid-cols-4' : 'grid-cols-1'
                }`}>
                    <div className={`h-full overflow-hidden relative cursor-pointer ${
                        galleryImages.length > 0 ? 'col-span-4 md:col-span-2 rounded-l-2xl' : 'col-span-1 rounded-2xl'
                    }`}
                        onClick={() => setActiveImg(null)}>
                        <img src={displayImg} alt="Main View" className="w-full h-full object-cover transition-all duration-500" />
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-medium text-gray-900 uppercase tracking-wider text-sm shadow-sm">
                            {property.status}
                        </div>
                        {/* Save heart on main image */}
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleSave(); }}
                            className={`absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 transition-all
                                ${saved ? 'bg-red-500/90 text-white' : 'bg-white/20 text-white hover:bg-white/40'}
                                ${saving ? 'scale-90 opacity-70' : 'hover:scale-110'}
                            `}
                        >
                            <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                    {/* Right gallery - only render if we have extra images */}
                    {galleryImages.length > 0 && (
                        <div className={`hidden md:grid col-span-2 gap-2 h-full ${
                            galleryImages.length === 1 ? 'grid-rows-1 grid-cols-1' :
                            galleryImages.length === 2 ? 'grid-rows-2 grid-cols-1' :
                            'grid-rows-2 grid-cols-2'
                        }`}>
                            {galleryImages.map((img, i) => (
                                <div key={i}
                                    onClick={() => setActiveImg(img.image_path)}
                                    className={`overflow-hidden cursor-pointer relative
                                        ${galleryImages.length <= 2 && i === 0 ? 'rounded-tr-2xl' : ''}
                                        ${galleryImages.length <= 2 && i === galleryImages.length - 1 ? 'rounded-br-2xl' : ''}
                                        ${galleryImages.length === 3 && i === 1 ? 'rounded-tr-2xl' : ''}
                                        ${galleryImages.length === 3 && i === 2 ? 'rounded-br-2xl' : ''}
                                    `}>
                                    <img src={img.image_path} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:brightness-90 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Left Column */}
                        <div className="lg:col-span-2">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4 leading-tight">{property.title}</h1>

                                <div className="flex items-center text-gray-500 mb-8">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    <span className="text-lg">{property.address}, {property.city}, {property.state} {property.zip}</span>
                                </div>

                                <div className="flex flex-wrap items-center gap-8 py-8 border-y border-gray-100 mb-12">
                                    <div className="flex flex-col">
                                        <span className="text-gray-500 text-sm mb-1 uppercase tracking-wider">Price</span>
                                        <span className="text-3xl font-medium text-gray-900">{formatter.format(property.price)}</span>
                                    </div>
                                    <div className="w-px h-12 bg-gray-200 hidden sm:block" />
                                    {[
                                        { icon: Bed, value: property.bedrooms, label: 'Beds' },
                                        { icon: Bath, value: property.bathrooms, label: 'Baths' },
                                        { icon: Square, value: property.sqft, label: 'SqFt' },
                                    ].map(({ icon: Icon, value, label }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <div className="bg-gray-50 p-3 rounded-full"><Icon className="w-6 h-6 text-gray-700" /></div>
                                            <div>
                                                <div className="font-medium text-gray-900 text-xl">{value}</div>
                                                <div className="text-sm text-gray-500">{label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-2xl font-medium text-gray-900 mb-6">About this Property</h2>
                                <div className="prose prose-lg text-gray-600 max-w-none">
                                    {property.description.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>

                                {/* Mortgage Calculator */}
                                <MortgageCalculator price={Number(property.price)} />

                                {/* Agent Reviews Section */}
                                {property.agent?.reviews?.length > 0 && (
                                    <div className="mt-12">
                                        <h2 className="text-2xl font-medium text-gray-900 mb-6">Agent Reviews</h2>
                                        <div className="space-y-4">
                                            {property.agent.reviews.slice(0, 3).map(review => (
                                                <div key={review.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{review.reviewer?.name}</div>
                                                            <div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                                                        </div>
                                                        <StarRating rating={review.rating} />
                                                    </div>
                                                    <p className="text-gray-600">{review.body}</p>
                                                </div>
                                            ))}
                                            {property.agent?.reviews?.length > 3 && (
                                                <Link href={`/agents/${property.agent.id}`} className="text-gray-900 font-medium hover:underline flex items-center gap-1">
                                                    View all {property.agent.reviews.length} reviews <ChevronRight className="w-4 h-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <motion.div
                                className="bg-gray-50 rounded-3xl p-8 sticky top-28 border border-gray-100 shadow-sm space-y-6"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                {/* Agent Info */}
                                {property.agent?.user && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Listed By</h3>
                                        <Link href={`/agents/${property.agent.id}`} className="flex items-center gap-4 group">
                                            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-medium uppercase overflow-hidden flex-shrink-0">
                                                {property.agent.avatar
                                                    ? <img src={property.agent.avatar} alt="" className="w-full h-full object-cover" />
                                                    : property.agent.user.name.charAt(0)
                                                }
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">{property.agent.user.name}</div>
                                                <div className="text-gray-500 text-sm">{property.agent.agency_name || 'Independent Agent'}</div>
                                                {property.agent.average_rating > 0 && (
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <StarRating rating={Math.round(property.agent.average_rating)} />
                                                        <span className="text-xs text-gray-500 ml-1">{property.agent.average_rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                        {property.agent.phone && (
                                            <a href={`tel:${property.agent.phone}`} className="mt-3 flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
                                                <Phone className="w-4 h-4" /> {property.agent.phone}
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Success Flash */}
                                {flash?.success && (
                                    <div className="bg-green-50 text-green-800 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium text-sm">{flash.success}</span>
                                    </div>
                                )}

                                {/* Tour Status */}
                                {myAppointment ? (
                                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                        <div className="flex items-center gap-2 text-blue-800 font-medium mb-1">
                                            <Calendar className="w-4 h-4" />
                                            Tour Requested
                                        </div>
                                        <div className="text-sm text-blue-700">
                                            {new Date(myAppointment.scheduled_at).toLocaleDateString('en-US', {
                                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </div>
                                        <div className="text-xs text-blue-600 mt-1 capitalize">Status: {myAppointment.status}</div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setTourModalOpen(true)}
                                        className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-4 py-4 font-medium transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Schedule a Tour
                                    </button>
                                )}

                                {/* Inquiry Form */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Send a Message</h3>
                                    <form className="space-y-3" onSubmit={submitInquiry}>
                                        <input
                                            type="text" placeholder="Your Name" value={data.name}
                                            onChange={e => setData('name', e.target.value)} required
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                                        />
                                        <input
                                            type="email" placeholder="Your Email" value={data.email}
                                            onChange={e => setData('email', e.target.value)} required
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                                        />
                                        <textarea
                                            placeholder="I am interested in this property..." rows="3"
                                            value={data.message} onChange={e => setData('message', e.target.value)} required
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                                        />
                                        <button
                                            type="submit" disabled={processing}
                                            className="w-full bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 rounded-xl px-4 py-3 font-medium transition-colors disabled:opacity-50 text-sm"
                                        >
                                            {processing ? 'Sending...' : 'Request Information'}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
