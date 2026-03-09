import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

export default function TourActions({ tourId }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this tour?")) return;

        try {
            const res = await fetch(`/api/admin/tours/${tourId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Tour deleted");
                window.location.reload();
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            toast.error("Error deleting");
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Link href={`/admin/tours/${tourId}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Pencil size={18} />
            </Link>
            <button onClick={handleDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash size={18} />
            </button>
        </div>
    );
}
