
import TourForm from "@/components/TourForm";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { notFound } from "next/navigation";

async function getTour(id) {
    await dbConnect();
    // Validate ID format if necessary or try/catch
    try {
        const tour = await Tour.findById(id).lean();
        if (!tour) return null;
        return JSON.parse(JSON.stringify(tour));
    } catch {
        return null;
    }
}

export default async function EditTourPage(props) {
    const params = await props.params; // Ensure async access to params in Next.js 15+
    const tour = await getTour(params.id);

    if (!tour) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Tour</h1>
            <TourForm initialData={tour} isEdit={true} />
        </div>
    );
}
