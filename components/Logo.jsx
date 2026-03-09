import React from 'react';
import Image from "next/image";

const Logo = ({ className = "", variant = "light" }) => {
    const textColor = variant === "light" ? "text-white" : "text-gray-900";
    
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="relative flex items-center group">
                {/* 
                    Direct Image approach with background removal via mix-blend-mode.
                    This keeps the ORIGINAL colors of your logo (no overlays/masks).
                    'mix-blend-mode: multiply' or 'screen' can remove the background 
                    without changing the content colors.
                */}
                <div className="relative w-24 h-24 overflow-hidden">
                    <Image 
                        src="/hikethehimalyalogo.jpeg" 
                        alt="Logo Icon" 
                        fill
                        className="object-contain"
                        style={{ 
                            mixBlendMode: variant === 'light' ? 'screen' : 'multiply',
                            filter: 'contrast(1.2)' // Sharpening slightly for better visibility
                        }}
                    />
                </div>
                
                {/* Branding Text */}
                <div className="flex flex-col ml-1 leading-[0.9]">
                    <span className={`font-black text-2xl tracking-tighter uppercase ${textColor}`}>
                        Hike The
                    </span>
                    <span className="font-black text-2xl tracking-tighter uppercase text-blue-600">
                        Himalaya
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Logo;
