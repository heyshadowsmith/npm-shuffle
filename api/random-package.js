export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch all npm package names
    const response = await fetch('https://raw.githubusercontent.com/nice-registry/all-the-package-names/master/names.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch package names: ${response.status}`);
    }

    const npmPackages = await response.json();
    
    if (!Array.isArray(npmPackages) || npmPackages.length === 0) {
      throw new Error('Invalid package data received');
    }

    // Select a random package
    const randomIndex = Math.floor(Math.random() * npmPackages.length);
    const randomPackage = npmPackages[randomIndex];

    // Set cache headers for performance
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    
    return res.status(200).json({ 
      package: randomPackage,
      url: `https://www.npmjs.com/package/${randomPackage}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching random package:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch random package',
      message: error.message 
    });
  }
}