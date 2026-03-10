"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Save, User, Lock, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock useSession
const useSession = () => ({ 
    data: { user: { name: "John Doe", email: "john@example.com" } },
    update: async (data) => console.log("Updating session", data)
});

export default function SettingsForm() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [activeTab, setActiveTab] = useState("general");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (activeTab === "security" && formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const payload = { ...formData };
            // clear password fields if not in security tab to avoid accidental submission? 
            // Actually the API handles optional fields.

            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            toast.success("Settings updated successfully");

            if (activeTab === "general" && session?.user?.name !== formData.name) {
                await update({ name: formData.name });
            }

            if (activeTab === "security") {
                setFormData(prev => ({
                    ...prev,
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }));
            }

            console.log("Profile refreshed");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: "general", label: "General", icon: User },
        { id: "security", label: "Security", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
            <div className="flex flex-col md:flex-row min-h-[500px]">
                {/* Sidebar / Tabs */}
                <div className="w-full md:w-64 bg-gray-50 p-6 md:border-r border-gray-100">
                    <div className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.id
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon size={18} className="mr-3" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* General Tab */}
                        {activeTab === "general" && (
                            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={session?.user?.email || ""}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">Email cannot be changed directly.</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Security Tab */}
                        {activeTab === "security" && (
                            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                                <div className="space-y-6 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-500"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Notifications Tab (Placeholder) */}
                        {activeTab === "notifications" && (
                            <section className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Email Notifications</h3>
                                            <p className="text-sm text-gray-500">Receive updates about your bookings</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                                            <p className="text-sm text-gray-500">Receive offers and travel inspiration</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab !== "notifications" && (
                            <div className="flex justify-end pt-4 border-t border-gray-100 mt-8">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

