"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2, Plus, Minus, Image as ImageIcon } from "lucide-react";

export default function VehicleForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "SUV",
        capacity: "4+1 Seats",
        pricePerKm: "",
        pricePerDay: "",
        description: "",
        images: [""],
        features: ["Professional Driver", "AC", "Music System"],
        available: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
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
                const newImages = [...formData.images];
                newImages[index] = data.url;
                setFormData(prev => ({ ...prev, images: newImages }));
                toast.success("Image uploaded!");
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/vehicles", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success("Vehicle added!");
                navigate("/admin/vehicles");
            }
        } catch (error) {
            toast.error("Failed to add vehicle");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-gray-100 shadow-sm max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select name="type" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.type} onChange={handleChange}>
                        <option value="SUV">SUV</option>
                        <option value="SADAN">SADAN</option>
                        <option value="HATCHBACK">HATCHBACK</option>
                        <option value="BUS">BUS</option>
                        <option value="TEMPO TRAVELER">TEMPO TRAVELER</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input type="text" name="capacity" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.capacity} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day</label>
                    <input type="number" name="pricePerDay" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.pricePerDay} onChange={handleChange} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per KM</label>
                    <input type="number" name="pricePerKm" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.pricePerKm} onChange={handleChange} />
                </div>
                <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="w-5 h-5" />
                        <span className="text-sm font-medium">Available for booking</span>
                    </label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows="3" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={handleChange} />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                {formData.images.map((url, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                        <label className="flex-1 cursor-pointer">
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-500">
                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(index, e.target.files[0])} />
                                <ImageIcon size={20} className="mx-auto mb-1 text-gray-400" />
                                <span className="text-xs text-gray-500">{uploading ? "Uploading..." : "Click to upload image"}</span>
                            </div>
                        </label>
                        {url && <div className="w-16 h-16 rounded-lg overflow-hidden border"><img src={url} className="w-full h-full object-cover" /></div>}
                    </div>
                ))}
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                {loading && <Loader2 className="animate-spin" size={20} />}
                Save Vehicle
            </button>
        </form>
    );
}

