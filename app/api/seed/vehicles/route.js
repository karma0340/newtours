
import dbConnect from "@/lib/db";
import Vehicle from "@/models/Vehicle";
import { NextResponse } from "next/server";

const sampleVehicles = [
    {
        name: "Toyota Innova Crysta",
        type: "SUV",
        capacity: "6+1 Seats",
        pricePerKm: 18,
        pricePerDay: 3500,
        images: ["/images/hero/vehicle-default.jpg"],
        description: "The gold standard for Himalayan road trips. Spacious, powerful, and extremely comfortable for long mountain journeys.",
        features: ["Dual AC", "Premium Leather Seats", "Carrier & Rope", "Expert Mountain Driver"],
        available: true
    },
    {
        name: "Luxury Volvo Tourist Bus",
        type: "BUS",
        capacity: "45 Seats",
        pricePerKm: 65,
        pricePerDay: 15000,
        images: ["/images/hero/vehicle-default.jpg"],
        description: "Perfect for large groups and corporate tours. Equipped with air suspension for a smooth ride on winding roads.",
        features: ["Reclining Seats", "LCD Entertainment", "Charging Points", "Large Luggage Space"],
        available: true
    },
    {
        name: "Force Tempo Traveler",
        type: "TEMPO TRAVELER",
        capacity: "12+1 Seats",
        pricePerKm: 24,
        pricePerDay: 5500,
        images: ["/images/hero/vehicle-default.jpg"],
        description: "The most popular choice for medium-sized families and groups of friends. Best balance of cost and comfort.",
        features: ["High Roof", "Music System", "Window Curtains", "Carrier"],
        available: true
    },
    {
        name: "Mahindra Scorpio N",
        type: "SUV",
        capacity: "6+1 Seats",
        pricePerKm: 20,
        pricePerDay: 4000,
        images: ["/images/hero/vehicle-default.jpg"],
        description: "A rugged 4x4 beast ready to take you to the most offbeat locations in Spiti and Lahaul.",
        features: ["4x4 Capability", "Sunroof", "Touchscreen Audio", "All Terrain Tires"],
        available: true
    },
    {
        name: "Traveller Urbania",
        type: "TEMPO TRAVELER",
        capacity: "17+1 Seats",
        pricePerKm: 28,
        pricePerDay: 7000,
        images: ["/images/hero/vehicle-default.jpg"],
        description: "The next generation of luxury travel. Ultra-modern interiors with extra legroom for long duration tours.",
        features: ["Individual AC Vents", "Reading Lights", "Pushback Seats", "Extra Boot Space"],
        available: true
    }
];

export async function GET() {
    try {
        await dbConnect();
        // Delete existing vehicles and insert sample ones
        await Vehicle.deleteMany({});
        const vehicles = await Vehicle.insertMany(sampleVehicles);
        return NextResponse.json({ message: "Vehicles seeded successfully", count: vehicles.length });
    } catch (error) {
        return NextResponse.json({ message: "Failed to seed vehicles", error: error.message }, { status: 500 });
    }
}
