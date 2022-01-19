import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url><loc>https://koikoi-community.com</loc><changefreq>daily</changefreq><priority>0.7</priority><lastmod>2022-01-19T16:06:19.324Z</lastmod></url>
  <url><loc>https://koikoi-community.com/consultations</loc><changefreq>daily</changefreq><priority>0.7</priority><lastmod>2022-01-19T16:06:19.324Z</lastmod></url>
  <url><loc>https://koikoi-community.com/support/privacy</loc><changefreq>daily</changefreq><priority>0.7</priority><lastmod>2022-01-19T16:06:19.324Z</lastmod></url>
  <url><loc>https://koikoi-community.com/support/terms</loc><changefreq>daily</changefreq><priority>0.7</priority><lastmod>2022-01-19T16:06:19.324Z</lastmod></url>
  <url><loc>https://koikoi-community.com/tweets</loc><changefreq>daily</changefreq><priority>0.7</priority><lastmod>2022-01-19T16:06:19.324Z</lastmod></url>
  </urlset>`);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;
