import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "You must be logged in first!" }, { status: 401 });
        }

        await dbConnect();

        // Update the logged-in user to have the admin role
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { role: "admin" },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found in database." }, { status: 404 });
        }

        return NextResponse.json({
            message: "Success! You are now an Admin.",
            user: updatedUser.email,
            role: updatedUser.role,
            nextSteps: "Please log out and log back in to refresh your administrative session permissions!"
        });

    } catch (error) {
        console.error("Admin setup error:", error);
        return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
    }
}
