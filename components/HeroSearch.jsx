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
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Desktop: horizontal row | Mobile: stacked */}
                <div className="flex flex-col sm:flex-row">

                    {/* Destination */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
                        <MapPin size={18} className="text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Destination</p>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where do you want to go?"
                                className="w-full bg-transparent outline-none text-gray-800 font-medium text-sm placeholder-gray-300"
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-200">
                        <Calendar size={18} className="text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Travel Date</p>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-800 font-medium text-sm cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Travelers */}
                    <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 border-gray-200">
                        <Users size={18} className="text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Travelers</p>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full bg-transparent outline-none text-gray-800 font-medium text-sm cursor-pointer appearance-none"
                            >
                                <option value="1">1 person</option>
                                <option value="2">2 persons</option>
                                <option value="4">Small group (4+)</option>
                                <option value="10">Large group (10+)</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-8 py-4 transition-colors duration-200 sm:rounded-none sm:rounded-r-2xl"
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
