import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;

    // Check if user is accessing an admin route but is not an admin
    if (
      (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api/admin")) &&
      token?.role !== "admin"
    ) {
      // Redirect to home or show error
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow access to matched routes if there's a token
    },
  }
);

// Match all admin routes and admin API routes
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
