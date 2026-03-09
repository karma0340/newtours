"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

export default function RefreshButton() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        window.location.reload();
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm active:scale-95 disabled:opacity-50 group"
        >
            <RotateCw size={16} className={`${isRefreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            Refresh
        </button>
    );
}

