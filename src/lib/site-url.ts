/**
 * Canonical site origin used for metadata, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL in production; on Vercel the production domain is
 * used automatically as a fallback.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
}
