import fs from 'fs';
import { GetServerSideProps } from 'next';

const Sitemap = () => {};

const resolveIndexPage = (url: string) => url.replace(/\/index.tsx|.tsx/, '');

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (typeof baseUrl === 'undefined')
    throw new Error('Support a valid ENV variable with key [NEXT_PUBLIC_BASE_URL]');

  const staticPages = fs
    .readdirSync('src/pages')
    .filter(staticPage => {
      return !['_app.tsx', '_document.tsx', '_error.tsx', 'sitemap.xml.ts'].includes(
        staticPage
      );
    })
    .map(staticPagePath => {
      return resolveIndexPage(`${baseUrl}/${staticPagePath}`);
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(url => {
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
    })
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
