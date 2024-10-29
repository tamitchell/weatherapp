const isAllowedOrigin = (origin: string): boolean => {
  // Allow localhost for development
  if (origin.startsWith('http://localhost:')) {
    return true;
  }

  // Get the vercel URL from environment
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  // Allow the main vercel domain and any subdomain/preview URLs
  if (
    origin.endsWith('.vercel.app') ||
    (vercelUrl && origin.includes(vercelUrl))
  ) {
    return true;
  }

  return false;
};

export default isAllowedOrigin;
