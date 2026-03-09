
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        // Optimization: Lean query and projection
        const vehicles = await Vehicle.find({ available: true })
            .select('name image price type featured category capacity')
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(vehicles);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch vehicles", error: error.message }, { status: 500 });
    }
}
