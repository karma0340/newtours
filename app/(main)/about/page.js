
import Image from "next/image";
import { Award, Users, Mountain, Heart, ShieldCheck, Bus, Truck, Compass, Car } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

export const metadata = {
    title: "About Us - Hike The Himalaya | Top Taxi Service & Tour Experts",
    description: "Learn about Hike The Himalaya, a leading tour and travels agency in Himachal. We own our fleet of luxury buses and taxis for the best mountain journeys.",
    keywords: [
        "top taxi service",
        "tour and travels",
        "Hike The Himalaya Story",
        "Himachal fleet service",
        "Volvo bus tours Himachal"
    ],
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
                <HeroSlider opacity="opacity-60" overlayColor="from-black/60 via-black/30 to-white" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
                        Our <span className="text-blue-500 italic">Story</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-medium leading-relaxed">
                        We are passionate about creating unforgettable travel experiences in the heart of the Himalayas.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/hero/about_team_wide.png"
                            alt="Our Team"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Founded in 2024, NewTours began with a simple mission: to make the beauty of Himachal accessible to everyone. We believe that trekking the Himalayas is not just about the summit, but about connecting with nature and yourself.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            From humble beginnings as a small group of travel enthusiasts, we have grown into a leading travel agency, serving thousands of happy travelers each year. Our team of experts meticulously crafts each itinerary to ensure a perfect blend of adventure, relaxation, and cultural immersion.
                        </p>
                        <div className="pt-6 grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-4xl font-bold text-blue-600 mb-2">5k+</span>
                                <span className="text-gray-500">Happy Travelers</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold text-blue-600 mb-2">50+</span>
                                <span className="text-gray-500">Destinations</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">We are committed to excellence in every aspect of your journey.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-8 bg-gray-50 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-blue-600">
                            <Award size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                        <p className="text-gray-600">We settle for nothing less than the best in service and quality.</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-green-600">
                            <Mountain size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Himalayan Expertise</h3>
                        <p className="text-gray-600">Our deep knowledge of Himachal's terrain ensures safety and wonder.</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-purple-600">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                        <p className="text-gray-600">We foster a community of like-minded travelers.</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl text-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-red-600">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
                        <p className="text-gray-600">We love what we do and it shows in every trip we plan.</p>
                    </div>
                </div>

                {/* Fleet Highlights */}
                <div className="mt-32">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20" />

                        <div className="max-w-xl relative z-10">
                            <span className="text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Infrastructure</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">We Own Our <span className="text-blue-500 italic">Fleet.</span></h2>
                            <p className="text-gray-400 leading-relaxed mb-10 font-medium">
                                Unlike other agencies, we don't outsource your safety. NewTours maintains a private fleet of over 20+ specialized Himalayan vehicles, ranging from luxury Volvo buses to rugged 4x4 SUVs.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-white text-sm font-bold">Safety Tested</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                                        <Users size={20} />
                                    </div>
                                    <span className="text-white text-sm font-bold">Local Experts</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                            {[
                                { name: "Touring Buses", icon: <Bus size={24} />, desc: "45-Seater Luxury" },
                                { name: "SUV Squad", icon: <Car size={24} />, desc: "Innova Crysta & Scorpio" },
                                { name: "Mini Buses", icon: <Truck size={24} />, desc: "12-17 Seater Travellers" },
                                { name: "Expedition 4x4", icon: <Compass size={24} />, desc: "For Offbeat Valleys" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all cursor-default group">
                                    <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                    <h4 className="text-white font-black text-sm mb-1 uppercase tracking-wider">{item.name}</h4>
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
