// api/health.js
// Vercel Serverless Function — CommonJS
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const body = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_VERSION || 'beta',
    region: process.env.VERCEL_REGION || null
  };
  res.status(200).json(body);
};
