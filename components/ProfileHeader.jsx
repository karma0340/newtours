"use client";

import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

export default function ProfileHeader({ user }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="h-32 bg-gradient-to-r from-blue-700 to-indigo-800"></div>
            <div className="px-8 pb-8">
                <div className="relative flex justify-between items-end -mt-12 mb-6">
                    <div className="relative">
                        <img
                            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0066FF&color=fff`}
                            alt={user.name}
                            className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg object-cover"
                        />
                    </div>
                    <div className="mb-2">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="bg-white border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 shadow-sm px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-md active:scale-95 flex items-center gap-2"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">{user.name}</h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <p className="text-gray-500 font-medium flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            {user.email}
                        </p>
                        {user.phone && (
                            <>
                                <div className="hidden sm:block w-px h-4 bg-gray-200" />
                                <p className="text-gray-500 font-medium">{user.phone}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <EditProfileModal
                user={user}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}

