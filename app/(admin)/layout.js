
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
