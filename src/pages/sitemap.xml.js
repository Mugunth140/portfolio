import work from "./api/data";

const SITE_URL = "https://mugunth.me";

function generateSiteMap() {
  const now = new Date().toISOString();

  const staticRoutes = ["/", "/about", "/work", "/contact"];

  const staticUrls = staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("");

  const workUrls = work
    .map(
      (project) => `
  <url>
    <loc>${SITE_URL}/work/${project.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${workUrls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}
