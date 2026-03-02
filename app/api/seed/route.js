
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
