
import Image from "next/image";
import { Award, Users, Globe, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="relative py-24 bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">About NewTours</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We are passionate about creating unforgettable travel experiences for adventurers around the globe.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                            alt="Our Team"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Founded in 2024, NewTours began with a simple mission: to make the world accessible to everyone. We believe that travel is not just about visiting new places, but about connecting with cultures, people, and yourself.
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
                            <Globe size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
                        <p className="text-gray-600">Our network spans across continents to bring you the best.</p>
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
            </div>
        </div>
    );
}
