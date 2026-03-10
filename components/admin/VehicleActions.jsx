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
        <div className="flex items-center justify-end gap-2">
            <Link href={`/admin/vehicles/${vehicleId}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Pencil size={18} />
            </Link>
            <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash size={18} />
            </button>
        </div>
    );
}
