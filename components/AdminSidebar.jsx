
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Map,
    CalendarDays,
    Users,
    Settings,
    LogOut,
    MapPin,
    Menu // Import Menu if needed for later
} from "lucide-react";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import { useState } from "react";

const AdminSidebar = () => {
    const pathname = usePathname();
    // For now, mobile sidebar toggle can be added later or we just hide on mobile.
    // Use hidden md:flex to ensure it doesn't break mobile view.

    const links = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Tours", href: "/admin/tours", icon: Map },
        { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Bottom Navigation (Optional/Alternative) or just hidden */}
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col fixed left-0 top-0 bottom-0 z-40">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            <MapPin size={20} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">
                            NewTours
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon size={20} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header logic would go here if we wanted full mobile admin support, for now fixing the layout break. */}
        </>
    );
};

export default AdminSidebar;
