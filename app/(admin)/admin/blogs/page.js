import Link from "next/link";
import { Plus, Newspaper, Clock } from "lucide-react";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import Image from "next/image";
import RefreshButton from "@/components/admin/RefreshButton";
import BlogActions from "@/components/admin/BlogActions";

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(blogs));
}

export default async function AdminBlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="pb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Manage <span className="text-blue-600">Blog Posts</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <RefreshButton />
                    <Link href="/admin/blogs/new" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2">
                        <Plus size={16} />
                        New Post
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="md:hidden divide-y divide-gray-100">
                    {blogs.map((b) => (
                        <div key={b._id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                            <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                                <Image src={b.image || '/icon.png'} alt={b.title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-900 truncate">{b.title}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${b.published ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                        {b.published ? 'Pub' : 'Draft'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-1 mb-2">{b.excerpt}</p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                                    <Clock size={12} />
                                    {new Date(b.createdAt).toLocaleDateString()}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Settings</span>
                                    </div>
                                    <BlogActions blogId={b._id.toString()} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-black">
                                <th className="p-4 pl-8 font-black">Image</th>
                                <th className="p-4 font-black">Title & Date</th>
                                <th className="p-4 font-black">Read Time</th>
                                <th className="p-4 font-black">Status</th>
                                <th className="p-4 pr-8 text-right font-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {blogs.map((b) => (
                                <tr key={b._id} className="hover:bg-gray-50/50 group">
                                    <td className="p-4 pl-8">
                                        <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-gray-100 shadow-sm border-2 border-white group-hover:scale-110 transition-transform">
                                            <Image src={b.image || '/icon.png'} alt={b.title} fill className="object-cover" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{b.title}</div>
                                        <div className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                            <Clock size={12} /> {new Date(b.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                                            {b.readTime}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${b.published ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                            {b.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-8 text-right">
                                        <BlogActions blogId={b._id.toString()} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {blogs.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Newspaper size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No blog posts yet.</p>
                        <Link href="/admin/blogs/new" className="text-blue-600 text-sm font-bold mt-2 inline-block hover:underline">Write your first post</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
