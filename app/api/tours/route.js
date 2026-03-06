
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        // Basic validation or defaults could go here

        const tour = await Tour.create(body);

        return NextResponse.json(tour, { status: 201 });
    } catch (error) {
        console.error("Error creating tour:", error);
        return NextResponse.json({ message: "Error creating tour", error: error.message }, { status: 500 });
    }
}
