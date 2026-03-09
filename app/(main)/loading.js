
export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
            <div className="relative flex flex-col items-center">
                {/* Premium Spinner */}
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin shadow-2xl shadow-blue-500/20" />
                
                {/* Branding or Text */}
                <div className="mt-8 text-center">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                        Hike the <span className="text-blue-600 italic">Himalayas</span>
                    </h2>
                    <p className="mt-2 text-xs font-bold text-gray-400 uppercase tracking-[0.3em] animate-pulse">
                        Preparing your journey...
                    </p>
                </div>

                {/* Decorative background elements */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl animate-blob" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-100/50 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>
        </div>
    );
}
