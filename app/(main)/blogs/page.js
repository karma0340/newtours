import Link from "next/link";
import Image from "next/image";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Travel Blog | Himachal Travel Guides & Tips | Hike The Himalaya",
    description: "Read travel guides, trekking tips, and budget itineraries for Himachal Pradesh. Best places to visit, Spiti Valley guides, and more.",
    keywords: [
        "best time to visit Spiti Valley",
        "budget trip Himachal",
        "hidden places in Himachal",
        "travel tips India",
        "Himalaya travel blog",
        "trekking tips"
    ]
};

export const dynamic = 'force-dynamic';

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
    return blogs.map(b => ({
        ...b,
        _id: b._id.toString(),
        createdAt: b.createdAt.toISOString()
    }));
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16 px-4">
                    <span className="inline-block text-blue-600 font-black uppercase tracking-[0.2em] mb-4 text-xs sm:text-sm bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                        Travel Journal
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        Stories &amp; <span className="text-blue-600">Guides</span>
                    </h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base sm:text-lg">
                        Expert tips, hidden gems, and everything you need to know before your Himalayan adventure.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Check back soon!</h3>
                        <p className="text-gray-500 font-medium">We're writing our next great adventure guide.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link href={`/blogs/${blog.slug}`} key={blog._id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all">
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <Image 
                                        src={blog.image || '/images/hero/spiti.jpg'} 
                                        alt={blog.title} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm text-[10px] font-black uppercase tracking-widest text-gray-600">
                                        <Clock size={12} className="text-blue-500" />
                                        {blog.readTime}
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3 block">
                                        {new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h2 className="text-xl font-black text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-500 font-medium leading-relaxed line-clamp-3 text-sm flex-1">
                                        {blog.excerpt}
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-900">Read Article</span>
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
