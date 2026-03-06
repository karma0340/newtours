
import Image from "next/image";
<<<<<<< HEAD
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, Star, Share2, Heart, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft, Info, Calendar, Sparkles } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import BookingForm from "@/components/BookingForm";
=======
import { notFound } from "next/navigation";
import { MapPin, Clock, Star, Calendar, CheckCircle } from "lucide-react";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import BookingForm from "@/components/BookingForm";
import Reviews from "@/components/Reviews";
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870

async function getTour(slug) {
    await dbConnect();
    const tour = await Tour.findOne({ slug }).lean();
    if (!tour) return null;
    return JSON.parse(JSON.stringify(tour));
}

<<<<<<< HEAD
export default async function TourDetailsPage({ params }) {
    const { slug } = await params;
    const tour = await getTour(slug);
=======
export default async function TourDetailsPage(props) {
    const params = await props.params;
    const tour = await getTour(params.slug);
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870

    if (!tour) {
        notFound();
    }

    return (
<<<<<<< HEAD
        <div className="bg-white min-h-screen">
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
=======
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] w-full">
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                <Image
                    src={tour.images[0] || 'https://via.placeholder.com/1920x1080'}
                    alt={tour.title}
                    fill
<<<<<<< HEAD
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

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
=======
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{tour.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-200">
                        <div className="flex items-center gap-1">
                            <MapPin size={18} className="text-blue-400" />
                            {tour.destination}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={18} className="text-blue-400" />
                            {tour.duration}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            {tour.rating} ({tour.numReviews} reviews)
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                        </div>
                    </div>
                </div>
            </div>

<<<<<<< HEAD
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
=======
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {tour.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                            <div className="space-y-6">
                                {tour.itinerary.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {item.day}
                                            </div>
                                            <div className="h-full w-0.5 bg-gray-100 my-2 group-last:hidden"></div>
                                        </div>
                                        <div className="pb-6">
                                            <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                            <p className="text-gray-600">{item.details}</p>
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

<<<<<<< HEAD
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

                        {/* Inclusions & Exclusions */}
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
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
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
=======
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Accommodation in 4-star hotels</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Daily Breakfast & Dinner</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Professional Guide</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                                    <span className="text-gray-700">Transportation in AC vehicle</span>
                                </div>
                            </div>
                        </section>

                        <Reviews tourId={tour._id} />
                    </div>

                    {/* Sidebar - Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BookingForm tour={tour} />
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< HEAD

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
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
        </div>
    );
}
