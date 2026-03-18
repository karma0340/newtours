import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
    return (
        <div className="pb-10">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    Create <span className="text-blue-600">New Post</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Write and publish a new blog article.</p>
            </div>
            <BlogForm isEdit={false} />
        </div>
    );
}
