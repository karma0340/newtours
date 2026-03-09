import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SmoothScroll>
                <main className="flex-grow pt-16">
                    {children}
                </main>
            </SmoothScroll>
            <Footer />
        </div>
    );
}
