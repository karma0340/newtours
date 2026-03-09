
import dbConnect from "@/lib/db";
import User from "@/models/User";
import AdminUserClient from "@/components/admin/AdminUserClient";
import RefreshButton from "@/components/admin/RefreshButton";

async function getUsers() {
    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Manage <span className="text-blue-600">Users</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <RefreshButton />
                </div>
            </div>
            <AdminUserClient initialUsers={users} />
        </div>
    );
}


