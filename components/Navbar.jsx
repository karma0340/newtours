"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { Menu, X, MapPin } from "lucide-react";
import Image from "next/image";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

import Logo from "./Logo";

const Navbar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
    const toggleUserMenu = useCallback(() => setUserMenuOpen(prev => !prev), []);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link href="/" className="flex-shrink-0 group transition-transform hover:scale-105 active:scale-95" prefetch={true}>
                        <Logo />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors" prefetch={true}>
                            Home
                        </Link>
                        <Link href="/tours" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors" prefetch={true}>
                            Tours
                        </Link>
                        <Link href="/about" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors" prefetch={true}>
                            About Us
                        </Link>
                        <Link href="/vehicles" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors" prefetch={true}>
                            Vehicles
                        </Link>
                        <Link href="/contact" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors" prefetch={true}>
                            Contact
                        </Link>

                        {/* User Auth */}
                        {session ? (
                            <UserMenu 
                                session={session} 
                                isOpen={userMenuOpen} 
                                onClose={() => setUserMenuOpen(false)} 
                                onToggle={toggleUserMenu}
                            />
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
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 bg-gray-50 rounded-lg"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} session={session} />
        </nav>
    );
};

export default Navbar;
