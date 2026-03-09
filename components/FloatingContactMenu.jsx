"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Instagram, X } from "lucide-react";
import { useState } from "react";

export default function FloatingContactMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // Replace these with actual business details
    const phoneNumber = "+918580566099";
    const whatsappNumber = "918580566099"; // Format: country code without '+' followed by number
    const whatsappMessage = "Hello! I'm interested in booking a tour with Hike The Himalaya. Can you help me?";
    const instagramHandle = "hikethehimalya.official"; // Updated to match brand name

    return (
        <div className="fixed bottom-6 right-4 sm:right-6 z-[90] flex flex-col items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.8 }}
                        transition={{ duration: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="flex flex-col gap-3 mr-1 pointer-events-auto"
                    >
                        {/* Call Action */}
                        <motion.a
                            href={`tel:${phoneNumber}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="flex items-center justify-end gap-3 group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest bg-white text-gray-900 px-3 py-1.5 rounded-lg shadow-xl shadow-black/5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                Call Us
                            </span>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <Phone size={20} className="fill-current" />
                            </div>
                        </motion.a>

                        {/* WhatsApp Action */}
                        <motion.a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center justify-end gap-3 group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-xl shadow-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                WhatsApp
                            </span>
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 text-white group-hover:scale-110 transition-transform duration-300">
                                <MessageCircle size={22} className="fill-current" />
                            </div>
                        </motion.a>

                        {/* Instagram Action */}
                        <motion.a
                            href={`https://instagram.com/${instagramHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="flex items-center justify-end gap-3 group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-lg shadow-xl shadow-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                Instagram
                            </span>
                            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/30 text-white group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                                <Instagram size={24} />
                            </div>
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <div className="flex items-center gap-3 pointer-events-auto">
                {!isOpen && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-blue-100 hidden sm:block"
                    >
                        Contact Experts
                    </motion.span>
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 z-50 border-4 ${
                        isOpen 
                            ? 'bg-gray-900 border-gray-800 shadow-gray-900/30' 
                            : 'bg-blue-600 border-blue-400 shadow-blue-600/40'
                    }`}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={28} className="text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageCircle size={28} className="text-white fill-white/20" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Pulse ring when closed */}
                    {!isOpen && (
                        <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping opacity-30" />
                    )}
                </motion.button>
            </div>
        </div>
    );
}

