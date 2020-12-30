const express = require("express");
const loadRoutes = require("./utils/load-routes");
const app = express();

app.use(express.json());
loadRoutes(app);

app.listen(5000, () => {
  console.log("Server has started!!");
});
