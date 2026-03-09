"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Plus, Minus, Image as ImageIcon } from "lucide-react";

export default function TourForm({ initialData, isEdit }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        destination: initialData?.destination || "",
        description: initialData?.description || "",
        price: initialData?.price || "",
        originalPrice: initialData?.originalPrice || "",
        duration: initialData?.duration || "",
        images: initialData?.images || [""],
        featured: initialData?.featured || false,
        startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
        availableSeats: initialData?.availableSeats || 20,
        badge: initialData?.badge || "",
        badgeColor: initialData?.badgeColor || "bg-blue-600",
        highlights: initialData?.highlights?.join(", ") || "",
        inclusions: initialData?.inclusions?.join(", ") || "",
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ""] }));
    };

    const removeImageField = (index) => {
        if (formData.images.length === 1) return;
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const handleFileUpload = async (index, file) => {
        if (!file) return;
        setUploading(true);

        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadFormData,
            });

            const data = await res.json();
            if (res.ok) {
                handleImageChange(index, data.url);
                toast.success("Image uploaded!");
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                highlights: formData.highlights.split(",").map(h => h.trim()).filter(h => h !== ""),
                inclusions: formData.inclusions.split(",").map(i => i.trim()).filter(i => i !== ""),
            };

            const url = isEdit ? `/api/admin/tours/${initialData._id}` : '/api/admin/tours';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit),
            });

            if (!res.ok) throw new Error("Something went wrong");

            toast.success(isEdit ? "Tour updated!" : "Tour created!");
            navigate("/admin/tours");
        } catch (error) {
            toast.error("Failed to save tour");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.slug}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                        type="text"
                        name="destination"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.destination}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                        type="number"
                        name="price"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                        type="number"
                        name="originalPrice"
                        placeholder="Optional for discount"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.originalPrice}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        placeholder="e.g. 5 Days / 4 Nights"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
                    <input
                        type="number"
                        name="availableSeats"
                        required
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.availableSeats}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge (e.g. Best Seller)</label>
                    <input
                        type="text"
                        name="badge"
                        placeholder="Optional"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
                        value={formData.badge}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
                    <select
                        name="badgeColor"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        value={formData.badgeColor}
                        onChange={handleChange}
                    >
                        <option value="bg-blue-600">Blue</option>
                        <option value="bg-emerald-600">Green</option>
                        <option value="bg-rose-500">Red</option>
                        <option value="bg-orange-500">Orange</option>
                        <option value="bg-purple-600">Purple</option>
                        <option value="bg-teal-600">Teal</option>
                    </select>
                </div>
                <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-900">Featured Tour</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    rows="4"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma separated)</label>
                    <textarea
                        name="highlights"
                        rows="3"
                        placeholder="e.g. VIP access, Local photography, Secret dinner"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.highlights}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions (comma separated)</label>
                    <textarea
                        name="inclusions"
                        rows="3"
                        placeholder="e.g. 5* Hotel, Daily Breakfast, SUV Transfers"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.inclusions}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images (URLs)</label>
                <div className="space-y-3">
                    {formData.images.map((url, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Image URL or track uploaded file"
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 bg-gray-50"
                                    value={url}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImageField(index)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <Minus size={18} />
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex-1">
                                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors cursor-pointer group flex items-center justify-center gap-2">
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                            disabled={uploading}
                                        />
                                        <ImageIcon size={20} className="text-gray-400 group-hover:text-blue-500" />
                                        <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
                                            {uploading ? "Uploading..." : "Upload from device"}
                                        </span>
                                    </div>
                                </label>
                                {url && (
                                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                        <img src={url} alt="Preview" className="object-cover w-full h-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                        <Plus size={16} /> Add Another Image
                    </button>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                    {loading && <Loader2 className="animate-spin" size={18} />}
                    {isEdit ? "Update Tour" : "Create Tour"}
                </button>
            </div>
        </form>
    );
}

