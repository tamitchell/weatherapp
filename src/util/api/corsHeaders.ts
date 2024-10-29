import isVercelDeployment from './isVercelDeployment';

const corsHeaders = (origin: string) => {
  const headers = new Headers();

  // Only set the CORS origin if it's allowed
  if (origin && isVercelDeployment(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }

  headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  headers.set(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept'
  );
  headers.set('Access-Control-Allow-Credentials', 'true');

  return headers;
};

export default corsHeaders;
