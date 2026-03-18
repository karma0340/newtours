import dbConnect from "@/lib/db";
import Tour from "@/models/Tour";
import Blog from "@/models/Blog";

export default async function sitemap() {
  const baseUrl = "https://hikethehimalaya.in";
  
  try {
    await dbConnect();

    // Fetch Dynamic Data
    const tours = await Tour.find({}, "slug updatedAt").lean();
    const tourUrls = tours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.slug}`,
      lastModified: tour.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    const blogs = await Blog.find({}, "slug updatedAt").lean();
    const blogUrls = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Static & Category routes
    const routes = [
      "",
      "/about",
      "/contact",
      "/tours",
      "/vehicles",
      "/categories",
      "/blogs",
      "/categories/trekking",
      "/categories/adventure",
      "/categories/spiritual",
      "/categories/nature",
      "/categories/offbeat",
      "/categories/culture",
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }));

    return [...routes, ...tourUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static routes as fallback
    const routes = [
      "",
      "/about",
      "/contact",
      "/tours",
      "/vehicles",
      "/blogs",
    ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    }));
    return routes;
  }
}
