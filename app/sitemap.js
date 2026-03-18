export default async function sitemap() {
  const baseUrl = "https://hikethehimalaya.in";

  // Static & Category routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/tours",
    "/vehicles",
    "/categories",
    "/categories/trekking",
    "/categories/adventure",
    "/categories/spiritual",
    "/categories/nature",
    "/categories/offbeat",
    "/categories/culture",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes];
}
