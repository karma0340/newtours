"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserMenu({ session, isOpen, onClose, onToggle }) {
    if (!session) return null;

    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 focus:outline-none"
            >
                <div className="relative w-8 h-8">
                    <img
                        src={session.user.image || "/images/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full rounded-full border border-gray-200 object-cover"
                    />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {session.user.name}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={onClose} />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50"
                        >
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                            </div>

                            {session.user.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    onClick={onClose}
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    signOut();
                                    onClose();
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <LogOut size={14} /> Sign Out
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
