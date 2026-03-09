"use client";

import { useState } from "react";
import { User as UserIcon, Trash2, Edit2, Check, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Provider</th>
                            <th className="p-4">Joined Date</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50/50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-10 h-10 object-cover" />
                                            ) : (
                                                <UserIcon className="text-gray-400" size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 line-clamp-1">{user.name}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {editingId === user._id ? (
                                        <select
                                            value={currentRole}
                                            onChange={(e) => setCurrentRole(e.target.value)}
                                            className="text-xs border border-gray-300 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-gray-600 text-sm capitalize">
                                    {user.provider}
                                </td>
                                <td className="p-4 text-gray-600 text-sm">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    {editingId === user._id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleSaveRole(user._id)}
                                                disabled={loading}
                                                className="text-green-600 hover:text-green-800 p-1"
                                                title="Save"
                                            >
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                disabled={loading}
                                                className="text-gray-400 hover:text-gray-600 p-1"
                                                title="Cancel"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit Role
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                disabled={user._id === session?.user?.id}
                                                className={`p-1 transition-colors ${user._id === session?.user?.id ? 'text-gray-200 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                                                title={user._id === session?.user?.id ? "Cannot delete yourself" : "Delete User"}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

