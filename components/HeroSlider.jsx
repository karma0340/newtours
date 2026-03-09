"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DEFAULT_HERO_IMAGES = [
    "/images/hero/home_adventure_wide.png",
    "/images/hero/about_new_wide.png",
    "/images/hero/vehicles_fleet_wide.png",
    "/images/hero/contact_new_wide.png",
    "/images/hero/about_team_wide.png",
];

export default function HeroSlider({ 
    images = [], 
    opacity = "opacity-60", 
    overlayColor = "from-black/70 via-black/40 to-white" 
}) {
    const sliderImages = images.length > 0 ? images : DEFAULT_HERO_IMAGES;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
            <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{
                        duration: 1.5,
                        ease: [0.4, 0, 0.2, 1] // Exceptionally smooth, cinematic easing (like Material's emphasized decelerate)
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={sliderImages[currentIndex]}
                        alt="Himalayan Background"
                        fill
                        className={`object-cover ${opacity}`}
                        priority
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Design Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />
        </div>
    );
}
