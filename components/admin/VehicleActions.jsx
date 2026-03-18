"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function VehicleActions({ vehicleId }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this vehicle?")) return;

        try {
            const res = await fetch(`/api/admin/vehicles/${vehicleId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Vehicle deleted");
                window.location.reload();
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to delete");
            }
        } catch (error) {
            toast.error("Error deleting vehicle");
        }
    };

    return (
        <div className="flex items-center justify-end gap-3 sm:gap-2">
            <Link 
                href={`/admin/vehicles/${vehicleId}`} 
                className="p-3 sm:p-2 text-blue-600 bg-blue-50 sm:text-gray-400 sm:bg-transparent sm:hover:text-blue-600 sm:hover:bg-blue-50 rounded-xl sm:rounded-lg transition-all shadow-sm sm:shadow-none"
                title="Edit Vehicle"
            >
                <Pencil size={20} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <button 
                onClick={handleDelete} 
                className="p-3 sm:p-2 text-red-600 bg-red-50 sm:text-gray-400 sm:bg-transparent sm:hover:text-red-600 sm:hover:bg-red-50 rounded-xl sm:rounded-lg transition-all shadow-sm sm:shadow-none"
                title="Delete Vehicle"
            >
                <Trash size={20} className="sm:w-[18px] sm:h-[18px]" />
            </button>
        </div>
    );
}
