const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(logger);

const loadRoutes = (app) => {
  const routesPath = path.join(__dirname, "routes");
  fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith("Routes.js")) {
      const routeName = file.replace("Routes.js", "").toLowerCase();
      const routeHandler = require(path.join(routesPath, file));
      app.use(`/api/${routeName}`, routeHandler);
    }
  });
};

loadRoutes(app);

app.get("/api", (req, res) => {
  res.status(200).json({ message: "API is running!" });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
