"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Map,
    CalendarDays,
    Users,
    Settings,
    LogOut,
    Car,
    Grid2x2,
    Menu,
    X,
    Newspaper
} from "lucide-react";
import Logo from "../Logo";

const AdminSidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Tours", href: "/admin/tours", icon: Map },
        { name: "Vehicles", href: "/admin/vehicles", icon: Car },
        { name: "Categories", href: "/admin/categories", icon: Grid2x2 },
        { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Blog", href: "/admin/blogs", icon: Newspaper },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-[60] flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="scale-75 origin-left" />
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
                fixed left-0 top-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:flex
            `}>
                <div className="h-20 flex items-center px-6 border-b border-gray-100 hidden md:flex">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo className="scale-75 origin-left" />
                    </Link>
                </div>

                {/* Mobile top spacer and admin label */}
                <div className="md:hidden h-16 border-b border-gray-100 flex items-center px-6">
                    <span className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Admin Control</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-400"} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
