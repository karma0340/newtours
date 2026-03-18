export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/profile",
          "/bookings",
        ],
      },
    ],
    sitemap: "https://hikethehimalaya.com/sitemap.xml",
  };
}
