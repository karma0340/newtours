import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { name, phone } = await req.json();

        // Ensure we handle cases where email is missing but ID exists or vice versa
        let updatedUser = null;

        if (session.user.email) {
            updatedUser = await User.findOneAndUpdate(
                { email: session.user.email.toLowerCase() },
                { name, phone },
                { new: true, runValidators: true }
            );
        }

        if (!updatedUser && session.user.id) {
            updatedUser = await User.findByIdAndUpdate(
                session.user.id,
                { name, phone },
                { new: true, runValidators: true }
            );
        }

        if (!updatedUser) {
            console.error("User not found in DB. Session details:", JSON.stringify(session));
            return NextResponse.json({ message: "User not found in database. This happens if the database was recently reset. Please sign out and sign in again." }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Profile updated successfully", user: { name: updatedUser.name, phone: updatedUser.phone } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Error updating profile", error: error.message }, { status: 500 });
    }
}
