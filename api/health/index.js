module.exports = (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "Amorvia Multi-Act Prep",
    timestamp: new Date().toISOString()
  });
};