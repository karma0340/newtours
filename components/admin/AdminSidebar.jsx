"use client";

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
    MapPin,
    Car,
    Grid2x2,
} from "lucide-react";
import Logo from "../Logo";

const AdminSidebar = () => {
    const pathname = usePathname();

    const links = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Tours", href: "/admin/tours", icon: Map },
        { name: "Vehicles", href: "/admin/vehicles", icon: Car },
        { name: "Categories", href: "/admin/categories", icon: Grid2x2 },
        { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Bottom Navigation (Optional/Alternative) or just hidden */}
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 min-h-screen flex-col fixed left-0 top-0 bottom-0 z-40">
                <div className="h-20 flex items-center px-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-3">
                        <Logo className="scale-75 origin-left" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <Icon size={20} />
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

            {/* Mobile Header logic would go here if we wanted full mobile admin support, for now fixing the layout break. */}
        </>
    );
};

export default AdminSidebar;

