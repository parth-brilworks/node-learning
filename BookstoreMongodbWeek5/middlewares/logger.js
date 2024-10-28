const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();

  res.on("finish", () => {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode}`);
  });

  next();
};

module.exports = logger;
