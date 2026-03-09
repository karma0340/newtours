import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import redis from "@/lib/redis";

// GET single category
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const category = await Category.findById(params.id).lean();
        if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });
        return NextResponse.json({ category });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch category" }, { status: 500 });
    }
}

// PUT - update category (admin only)
export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const category = await Category.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
        if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });

        // Invalidate cache
        await redis.del("categories:active");

        return NextResponse.json({ message: "Category updated", category });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update category", error: error.message }, { status: 500 });
    }
}

// DELETE - delete category (admin only)
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const category = await Category.findByIdAndDelete(params.id);
        if (!category) return NextResponse.json({ message: "Category not found" }, { status: 404 });

        // Invalidate cache
        await redis.del("categories:active");

        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
    }
}
