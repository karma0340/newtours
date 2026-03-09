import React from 'react';
import Image from "next/image";

const Logo = ({ className = "", variant = "light", priority = false }) => {
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
                {/* Logo Icon - Enlarged universally for all screen sizes */}
                <div className="relative w-38 h-38 overflow-hidden flex items-center justify-center shrink-0">
                    <Image
                        src="/hikethehimalyalogo.png"
                        alt="Logo Icon"
                        fill
                        sizes="112px"
                        className="object-contain"
                        priority={priority}
                    />
                </div>

                {/* Branding Text */}
                <div className="flex flex-col ml-2 leading-none shrink-0">
                    <span className={`font-black text-2xl tracking-tight uppercase ${textColor}`}>
                        Hike The
                    </span>
                    <span className="font-black text-2xl tracking-tight uppercase text-blue-600">
                        Himalaya
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Logo;
