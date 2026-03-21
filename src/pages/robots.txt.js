const SITE_URL = "https://mugunth.me";

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
}

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain");
  res.write(generateRobotsTxt());
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
