
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { name, currentPassword, newPassword } = await req.json();

        const user = await User.findById(session.user.id).select("+password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update Name
        if (name) {
            user.name = name;
        }

        // Update Password
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json({ message: "Current password is required to set a new password." }, { status: 400 });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return NextResponse.json({ message: "Incorrect current password." }, { status: 400 });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
