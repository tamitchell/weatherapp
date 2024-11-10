export default function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Always use the current URL the user is on
    return window.location.origin;
  }

  // Fallbacks for SSR only
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return 'http://localhost:3000';
}
