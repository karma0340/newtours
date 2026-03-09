
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const data = await req.json();
        const vehicle = await Vehicle.create(data);
        return NextResponse.json(vehicle, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to create vehicle", error: error.message }, { status: 500 });
    }
}
