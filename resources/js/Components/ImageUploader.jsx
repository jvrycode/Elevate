import { useRef, useState } from 'react';
import { Upload, X, ImagePlus } from 'lucide-react';

export default function ImageUploader({ existingImages = [], onFilesChange, onRemoveExisting }) {
    const inputRef = useRef();
    const [previews, setPreviews] = useState([]);
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (!fileArr.length) return;
        const newPreviews = fileArr.map(f => ({ file: f, url: URL.createObjectURL(f) }));
        const updated = [...previews, ...newPreviews];
        setPreviews(updated);
        onFilesChange(updated.map(p => p.file));
    };

    const removePreview = (index) => {
        const updated = previews.filter((_, i) => i !== index);
        setPreviews(updated);
        onFilesChange(updated.map(p => p.file));
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="space-y-4">
            {/* Existing images */}
            {existingImages.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Current Images</p>
                    <div className="flex flex-wrap gap-3">
                        {existingImages.map(img => (
                            <div key={img.id} className="relative group w-24 h-24">
                                <img src={img.image_path} alt="" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                                {!!img.is_primary && (
                                    <span className="absolute top-1 left-1 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                                        Primary
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => onRemoveExisting(img.id)}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Drop zone */}
            <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors
                    ${dragging ? 'border-gray-400 bg-gray-100' : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'}`}
                onClick={() => inputRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => handleFiles(e.target.files)}
                />
                <ImagePlus className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">Drop images here or <span className="text-gray-900 underline">browse</span></p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — up to 5MB each. First image becomes the primary.</p>
            </div>

            {/* New previews */}
            {previews.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">New Images ({previews.length})</p>
                    <div className="flex flex-wrap gap-3">
                        {previews.map((preview, i) => (
                            <div key={i} className="relative group w-24 h-24">
                                <img src={preview.url} alt="" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                                {i === 0 && existingImages.length === 0 && (
                                    <span className="absolute top-1 left-1 bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded-full font-medium">
                                        Primary
                                    </span>
                                )}
                                <button
                                    type="button"
                                    onClick={() => removePreview(i)}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
