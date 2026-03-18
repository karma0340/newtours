
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Star, Share2, Heart, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft, Info, Calendar, Sparkles, Bus, Car } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import BookingForm from "@/components/BookingForm";
import HeroSlider from "@/components/HeroSlider";

async function getTour(slug) {
    await dbConnect();
    const tour = await Tour.findOne({ slug }).lean();
    if (!tour) return null;
    return JSON.parse(JSON.stringify(tour));
}

// NextJS native caching instruction to cache this page logic instead of repeatedly calling db
export const revalidate = 3600; // Cache this dynamic route for an hour

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tour = await getTour(slug);

    if (!tour) {
        return {
            title: "Tour Not Found",
        };
    }

    return {
        title: tour.title,
        description: `${tour.title} in ${tour.destination}. Duration: ${tour.duration}. ${tour.description.slice(0, 150)}...`,
        keywords: [
            tour.title,
            tour.destination,
            "top 10 treks in Himachal",
            "top 10 tour and travels",
            "taxi service",
            "top taxi service",
            "chandigarh to manali tour package",
            "Hike The Himalaya",
            "hike the himalaya treks",
            "Himalaya Trekking",
            "Himachal Tour Packages"
        ],
        openGraph: {
            title: tour.title,
            description: tour.description.slice(0, 160),
            images: [
                {
                    url: tour.image || "/icon.png",
                    width: 1200,
                    height: 630,
                    alt: tour.title,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: tour.title,
            description: tour.description.slice(0, 160),
            images: [tour.image || "/icon.png"],
        },
        alternates: {
            canonical: `https://hikethehimalaya.in/tours/${tour.slug}`,
        },
    };
}

export default async function TourDetailsPage({ params }) {
    const { slug } = await params;
    const tour = await getTour(slug);

    if (!tour) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.description,
        image: tour.image || "https://hikethehimalaya.in/icon.png",
        touristType: ["Adventure Seekers", "Nature Lovers"],
        subjectOf: {
            '@type': 'CreativeWork',
            name: "Hike The Himalaya Packages"
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Top Navigation / Breadcrumbs Bar */}
            <div className="bg-gray-900 py-4 border-b border-white/5 sticky top-0 z-[60] backdrop-blur-md bg-gray-900/90">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/tours" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-all border border-white/10 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={14} className="text-gray-600" />
                            <Link href="/tours" className="text-gray-400 hover:text-white transition-colors">Tours</Link>
                            <ChevronRight size={14} className="text-gray-600" />
                            <span className="text-blue-400 truncate max-w-[200px]">{tour.title}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10">
                            <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors border border-white/20">
                            <Heart size={16} /> <span className="hidden sm:inline">Save</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Gallery Section */}
            <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-gray-900">
                <HeroSlider opacity="opacity-80" overlayColor="from-gray-950 via-gray-950/20 to-transparent" />

                <div className="absolute bottom-12 left-0 w-full">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-4 mb-6">
                                <span className="px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-600/30">
                                    <Sparkles size={12} className="inline mr-1 mb-0.5" /> Featured Experience
                                </span>
                                <span className="px-4 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
                                    <MapPin size={12} className="inline mr-1 mb-0.5 text-blue-400" /> {tour.destination}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                                {tour.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-gray-200">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Duration</span>
                                    <span className="flex items-center gap-2 text-xl font-bold"><Clock size={20} className="text-blue-500" /> {tour.duration}</span>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-1">Guest Rating</span>
                                    <span className="flex items-center gap-2 text-xl font-bold"><Star size={20} className="text-yellow-500 fill-yellow-500" /> {tour.rating} <span className="text-sm font-medium text-gray-400">({tour.numReviews || 0} Reviews)</span></span>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">Group Size</span>
                                    <span className="flex items-center gap-2 text-xl font-bold"><Info size={20} className="text-green-500" /> Up to 15 People</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content Area */}
                    <div className="lg:w-2/3 space-y-20">
                        {/* Highlights Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Voyage Overview</h2>
                            </div>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
                                {tour.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "Expert Guides", desc: "Native speakers with technical climbing expertise.", icon: <ShieldCheck className="text-blue-600" /> },
                                    { title: "Safety First", desc: "First-aid certified staff and oxygen supplies included.", icon: <ShieldCheck className="text-blue-600" /> },
                                    { title: "Heritage Stays", desc: "Handpicked boutique boutique and luxury camp stays.", icon: <ShieldCheck className="text-blue-600" /> },
                                    { title: "Pure Cuisine", desc: "Hygienic local meals prepared with organic ingredients.", icon: <ShieldCheck className="text-blue-600" /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-4 hover:shadow-xl transition-all duration-300">
                                        <div className="shrink-0 p-3 bg-white rounded-2xl shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Itinerary Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-1.5 h-10 bg-blue-600 rounded-full" />
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Detailed Itinerary</h2>
                            </div>

                            <div className="space-y-6">
                                {tour.itinerary && tour.itinerary.length > 0 ? (
                                    tour.itinerary.map((day, i) => (
                                        <div key={i} className="relative pl-12 pb-12 last:pb-0 group">
                                            {/* Timeline Line */}
                                            <div className="absolute left-6 top-2 bottom-0 w-px bg-gray-200 group-last:hidden" />
                                            {/* Timeline Dot */}
                                            <div className="absolute left-2.5 top-0 w-8 h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-xs font-black text-blue-600 z-10 shadow-lg shadow-blue-600/20">
                                                {day.day}
                                            </div>

                                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                                                <h3 className="text-xl font-black text-gray-900 mb-4">{day.title}</h3>
                                                <p className="text-gray-600 leading-relaxed">{day.details}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                                        <p className="text-gray-500 font-bold">Standard itinerary for this tour is being updated. Contact us for details.</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Itinerary Section ... (lines 134-162) */}

                        {/* Premium Logistics Section */}
                        <section className="bg-gray-900 rounded-[3rem] p-12 overflow-hidden relative border border-white/5 shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-10" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1.5 h-10 bg-blue-500 rounded-full" />
                                    <h2 className="text-3xl font-black text-white tracking-tight uppercase">Premium Logistics</h2>
                                </div>
                                <p className="text-gray-400 text-lg mb-12 font-medium max-w-2xl leading-relaxed">
                                    We believe the journey itself should be as majestic as the destination. That's why we utilize our own elite fleet for all Himachal expeditions.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] group hover:bg-white/10 transition-all">
                                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                            <Bus size={28} />
                                        </div>
                                        <h4 className="text-white font-black text-xl mb-3">Group Transfers</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Luxury Volvo Multi-Axle buses with air-suspension and ergonomic reclining seats for long-distance comfort.
                                        </p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] group hover:bg-white/10 transition-all">
                                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                            <Car size={28} />
                                        </div>
                                        <h4 className="text-white font-black text-xl mb-3">Mountain Squad</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            Specialized SUV fleet including Innova Crysta and Scorpio 4x4 for reaching remote base camps and high-altitude valleys.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 pt-10 border-t border-white/5 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <CheckCircle2 size={18} className="text-blue-500" /> Professional Drivers
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <CheckCircle2 size={18} className="text-blue-500" /> Carrier & Ropes
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm font-bold uppercase tracking-widest">
                                        <CheckCircle2 size={18} className="text-blue-500" /> 24/7 Assistance
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="bg-blue-50/50 p-10 rounded-[2.5rem] border border-blue-100/50">
                                <h3 className="text-xl font-black text-blue-900 mb-8 flex items-center gap-3">
                                    <CheckCircle2 className="text-blue-600" /> What's Included
                                </h3>
                                <ul className="space-y-5">
                                    {["Premium Hotel & Luxury Camp Stays", "Expert Local Guide Fees", "All Internal Transfers in SUV", "All Meals (Himachali / Continental)", "Sightseeing & Entry Permits", "Backup Vehicle & Support Staff"].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-bold text-blue-800">
                                            <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                    <Info className="text-gray-400" /> House Rules
                                </h3>
                                <ul className="space-y-5">
                                    {["Carry valid Photo ID / Aadhaar", "Please bring waterproof clothing", "Respect local traditions & culture", "Follow LNT (Leave No Trace) principles", "No smoking at high altitude", "Adventure insurance recommended"].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28">
                            <BookingForm tour={tour} />

                            <div className="mt-8 bg-blue-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                                <div className="absolute inset-0 opacity-10 bg-[url('/images/hero/contact_new_wide.png')] bg-cover bg-center" />
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black mb-4 flex items-center gap-2 tracking-tight">
                                        <Info size={20} className="text-blue-400" /> Need Help?
                                    </h4>
                                    <p className="text-sm text-blue-100 leading-relaxed mb-6 font-medium">
                                        Can't find the perfect date or have specific requirements? Our travel design team is ready to help you.
                                    </p>
                                    <Link href="/contact" className="inline-flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-widest border-b-2 border-blue-500 pb-1 hover:border-white transition-all">
                                        Contact Expert Support <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Your Next Epic Adventure Awaits.</h2>
                            <p className="text-lg text-gray-500 font-medium">Be the first to know about our flash sales and newly discovered hidden gems in the Himalayas.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                className="px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-bold text-gray-900 w-full sm:w-80"
                            />
                            <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
