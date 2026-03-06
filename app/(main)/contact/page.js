
"use client";

import { useState } from "react";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, MessageSquare, Clock, Globe } from "lucide-react";
=======
import { Mail, Phone, MapPin, Send } from "lucide-react";
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
import { toast } from "react-hot-toast";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
<<<<<<< HEAD
            toast.success("Message received! Our Himalayan experts will reach out shortly.");
=======
            toast.success("Message sent successfully! We'll get back to you soon.");
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
            setLoading(false);
            e.target.reset();
        }, 1500);
    };

    return (
<<<<<<< HEAD
        <div className="bg-[#fcfcfd] min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/contact-hero.png"
                        alt="Himalayan Mountains"
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fcfcfd]" />
                </div>

                <div className="relative z-10 text-center px-4 pt-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 backdrop-blur-md border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6"
                    >
                        Connect With Us
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        Start Your <span className="text-blue-500">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Our team of experienced Himalayan explorers is ready to help you plan your next legendary adventure.
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-5 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100"
                        >
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Office in the Clouds</h2>
                            <p className="text-gray-500 font-medium mb-10 text-sm">Find us at the heart of the mountains.</p>

                            <div className="space-y-10">
                                <div className="flex gap-5 group">
                                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-2">Basecamp Location</h3>
                                        <p className="text-gray-700 font-bold leading-relaxed">
                                            Shimla, Himachal Pradesh,<br />
                                            India, PIN: 171001
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5 group">
                                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-2">Direct Lines</h3>
                                        <p className="text-gray-700 font-bold text-lg">+91 85805 66099</p>
                                        <p className="text-gray-700 font-bold text-lg">+91 80919 66099</p>
                                        <div className="flex items-center gap-2 mt-2 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Available 24/7 for travelers
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-5 group">
                                    <div className="w-14 h-14 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-[10px] mb-2">Official Email</h3>
                                        <p className="text-gray-700 font-bold transition-colors group-hover:text-violet-600 break-all">
                                            info.hikethehimalaya@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-gray-100">
                                <h4 className="font-extrabold text-gray-900 mb-6 text-sm uppercase tracking-widest">Follow Our Expedition</h4>
                                <a
                                    href="https://www.instagram.com/hikethehimalaya.in?igsh=MTB5c3p5ZzhoeHlkaw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-pink-500/20"
                                >
                                    <Instagram size={20} />
                                    Follow on Instagram
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-blue-400">Join the Community</span>
                                </div>
                                <h3 className="text-2xl font-black mb-4">Are you a trek leader?</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">We are always looking for passionate Himalayan experts to join our elite squad.</p>
                                <button className="text-sm font-black border-b-2 border-blue-500 pb-1 hover:text-blue-400 transition-colors uppercase tracking-widest">Contact Recruitment</button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-10">
                                <Globe size={180} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 h-full"
                        >
                            <div className="mb-10">
                                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Send a Message</h2>
                                <p className="text-gray-500 font-medium max-w-md">Drop us a line and we'll connect you with a specialist tailored to your destination.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                                    <select className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-gray-900 appearance-none">
                                        <option>Trip Inquiry</option>
                                        <option>Custom Itinerary Plan</option>
                                        <option>Booking Support</option>
                                        <option>Partnership Proposal</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Tell us about your plans</label>
                                    <textarea
                                        required
                                        rows="6"
                                        className="w-full px-6 py-5 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none font-bold text-gray-900 placeholder:text-gray-300 resize-none"
                                        placeholder="I'm planning a trek to..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-sm py-6 rounded-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-gray-900/10 hover:shadow-blue-600/30 flex items-center justify-center gap-3 group active:scale-[0.99]"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Begin Consultation
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder/Brand Detail */}
            <div className="bg-white border-t border-gray-100 py-24">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mb-8">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">The Mountains are Calling</h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto mb-12">
                        Whether you're a seasoned mountaineer or planning your first trek, we're here to provide the expertise, gear, and guidance you need.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <p className="text-2xl font-black text-gray-900">50+</p>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Peak Expeditions</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">10k+</p>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Happy Trekkers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">24/7</p>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Expert Support</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">100%</p>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Safe Travel</p>
                        </div>
=======
        <div className="bg-white min-h-screen">
            <div className="relative py-24 bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Have questions? We're here to help. Reach out to our team.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Visit Us</h3>
                                    <p className="text-gray-600">123 Travel Street, Adventure City<br />AC 56789, United States</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                                    <p className="text-gray-600">Mon-Fri from 9am to 6pm.</p>
                                    <p className="text-blue-600 font-bold mt-1">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                                    <p className="text-gray-600">Our friendly team is here to help.</p>
                                    <p className="text-blue-600 font-bold mt-1">hello@newtours.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea required rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="How can we help you?"></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                            </button>
                        </form>
>>>>>>> 83f301b40ffdd3faf73ceb2a984eb25694f39870
                    </div>
                </div>
            </div>
        </div>
    );
}
