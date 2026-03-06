
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X, User, LogOut, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            <MapPin size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            NewTours
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/tours" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Tours
                        </Link>
                        <Link href="/bookings" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            My Bookings
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                            Contact
                        </Link>

                        {/* User Auth */}
                        {session ? (
                            <div className="relative">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 focus:outline-none"
                                >
                                    <img
                                        src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full border border-gray-200"
                                    />
                                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                                        {session.user.name}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1"
                                        >
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                                            </div>

                                            {session.user.role === 'admin' && (
                                                <Link
                                                    href="/admin"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}

                                            <Link
                                                href="/bookings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                My Bookings
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    setUserMenuOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <LogOut size={14} /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link
                                href="/"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/tours"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                onClick={toggleMenu}
                            >
                                Tours
                            </Link>
                            <Link
                                href="/bookings"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                onClick={toggleMenu}
                            >
                                My Bookings
                            </Link>
                            <Link
                                href="/contact"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                onClick={toggleMenu}
                            >
                                Contact
                            </Link>

                            {session ? (
                                <>
                                    <div className="border-t border-gray-100 my-2"></div>
                                    <Link
                                        href="/bookings"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                        onClick={toggleMenu}
                                    >
                                        My Bookings
                                    </Link>
                                    {session.user.role === 'admin' && (
                                        <Link
                                            href="/admin"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                                            onClick={toggleMenu}
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            signOut();
                                            toggleMenu();
                                        }}
                                        className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="pt-4">
                                    <Link
                                        href="/login"
                                        className="block text-center w-full bg-blue-600 text-white px-5 py-3 rounded-xl font-medium"
                                        onClick={toggleMenu}
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
