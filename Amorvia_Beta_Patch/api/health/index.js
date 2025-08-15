module.exports = (req, res) => {
  res.status(200).json({
    status: "ok",
    app: "Amorvia Beta Patch",
    timestamp: new Date().toISOString()
  });
};
