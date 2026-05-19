import { Head, useForm, Link } from '@inertiajs/react';
import Navbar from '../../../Components/Navbar';
import ImageUploader from '../../../Components/ImageUploader';
import { useState } from 'react';

const inputClass = "mt-1 block w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm";

export default function Edit({ property }) {
    const [existingImages, setExistingImages] = useState(property.images || []);
    const [removedIds, setRemovedIds] = useState([]);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        title: property.title,
        description: property.description,
        price: property.price,
        address: property.address,
        city: property.city,
        state: property.state,
        zip: property.zip,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.sqft,
        property_type: property.property_type,
        status: property.status,
        images: [],
        remove_images: [],
    });

    const handleFilesChange = (files) => setData('images', files);

    const handleRemoveExisting = (id) => {
        setExistingImages(prev => prev.filter(img => img.id !== id));
        const updated = [...removedIds, id];
        setRemovedIds(updated);
        setData('remove_images', updated);
    };

    const submit = (e) => {
        e.preventDefault();
        post(`/agent/properties/${property.id}`, { forceFormData: true });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Edit: ${property.title}`} />
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">← Back to Dashboard</Link>
                    <h1 className="text-3xl font-medium text-gray-900">Edit Listing</h1>
                    <p className="text-gray-500 mt-1 truncate max-w-lg">{property.title}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <form onSubmit={submit} className="space-y-8">

                        <section>
                            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-6">Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Property Title</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className={inputClass} required />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea rows="5" value={data.description} onChange={e => setData('description', e.target.value)} className={`${inputClass} resize-none`} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
                                    <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className={inputClass} required min="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Listing Status</label>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className={inputClass}>
                                        <option value="available">Available</option>
                                        <option value="pending">Pending</option>
                                        <option value="sold">Sold</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-6">Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                                    <input type="text" value={data.address} onChange={e => setData('address', e.target.value)} className={inputClass} required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input type="text" value={data.city} onChange={e => setData('city', e.target.value)} className={inputClass} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input type="text" value={data.state} onChange={e => setData('state', e.target.value)} className={inputClass} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                        <input type="text" value={data.zip} onChange={e => setData('zip', e.target.value)} className={inputClass} required />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-6">Specifications</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Bedrooms', key: 'bedrooms' },
                                    { label: 'Bathrooms', key: 'bathrooms' },
                                    { label: 'Square Feet', key: 'sqft' },
                                ].map(({ label, key }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                                        <input type="number" value={data[key]} onChange={e => setData(key, e.target.value)} className={inputClass} required min="0" />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Type</label>
                                    <select value={data.property_type} onChange={e => setData('property_type', e.target.value)} className={inputClass}>
                                        {['House', 'Condo', 'Townhouse', 'Apartment', 'Land'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-3 mb-6">Property Images</h3>
                            <ImageUploader
                                existingImages={existingImages}
                                onFilesChange={handleFilesChange}
                                onRemoveExisting={handleRemoveExisting}
                            />
                        </section>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                            <Link href="/dashboard" className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium text-sm">
                                Cancel
                            </Link>
                            <button type="submit" disabled={processing}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 font-medium text-sm transition-colors">
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
