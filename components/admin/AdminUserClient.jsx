"use client";

import { useState } from "react";
import { User as UserIcon, Trash2, Edit2, Check, X, Loader2, Calendar, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Mock useSession
const useSession = () => ({ data: { user: { id: "admin_id" } } });

export default function AdminUserClient({ initialUsers }) {
    const { data: session } = useSession();
    const [users, setUsers] = useState(initialUsers);
    const [editingId, setEditingId] = useState(null);
    const [currentRole, setCurrentRole] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEditClick = (user) => {
        setEditingId(user._id);
        setCurrentRole(user.role);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setCurrentRole("");
    };

    const handleSaveRole = async (id) => {
        if (!currentRole) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: currentRole })
            });

            if (res.ok) {
                toast.success("Role updated successfully!");
                setUsers(prev =>
                    prev.map(u => u._id === id ? { ...u, role: currentRole } : u)
                );
                setEditingId(null);
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update role");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (id === session?.user?.id) {
            toast.error("You cannot delete your own account.");
            return;
        }

        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                toast.success("User deleted successfully!");
                setUsers(prev => prev.filter(u => u._id !== id));
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
                {users.map((user) => (
                    <div key={user._id} className="p-4 space-y-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                {user.image ? (
                                    <Image src={user.image} alt={user.name} width={48} height={48} className="object-cover" />
                                ) : (
                                    <UserIcon className="text-gray-300" size={24} />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate flex items-center gap-2">
                                    {user.name}
                                    {user.role === 'admin' && <ShieldCheck size={14} className="text-purple-500" />}
                                </h3>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                {user.role}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <Calendar size={12} /> Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {editingId === user._id ? (
                                    <div className="flex items-center gap-1">
                                        <select
                                            value={currentRole}
                                            onChange={(e) => setCurrentRole(e.target.value)}
                                            className="text-[10px] border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white font-black uppercase tracking-widest"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        <button onClick={() => handleSaveRole(user._id)} disabled={loading} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                            <Check size={16} />
                                        </button>
                                        <button onClick={handleCancelEdit} className="p-1 text-gray-400 hover:bg-gray-50 rounded-lg">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditClick(user)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            disabled={user._id === session?.user?.id}
                                            className={`p-2 transition-colors ${user._id === session?.user?.id ? 'text-gray-100 opacity-50' : 'text-gray-400 hover:text-rose-600'}`}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                            <th className="p-4 pl-8">User Profile</th>
                            <th className="p-4 font-black">Account Role</th>
                            <th className="p-4 font-black">Provider</th>
                            <th className="p-4 font-black">Joined</th>
                            <th className="p-4 pr-8 text-right font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50/50 group">
                                <td className="p-4 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 border border-white shadow-sm">
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name} width={40} height={40} className="object-cover" />
                                            ) : (
                                                <UserIcon className="text-gray-400" size={18} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</div>
                                            <div className="text-xs text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {editingId === user._id ? (
                                        <select
                                            value={currentRole}
                                            onChange={(e) => setCurrentRole(e.target.value)}
                                            className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm
                                                ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                        {user.provider}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm font-medium">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 pr-8 text-right">
                                    {editingId === user._id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleSaveRole(user._id)} disabled={loading} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                                            </button>
                                            <button onClick={handleCancelEdit} disabled={loading} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-3 translate-x-3 group-hover:translate-x-0 transition-transform">
                                            <button onClick={() => handleEditClick(user)} className="bg-white border text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm">
                                                Edit Role
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user._id)} 
                                                disabled={user._id === session?.user?.id}
                                                className={`p-2 transition-colors ${user._id === session?.user?.id ? 'text-gray-100 opacity-50 cursor-not-allowed' : 'text-gray-300 hover:text-rose-600'}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="p-20 text-center">
                    <UserIcon size={40} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No registered users found.</p>
                </div>
            )}
        </div>
    );
}
