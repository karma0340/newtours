import BlogForm from "@/components/admin/BlogForm";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";

async function getBlog(id) {
    await dbConnect();
    const blog = await Blog.findById(id);
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
}

export default async function EditBlogPage({ params }) {
    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="pb-10">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    Edit <span className="text-blue-600">Post</span>
                </h1>
            </div>
            <BlogForm initialData={blog} isEdit={true} />
        </div>
    );
}
