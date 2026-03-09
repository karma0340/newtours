"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import FloatingContactMenu from "./FloatingContactMenu";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
            <FloatingContactMenu />
            <Toaster position="top-center" reverseOrder={false} />
        </SessionProvider>
    );
}
