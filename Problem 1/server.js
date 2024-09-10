const { createServer } = require("node:http");

createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Hello World");
  } else {
    res.statusCode = 404;
    res.end("Page Not Found");
  }
}).listen(3000);
