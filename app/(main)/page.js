import Link from "next/link";
import Image from "next/image";
import Categories from "@/components/Categories";
import TourPackages from "@/components/TourPackages";
import Category from "@/models/Category";
import Tour from "@/models/Tour";
import dbConnect from "@/lib/db";
import HomeClient from "./HomeClient";
import HomeFeatures from "@/components/HomeFeatures";
import HeroSearch from "@/components/HeroSearch";
import redis from "@/lib/redis";
import HeroSlider from "@/components/HeroSlider";

export const metadata = {
    title: "Himachal Tour Packages | Trekking & Adventure Tours | Hike The Himalaya",
    description: "Explore the best Himachal tour packages, trekking adventures, Spiti Valley trips & Manali holidays. Book affordable travel packages with Hike The Himalaya.",
    keywords: [
        "Himachal tour packages",
        "trekking in Himalayas",
        "adventure tours India",
        "travel packages India",
        "top 10 taxi service in Chandigarh",
        "top 10 tour and travels in Himachal",
        "top 10 treks in Himachal",
        "top 10 manali tour packages",
        "near taxi",
        "taxi service",
        "tour and travels",
        "top taxi service",
        "chandigarh to manali tour package",
        "Hike The Himalaya",
        "hike the himalaya shimla",
        "best travel agency hike the himalaya"
    ],
};

// Production level caching: Revalidate homepage every 1 hour
export const revalidate = 3600;

async function getHomeData() {
    // 1. Try fetching from Redis first
    try {
        const cachedHome = await redis.get("home_data");
        if (cachedHome) {
            console.log("⚡ Serving Homepage from Redis Cache");
            return JSON.parse(cachedHome);
        }
    } catch (err) {
        console.warn("Redis fetch error (fallback to Mongo):", err);
    }

    console.log("🔍 Fetching Homepage from MongoDB");
    await dbConnect();

    // Performance Optimization: Use Projections to only fetch fields visible on cards
    const [allTours, featured, allCategories] = await Promise.all([
        Tour.find({})
            .select('title images image price location duration rating numReviews slug badge category')
            .sort({ createdAt: -1 })
            .limit(12)
            .lean(),
        Tour.find({ featured: true })
            .select('title images image destination location duration rating numReviews price slug badge description')
            .limit(10)
            .lean(),
        Category.find({ active: true })
            .sort({ order: 1, createdAt: 1 })
            .lean()
    ]);

    // High-performance serialization
    const serialize = (docs) => docs.map(doc => ({
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt?.toISOString() || null,
        updatedAt: doc.updatedAt?.toISOString() || null,
    }));

    const result = {
        tours: serialize(allTours),
        featuredTours: serialize(featured),
        categories: serialize(allCategories)
    };

    // 2. Set to Redis for 1 hour
    try {
        await redis.set("home_data", JSON.stringify(result), "EX", 3600);
    } catch (err) {
        console.warn("Redis set error:", err);
    }

    return result;
}

export default async function Home() {
    const { tours, featuredTours, categories } = await getHomeData();

    return (
        <div className="bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Hike The Himalaya",
                        "url": "https://hikethehimalaya.com",
                        "logo": "https://hikethehimalaya.com/icon.png",
                        "description": "Premium Himalayan experiences, tour packages, and taxi services in Himachal.",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+91-XXXXXXXXXX",
                            "contactType": "customer service",
                            "areaServed": "IN",
                            "availableLanguage": "en"
                        },
                        "sameAs": [
                            "https://facebook.com/hikethehimalaya",
                            "https://instagram.com/hikethehimalaya",
                            "https://twitter.com/hikethehimalaya"
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Hike The Himalaya",
                        "url": "https://hikethehimalaya.com",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://hikethehimalaya.com/tours?search={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
            {/* Hero Section - Added mt-20 to clear fixed navbar */}
            <section className="relative mt-9 h-[75vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
                <HeroSlider
                    opacity="opacity-100"
                    overlayColor="from-black/55 via-black/35 to-black/55"
                />

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
                    <span className="inline-block text-blue-300 text-[11px] font-bold uppercase tracking-[0.25em] mb-4">
                        ✦ Premium Himalayan Experiences
                    </span>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                        Experience the <span className="text-blue-400">Magic</span> of Himachal
                    </h1>

                    <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-xl mx-auto font-medium">
                        Snow-capped peaks, emerald valleys &amp; handpicked adventures — all in one place.
                    </p>

                    <HeroSearch />
                </div>
            </section>

            <Categories categories={categories} />
            <HomeClient featuredTours={featuredTours} />
            <TourPackages initialTours={tours} />
            <HomeFeatures />
        </div>
    );
}
