
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const tour = await Tour.findById(id);
        if (!tour) return NextResponse.json({ message: "Tour not found" }, { status: 404 });
        return NextResponse.json(tour);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching tour" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const tour = await Tour.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!tour) return NextResponse.json({ message: "Tour not found" }, { status: 404 });

        return NextResponse.json(tour);
    } catch (error) {
        return NextResponse.json({ message: "Error updating tour", error: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const tour = await Tour.findByIdAndDelete(id);

        if (!tour) return NextResponse.json({ message: "Tour not found" }, { status: 404 });

        return NextResponse.json({ message: "Tour deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting tour" }, { status: 500 });
    }
}
