import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();
        const newBlog = await Blog.create(data);
        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
