"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, X, Loader2, ImageIcon, Check, Grid2x2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ICON_OPTIONS = ["Mountain", "Zap", "Infinity", "Trees", "Map", "Music", "Camera", "Compass", "Globe", "Sun", "Star", "Heart"];

const defaultForm = { slug: "", title: "", description: "", image: "", icon: "Map", order: 0 };

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(defaultForm);
    const [uploading, setUploading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data.categories || []);
        } catch {
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/categories/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setForm(f => ({ ...f, image: data.url }));
            toast.success("Image uploaded!");
        } catch (err) {
            toast.error(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const openCreate = () => {
        setForm(defaultForm);
        setEditingId(null);
        setShowForm(true);
    };

    const openEdit = (cat) => {
        setForm({ slug: cat.slug, title: cat.title, description: cat.description, image: cat.image || "", icon: cat.icon || "Map", order: cat.order ?? 0 });
        setEditingId(cat._id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.slug || !form.title || !form.description) {
            toast.error("Please fill all required fields");
            return;
        }

        setSubmitting(true);
        try {
            const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
            const method = editingId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success(editingId ? "Category updated!" : "Category created!");
            setShowForm(false);
            fetchCategories();
        } catch (err) {
            toast.error(err.message || "Failed to save");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            toast.success("Category deleted");
            setDeleteId(null);
            fetchCategories();
        } catch (err) {
            toast.error(err.message || "Delete failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-16">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Grid2x2 size={28} className="text-blue-600" />
                        Categories
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage the adventure categories shown on the homepage.</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-blue-600/20"
                >
                    <Plus size={18} /> Add Category
                </button>
            </div>

            {/* Category Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-blue-500" />
                </div>
            ) : categories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <Grid2x2 size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">No categories yet. Add your first one!</p>
                    <button onClick={openCreate} className="mt-4 text-blue-600 text-sm font-bold underline">Add Category</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((cat) => (
                        <div key={cat._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            {/* Image Preview */}
                            <div className="relative h-40 bg-gray-100">
                                {cat.image ? (
                                    <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <ImageIcon size={36} className="text-gray-300" />
                                    </div>
                                )}
                                {/* Action Buttons - Fixed for Mobile, Hover for Desktop */}
                                <div className="absolute top-3 right-3 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all">
                                    <button
                                        onClick={() => openEdit(cat)}
                                        className="w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all active:scale-95"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteId(cat._id)}
                                        className="w-9 h-9 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-red-600 transition-all active:scale-95"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{cat.title}</h3>
                                    <span className="text-[9px] font-black tracking-widest text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 italic">/{cat.slug}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 font-medium leading-relaxed">{cat.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* === FORM MODAL === */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-lg font-black text-gray-900">
                                {editingId ? "Edit Category" : "New Category"}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category Image</label>
                                <div className="relative w-full h-44 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer group"
                                     onClick={() => fileInputRef.current?.click()}>
                                    {form.image ? (
                                        <>
                                            <Image src={form.image} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Upload size={24} className="text-white" />
                                                <span className="text-white text-sm font-bold ml-2">Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-2">
                                            {uploading ? <Loader2 size={32} className="animate-spin text-blue-500" /> : <Upload size={32} className="text-gray-300" />}
                                            <p className="text-sm text-gray-400 font-medium">{uploading ? "Uploading..." : "Click to upload image"}</p>
                                            <p className="text-xs text-gray-300">PNG, JPG, WEBP supported</p>
                                        </div>
                                    )}
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                {/* Or paste URL */}
                                <input
                                    type="text"
                                    value={form.image}
                                    onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                                    placeholder="...or paste image URL"
                                    className="mt-2 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 text-gray-700"
                                />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={e => {
                                        const title = e.target.value;
                                        setForm(f => ({ ...f, title, slug: f.slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }));
                                    }}
                                    placeholder="e.g. Trekking"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slug * <span className="text-gray-400 font-normal normal-case">(used in URL)</span></label>
                                <input
                                    type="text"
                                    value={form.slug}
                                    onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }))}
                                    placeholder="e.g. trekking"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 font-mono"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description *</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Short description for this category..."
                                    rows={3}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                                    required
                                />
                            </div>

                            {/* Icon & Order row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Icon</label>
                                    <select
                                        value={form.icon}
                                        onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                    >
                                        {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Order</label>
                                    <input
                                        type="number"
                                        value={form.order}
                                        onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                        min={0}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting || uploading}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                {editingId ? "Save Changes" : "Create Category"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* === DELETE CONFIRM MODAL === */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setDeleteId(null)}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                        <h3 className="text-lg font-black text-gray-900 mb-2">Delete Category?</h3>
                        <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The category will be permanently removed.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                            <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
