"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Instagram } from "lucide-react";

export default function FloatingActions() {
    const actions = [
        {
            icon: <MessageCircle size={24} />,
            color: "bg-green-500",
            label: "WhatsApp",
            href: "https://wa.me/91XXXXXXXXXX", // Replace with actual number
            delay: 0.1
        },
        {
            icon: <Phone size={24} />,
            color: "bg-blue-600",
            label: "Call Us",
            href: "tel:+91XXXXXXXXXX", // Replace with actual number
            delay: 0.2
        },
        {
            icon: <Instagram size={24} />,
            color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600",
            label: "Instagram",
            href: "https://instagram.com/yourhandle", // Replace with actual handle
            delay: 0.3
        }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
            {actions.map((action, index) => (
                <motion.a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: action.delay, type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${action.color} text-white p-4 rounded-full shadow-2xl flex items-center justify-center group relative`}
                >
                    {action.icon}
                    
                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                        {action.label}
                    </span>
                    
                    {/* Ring animation */}
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-20 ${action.color}`} style={{ animationDuration: '3s' }} />
                </motion.a>
            ))}
        </div>
    );
}
