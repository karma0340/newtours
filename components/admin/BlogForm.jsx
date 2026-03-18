"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Image as ImageIcon, Save, Check } from "lucide-react";
import Image from "next/image";

export default function BlogForm({ initialData, isEdit }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        author: "Hike The Himalaya Team",
        published: true,
        readTime: "5 min",
        tags: [""],
        seoTitle: "",
        seoDescription: "",
        seoKeywords: [""]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const updates = { ...prev, [name]: type === "checkbox" ? checked : value };
            if (name === "title" && !isEdit) {
                updates.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
            }
            return updates;
        });
    };

    const handleFileUpload = async (file) => {
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
                setFormData(prev => ({ ...prev, image: data.url }));
                toast.success("Image uploaded!");
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleArrayChange = (e, index, field) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayItem = (index, field) => {
        const newArray = [...formData[field]];
        newArray.splice(index, 1);
        setFormData({ ...formData, [field]: newArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = isEdit ? `/api/admin/blogs/${formData._id}` : "/api/admin/blogs";
            const method = isEdit ? "PATCH" : "POST";

            // clean arrays
            const cleanedData = {
                ...formData,
                tags: formData.tags.filter(t => t.trim() !== ""),
                seoKeywords: formData.seoKeywords.filter(k => k.trim() !== "")
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedData),
            });
            if (res.ok) {
                toast.success(isEdit ? "Post updated!" : "Post published!");
                router.push("/admin/blogs");
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
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Post Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        required 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-lg" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="e.g. Top 10 Places to Visit in Himachal"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">URL Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        required 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium font-mono text-sm" 
                        value={formData.slug} 
                        onChange={handleChange} 
                        placeholder="e.g. top-10-places-himachal"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Status</label>
                    <div className="flex items-center h-[52px]">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.published ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full transition-transform ${formData.published ? 'translate-x-6' : 'translate-x-0'}`} />
                            </div>
                            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="hidden" />
                            <span className="text-sm font-black uppercase tracking-widest text-gray-600">{formData.published ? 'Published (Live)' : 'Draft (Hidden)'}</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Author</label>
                    <input 
                        type="text" 
                        name="author" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium" 
                        value={formData.author} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Read Time</label>
                    <input 
                        type="text" 
                        name="readTime" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium" 
                        value={formData.readTime} 
                        onChange={handleChange} 
                        placeholder="e.g. 5 min"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Excerpt (Short Summary)</label>
                <textarea 
                    name="excerpt" 
                    required
                    rows="2" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium leading-relaxed" 
                    value={formData.excerpt} 
                    onChange={handleChange} 
                    placeholder="A brief summary for cards and thumbnails..."
                />
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex justify-between">
                    <span>Main Content</span>
                    <span className="text-blue-500 normal-case font-medium">Supports HTML &lt;h2&gt;, &lt;p&gt;, &lt;b&gt;, &lt;br&gt;</span>
                </label>
                <textarea 
                    name="content" 
                    required
                    rows="15" 
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm leading-loose text-gray-700" 
                    value={formData.content} 
                    onChange={handleChange} 
                    placeholder="<h2>Your Heading</h2><p>Write your amazing blog post here...</p>"
                />
            </div>

            <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Cover Image</label>
                <div className="relative group w-full max-w-md">
                    <div className={`aspect-video rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 overflow-hidden
                        ${formData.image ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50 hover:border-blue-400'}`}>
                        
                        {formData.image ? (
                            <>
                                <Image src={formData.image} alt="Cover" fill className="object-cover transition-transform group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                        className="bg-white text-red-600 p-2 rounded-lg font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e.target.files[0])} accept="image/*" />
                                <ImageIcon size={32} className="text-gray-300 mb-2" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">{uploading ? "Uploading..." : "Click to Upload Image"}</span>
                            </>
                        )}
                    </div>
                </div>
                <input 
                    type="text" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange}
                    placeholder="...or paste image URL directly" 
                    className="w-full max-w-md mt-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                />
            </div>

            {/* SEO Section */}
            <div className="border-t border-gray-100 pt-8 mt-8">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-blue-600">✦</span> SEO Settings
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">SEO Title</label>
                        <input 
                            type="text" 
                            name="seoTitle" 
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm font-bold" 
                            value={formData.seoTitle} 
                            onChange={handleChange} 
                            placeholder={formData.title || "Custom title for search engines"}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">SEO Description</label>
                        <textarea 
                            name="seoDescription" 
                            rows="2"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm resize-none font-medium" 
                            value={formData.seoDescription} 
                            onChange={handleChange} 
                            placeholder={formData.excerpt || "Meta description for Google..."}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">SEO Keywords</label>
                        <div className="flex flex-wrap gap-2">
                            {formData.seoKeywords.map((kw, index) => (
                                <div key={index} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
                                    <input 
                                        type="text" 
                                        value={kw} 
                                        onChange={(e) => handleArrayChange(e, index, "seoKeywords")} 
                                        placeholder="Keyword..."
                                        className="bg-transparent text-sm w-32 outline-none px-2 font-medium"
                                    />
                                    <button type="button" onClick={() => removeArrayItem(index, "seoKeywords")} className="text-gray-400 hover:text-red-500 p-1">
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addArrayItem("seoKeywords")} className="text-xs bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100">
                                + Add Keyword
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading || uploading} 
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]
                    ${isEdit ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white`}
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (isEdit ? <Check size={20} /> : <Save size={20} />)}
                {isEdit ? "Update Blog Post" : "Publish Post"}
            </button>
        </form>
    );
}
