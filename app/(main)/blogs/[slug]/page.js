import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { Clock, User, ArrowLeft, Calendar } from "lucide-react";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    await dbConnect();
    const blog = await Blog.findOne({ slug });

    if (!blog) {
        return { title: 'Blog Not Found' };
    }

    return {
        title: blog.seoTitle || `${blog.title} | Hike The Himalaya`,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.seoKeywords?.length ? blog.seoKeywords : [blog.title, "Himachal travel blog"],
        openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.excerpt,
            images: [{ url: blog.image }],
        }
    };
}

async function getBlog(slug) {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    return {
        ...blog,
        _id: blog._id.toString(),
        createdAt: blog.createdAt.toISOString()
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full flex items-end justify-center pt-32 pb-16 px-4">
                <Image 
                    src={blog.image || '/images/hero/spiti.jpg'} 
                    alt={blog.title} 
                    fill 
                    className="object-cover absolute inset-0"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                
                <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-black uppercase tracking-widest mb-8 transition-colors">
                        <ArrowLeft size={14} /> Back to Journal
                    </Link>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                        {blog.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-white/80">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-blue-400" />
                            {blog.author}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-400" />
                            {new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-400" />
                            {blog.readTime}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="w-full max-w-3xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div 
                        className="prose prose-lg prose-blue max-w-none text-gray-700 leading-loose prose-headings:font-black prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Posted In</h4>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, i) => (
                                    <span key={i} className="bg-gray-50 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
