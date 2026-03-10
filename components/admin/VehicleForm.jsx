"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Plus, Minus, Image as ImageIcon, Save, Check } from "lucide-react";

export default function VehicleForm({ initialData, isEdit }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
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
            const url = isEdit ? `/api/admin/vehicles/${formData._id}` : "/api/admin/vehicles";
            const method = isEdit ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                toast.success(isEdit ? "Vehicle updated!" : "Vehicle added!");
                router.push("/admin/vehicles");
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.message || "Operation failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Vehicle Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Toyota Innova Crysta"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Vehicle Category</label>
                    <select 
                        name="type" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                        value={formData.type} 
                        onChange={handleChange}
                    >
                        <option value="SUV">SUV (Premium)</option>
                        <option value="SADAN">SEDAN</option>
                        <option value="HATCHBACK">HATCHBACK</option>
                        <option value="BUS">TOURIST BUS</option>
                        <option value="TEMPO TRAVELER">TEMPO TRAVELLER</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Seating Capacity</label>
                    <input 
                        type="text" 
                        name="capacity" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                        value={formData.capacity} 
                        onChange={handleChange} 
                        placeholder="e.g. 6+1 Seats"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Status</label>
                    <div className="flex items-center h-[52px]">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.available ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${formData.available ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                            <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="hidden" />
                            <span className="text-sm font-black uppercase tracking-widest text-gray-600">{formData.available ? 'Available (Live)' : 'Unavailable (Hidden)'}</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price Per Day (₹)</label>
                    <input 
                        type="number" 
                        name="pricePerDay" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                        value={formData.pricePerDay} 
                        onChange={handleChange} 
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Price Per KM (₹)</label>
                    <input 
                        type="number" 
                        name="pricePerKm" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold" 
                        value={formData.pricePerKm} 
                        onChange={handleChange} 
                        placeholder="0"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                    name="description" 
                    rows="4" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium leading-relaxed" 
                    value={formData.description} 
                    onChange={handleChange} 
                    placeholder="Describe the vehicle's condition, features, and amenities..."
                />
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Vehicle Images</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.images.map((url, index) => (
                        <div key={index} className="space-y-2">
                            <div className="relative group">
                                <div className={`aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 overflow-hidden
                                    ${url ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50 hover:border-blue-400'}`}>
                                    
                                    {url ? (
                                        <>
                                            <img src={url} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = [...formData.images];
                                                        newImages[index] = "";
                                                        setFormData(prev => ({ ...prev, images: newImages }));
                                                    }}
                                                    className="bg-white text-red-600 p-2 rounded-lg font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(index, e.target.files[0])} />
                                            <ImageIcon size={24} className="text-gray-300 mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{uploading ? "Uploading..." : "Click to Upload"}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <input 
                                type="text" 
                                value={url} 
                                onChange={(e) => {
                                    const newImages = [...formData.images];
                                    newImages[index] = e.target.value;
                                    setFormData(prev => ({ ...prev, images: newImages }));
                                }}
                                placeholder="...or enter image URL" 
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none focus:bg-white"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading || uploading} 
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]
                    ${isEdit ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white`}
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (isEdit ? <Check size={20} /> : <Save size={20} />)}
                {isEdit ? "Update Vehicle Details" : "Save New Vehicle"}
            </button>
        </form>
    );
}
