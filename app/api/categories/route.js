import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import redis from "@/lib/redis";

// GET all categories
export async function GET() {
    try {
        // Try getting from cache first
        const cachedCategories = await redis.get("categories:active");
        if (cachedCategories) {
            return NextResponse.json({ categories: JSON.parse(cachedCategories) });
        }

        await dbConnect();
        const categories = await Category.find({ active: true }).sort({ order: 1, createdAt: 1 }).lean();
        
        // Cache for 1 hour
        await redis.set("categories:active", JSON.stringify(categories), "EX", 3600);
        
        return NextResponse.json({ categories });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch categories", error: error.message }, { status: 500 });
    }
}

// POST - create new category (admin only)
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();
        const { slug, title, description, image, icon, order } = body;

        if (!slug || !title || !description) {
            return NextResponse.json({ message: "slug, title, and description are required" }, { status: 400 });
        }

        const category = await Category.create({ slug, title, description, image, icon, order });
        
        // Invalidate cache since a new category was added
        await redis.del("categories:active");
        
        return NextResponse.json({ message: "Category created", category }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "A category with this slug already exists" }, { status: 409 });
        }
        return NextResponse.json({ message: "Failed to create category", error: error.message }, { status: 500 });
    }
}
