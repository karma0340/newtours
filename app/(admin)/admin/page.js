
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users, DollarSign, Calendar, Map } from "lucide-react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session?.user?.role !== "admin") {
        return null;
    }

    const stats = [
        { name: 'Total Bookings', value: '156', icon: Calendar, color: 'bg-blue-500' },
        { name: 'Total Revenue', value: '$12,345', icon: DollarSign, color: 'bg-green-500' },
        { name: 'Active Users', value: '892', icon: Users, color: 'bg-purple-500' },
        { name: 'Total Tours', value: '24', icon: Map, color: 'bg-orange-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
                            <div className={`${stat.color} p-4 rounded-xl text-white mr-4`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">{stat.name}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Chart Placeholder
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue Overview</h2>
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Chart Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
