"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function HeroSearch() {
    const router = useRouter();
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("1");

    const handleSearch = (e) => {
        e.preventDefault();
        const query = new URLSearchParams();
        if (destination.trim()) query.append("destination", destination.trim());
        if (date) query.append("date", date);
        if (guests) query.append("guests", guests);
        router.push(`/tours?${query.toString()}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Desktop: horizontal row | Mobile: stacked */}
                <div className="flex flex-col sm:flex-row">

                    {/* Destination */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
                        <MapPin size={18} className="text-blue-400 shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Destination</p>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where do you want to go?"
                                className="w-full bg-transparent outline-none text-white font-bold text-sm placeholder-white/30"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-white/10">
                        <Calendar size={18} className="text-blue-400 shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Travel Date</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-transparent outline-none text-white font-bold text-sm cursor-pointer [color-scheme:dark]"
                            />
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 border-white/10">
                        <Users size={18} className="text-blue-400 shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-0.5">Travelers</p>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full bg-transparent outline-none text-white font-bold text-sm cursor-pointer appearance-none"
                            >
                                <option value="1" className="bg-gray-900">1 person</option>
                                <option value="2" className="bg-gray-900">2 persons</option>
                                <option value="4" className="bg-gray-900">Small group (4+)</option>
                                <option value="10" className="bg-gray-900">Large group (10+)</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black uppercase tracking-widest text-xs px-10 py-5 transition-all duration-300 sm:rounded-none sm:rounded-r-2xl shadow-xl shadow-blue-600/20"
                    >
                        <Search size={18} />
                        <span>Search</span>
                    </button>

                </div>
            </div>

            <p className="text-white/50 text-[11px] font-medium mt-4 text-center">
                Explore 100+ handpicked destinations across the Himalayas
            </p>
        </form>
    );
}
