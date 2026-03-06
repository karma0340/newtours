
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
            name: "Admin User",
            email: "admin@example.com",
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
<<<<<<< HEAD
                title: "Manali – Solang Valley Escape",
                slug: "manali-solang-valley",
                destination: "Manali, Himachal Pradesh",
                description: "Experience the magic of Manali with Solang Valley, Rohtang Pass, and riverside camping.",
                price: 8499,
                duration: "5 Days / 4 Nights",
                images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop"],
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
                images: ["https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=800&auto=format&fit=crop"],
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
                images: ["https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=800&auto=format&fit=crop"],
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
                images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"],
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
                images: ["https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=800&auto=format&fit=crop"],
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
                images: ["https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"],
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
            {
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                title: "Paris Explorer",
                slug: "paris-explorer",
                destination: "Paris, France",
                description: "Explore the city of love with our comprehensive 5-day tour.",
                price: 1299,
                duration: "5 Days / 4 Nights",
                images: ["https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=800&auto=format&fit=crop"],
                featured: true,
                startDate: new Date("2026-06-01"),
                availableSeats: 20,
                rating: 4.8,
                numReviews: 12,
<<<<<<< HEAD
                category: ["international", "culture"],
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                itinerary: [
                    { day: 1, title: "Arrival", details: "Arrive in Paris and transfer to hotel." },
                    { day: 2, title: "City Tour", details: "Visit the Eiffel Tower and Louvre Museum." },
                    { day: 3, title: "Versailles", details: "Day trip to the Palace of Versailles." },
                    { day: 4, title: "Free Day", details: "Explore the city at your own leisure." },
                    { day: 5, title: "Departure", details: "Transfer to airport for departure." },
                ]
            },
            {
                title: "Tokyo Adventure",
                slug: "tokyo-adventure",
                destination: "Tokyo, Japan",
                description: "Experience the perfect blend of tradition and future in Tokyo.",
                price: 1599,
                duration: "7 Days / 6 Nights",
                images: ["https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop"],
                featured: true,
                startDate: new Date("2026-07-15"),
                availableSeats: 15,
                rating: 4.9,
                numReviews: 25,
<<<<<<< HEAD
                category: ["international", "culture", "adventure"],
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                itinerary: [
                    { day: 1, title: "Arrival in Tokyo", details: "Welcome dinner and check-in." },
                    { day: 2, title: "Shibuya & Harajuku", details: "Walking tour of fashion districts." },
                    { day: 3, title: "Asakusa & Temples", details: "Visit Senso-ji temple and traditional streets." },
                    { day: 4, title: "Kyoto Day Trip", details: "Bullet train to Kyoto." },
                ]
            },
            {
                title: "Bali Bliss",
                slug: "bali-bliss",
                destination: "Bali, Indonesia",
                description: "Relax on the beautiful beaches of Bali.",
                price: 899,
                duration: "6 Days / 5 Nights",
                images: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop"],
                featured: true,
                startDate: new Date("2026-08-10"),
                availableSeats: 30,
                rating: 4.7,
                numReviews: 18,
<<<<<<< HEAD
                category: ["international", "nature", "spiritual"],
=======
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                itinerary: [
                    { day: 1, title: "Welcome to Bali", details: "Airport pickup and resort check-in." },
                    { day: 2, title: "Ubud Tour", details: "Visit the Monkey Forest and rice terraces." },
                ]
            }
        ];

        await Tour.insertMany(tours);

        return NextResponse.json({ message: "Seed data created successfully" });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ message: "Error seeding data", error: error.message }, { status: 500 });
    }
}
