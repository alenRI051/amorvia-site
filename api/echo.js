// api/echo.js
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const method = req.method || 'GET';
  res.status(200).json({
    status: 'ok',
    method,
    body: req.body ?? null,
    timestamp: new Date().toISOString()
  });
};
