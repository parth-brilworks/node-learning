const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const statusCode = res.statusCode;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode}`);

  next();
};

module.exports = logger;
