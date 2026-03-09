
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    // Only allow in development or if explicitly enabled
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ message: "Not allowed in production" }, { status: 403 });
    }

    try {
        await dbConnect();

        // Clear existing data? Maybe better to just upsert.
        // For this task, let's clear to ensure clean state.
        await Tour.deleteMany({});
        await User.deleteMany({});

        // Create Admin User
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
            name: "Administrator",
            email: "admin",
            password: hashedPassword,
            role: "admin",
            provider: "credentials"
        });

        // Create Regular User
        await User.create({
            name: "John Doe",
            email: "john@example.com",
            password: hashedPassword,
            role: "user",
            provider: "credentials"
        });

        // Create Tours
        const tours = [
            {
                title: "Manali – Solang Valley Escape",
                slug: "manali-solang-valley",
                destination: "Manali, Himachal Pradesh",
                description: "Experience the magic of Manali with Solang Valley, Rohtang Pass, and riverside camping.",
                price: 8499,
                duration: "5 Days / 4 Nights",
                images: ["/images/hero/contact.jpg"],
                featured: true,
                startDate: new Date("2026-06-01"),
                availableSeats: 20,
                rating: 4.9,
                numReviews: 214,
                category: ["popular", "adventure", "nature"],
                itinerary: [
                    { day: 1, title: "Arrival", details: "Arrive in Manali and transfer to hotel." },
                    { day: 2, title: "Solang Valley", details: "Visit Solang Valley for snow activities." },
                ]
            },
            {
                title: "Spiti Valley Cold Desert Odyssey",
                slug: "spiti-valley-odyssey",
                destination: "Spiti Valley, Himachal Pradesh",
                description: "Explore the stark beauty of Spiti Valley with Key Monastery and Chandratal Lake.",
                price: 14999,
                duration: "8 Days / 7 Nights",
                images: ["/images/hero/tour-hero.jpg"],
                featured: true,
                startDate: new Date("2026-07-01"),
                availableSeats: 15,
                rating: 4.8,
                numReviews: 178,
                category: ["offbeat", "adventure", "trekking"],
                itinerary: [
                    { day: 1, title: "Shimla to Kalpa", details: "Begin your journey to the high Himalayas." },
                ]
            },
            {
                title: "Shimla – Kufri Heritage Trail",
                slug: "shimla-kufri-heritage",
                destination: "Shimla & Kufri, Himachal Pradesh",
                description: "Relax in the historical hill station of Shimla and enjoy the snow in Kufri.",
                price: 6499,
                duration: "4 Days / 3 Nights",
                images: ["/images/hero/home.jpg"],
                featured: true,
                startDate: new Date("2026-05-15"),
                availableSeats: 25,
                rating: 4.7,
                numReviews: 312,
                category: ["popular", "nature"],
                itinerary: [
                    { day: 1, title: "Arrival", details: "Welcome to the Queen of Hills." },
                ]
            },
            {
                title: "Kasol – Kheerganga Trek",
                slug: "kasol-kheerganga",
                destination: "Kasol & Parvati Valley",
                description: "A popular trek to the hot springs of Kheerganga through the mystical Parvati Valley.",
                price: 9299,
                duration: "6 Days / 5 Nights",
                images: ["/images/hero/about-team.jpg"],
                featured: true,
                startDate: new Date("2026-06-10"),
                availableSeats: 20,
                rating: 4.8,
                numReviews: 156,
                category: ["adventure", "offbeat", "trekking"],
                itinerary: [
                    { day: 1, title: "Kasol Arrival", details: "Relax by the Parvati River." },
                ]
            },
            {
                title: "Dharamshala – McLeod Ganj Spiritual Sojourn",
                slug: "dharamshala-mcleod-ganj",
                destination: "Dharamshala, Himachal Pradesh",
                description: "Immerse yourself in Tibetan culture and spirituality in the home of the Dalai Lama.",
                price: 7799,
                duration: "5 Days / 4 Nights",
                images: ["/images/hero/about.jpg"],
                featured: true,
                startDate: new Date("2026-08-01"),
                availableSeats: 30,
                rating: 4.9,
                numReviews: 289,
                category: ["spiritual", "popular", "culture"],
                itinerary: [
                    { day: 1, title: "Mcleodganj Arrival", details: "Check into your hotel." },
                ]
            },
            {
                title: "Bir Billing Paragliding Adventure",
                slug: "bir-billing-paragliding",
                destination: "Bir Billing, Himachal Pradesh",
                description: "Fly like a bird from one of the highest paragliding sites in the world.",
                price: 5999,
                duration: "3 Days / 2 Nights",
                images: ["/images/hero/home.jpg"],
                featured: true,
                startDate: new Date("2026-09-01"),
                availableSeats: 15,
                rating: 4.9,
                numReviews: 98,
                category: ["adventure", "nature"],
                itinerary: [
                    { day: 1, title: "Bir Arrival", details: "Explore the local monasteries." },
                ]
            },
        ];

        await Tour.insertMany(tours);

        return NextResponse.json({ message: "Seed data created successfully" });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ message: "Error seeding data", error: error.message }, { status: 500 });
    }
}
