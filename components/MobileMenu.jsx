"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, MapPin } from "lucide-react";
import { signOut } from "next-auth/react";
import Logo from "./Logo";

const navLinks = [
    { name: 'Home', href: '/', icon: <MapPin size={18} /> },
    { name: 'Tours', href: '/tours', icon: <MapPin size={18} /> },
    { name: 'About Us', href: '/about', icon: <MapPin size={18} /> },
    { name: 'Vehicles', href: '/vehicles', icon: <MapPin size={18} /> },
    { name: 'Contact', href: '/contact', icon: <MapPin size={18} /> },
];

export default function MobileMenu({ isOpen, onClose, session }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
                >
                    <div className="px-6 pt-6 pb-2 flex items-center gap-3 border-b border-gray-50 mb-2">
                        <Logo />
                    </div>
                    <div className="px-4 pt-2 pb-8 space-y-2">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
                                onClick={onClose}
                            >
                                <span className="text-blue-500/50">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}

                        {session ? (
                            <div className="pt-4 mt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3 px-4 mb-4">
                                    <div className="relative w-10 h-10">
                                        <img
                                            src={session.user.image || '/images/default-avatar.png'}
                                            alt="Profile"
                                            className="w-full h-full rounded-full border border-gray-200 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{session.user.name}</p>
                                        <p className="text-xs text-gray-500">{session.user.email}</p>
                                    </div>
                                </div>

                                {session?.user?.role === 'admin' && (
                                    <Link
                                        href="/admin"
                                        className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl"
                                        onClick={onClose}
                                    >
                                        <User size={18} className="text-blue-500/50" />
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        signOut();
                                        onClose();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl"
                                >
                                    <LogOut size={18} className="text-red-500/50" />
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="pt-6">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center w-full bg-blue-600 text-white px-5 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20"
                                    onClick={onClose}
                                >
                                    Sign In to Account
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
