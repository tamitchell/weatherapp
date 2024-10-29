const isVercelDeployment = (origin: string): boolean => {
  // Allow vercel.app subdomains
  if (origin.endsWith('.vercel.app')) {
    return true;
  }

  // Allow preview deployments
  if (process.env.VERCEL_ENV === 'preview' && origin.includes('vercel.app')) {
    return true;
  }

  if (origin.startsWith('http://localhost:')) {
    return true;
  }

  return false;
};

export default isVercelDeployment;
