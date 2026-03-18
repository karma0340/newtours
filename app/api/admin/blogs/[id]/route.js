import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const data = await req.json();
        const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        await Blog.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
