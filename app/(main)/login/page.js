
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Logged in successfully!");
                router.push("/");
                router.refresh(); // Update session state
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your bookings and profile
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Email address or Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign in"}
                        </button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12.0003 20.45c4.6669 0 8.0342-3.2438 8.0342-8.1563 0-0.6563-0.0769-1.3126-0.2057-1.9219h-7.8285v3.6657h4.4828c-0.1874 1.2562-0.9668 2.3719-1.9771 3.0938v2.5406h3.1971c1.8743-1.725 2.9543-4.2657 2.9543-7.3969 0-0.7875-0.0828-1.5582-0.2314-2.2969h-8.4257v-3.7126h0.0114c2.2619-0.0103 4.4172 0.8657 6.0286 2.4563l2.8251-2.8251c-2.4286-2.28-5.6942-3.5438-9.0857-3.5438-5.1743 0-9.6057 2.9531-11.4542 7.275l3.7543 2.9156c0.8857-2.6531 3.3714-4.5469 6.2828-4.5469z" fill="#4285F4" />
                        <path d="M12.0003 20.45c-2.9114 0-5.3971-1.8938-6.2828-4.5469l-3.7543 2.9156c1.8485 4.3219 6.2799 7.275 11.4542 7.275 3.3915 0 6.6571-1.2638 9.0857-3.5438l-3.1971-2.5406c-1.0103 0.7219-2.3086 1.1531-3.7657 1.1531z" fill="#34A853" />
                        <path d="M5.7175 15.9031c-0.4438-1.3219-0.6971-2.7375-0.6971-4.1812 0-1.4437 0.2533-2.8594 0.6971-4.1812l-3.7543-2.9156c-0.8998 2.1281-1.4057 4.4625-1.4057 6.9094 0 2.4469 0.5059 4.7812 1.4057 6.9094l3.7543-2.9156z" fill="#FBBC05" />
                        <path d="M12.0003 4.9031c1.6114 1.5906 3.7667 2.4666 6.0286 2.4563h0.0114v-3.7126h-8.4257c0.1486-0.7387 0.2314-1.5094 0.2314-2.2969 0-3.1312-1.08-5.6719-2.9543-7.3969h-3.1971v2.5406c1.0103-0.7219 1.7897-1.8376 1.9771-3.0938h-4.4828v-3.6657h7.8285c0.1288 0.6094 0.2057 1.2656 0.2057 1.9219 0 4.9125-3.3673 8.1563-8.0342 8.1563-1.4571 0-2.7554-0.4312-3.7657-1.1531l-3.7543-2.9156c1.8485 4.3219 6.2799 7.275 11.4542 7.275z" fill="#EB4335" />
                    </svg>
                    Google
                </button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
