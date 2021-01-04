const express = require("express");
const loadRoutes = require("./utils/load-routes");
const fs = require('fs');
const path = require('path');
const { Console } = require("console");
const app = express();

app.use(express.json());
loadRoutes(app);


//Clear image cache
console.log("Clearing image cache on startup");
fs.readdir("./files/usercontent/cards", (err, files) => {
  if (err) throw err;

  for (const file of files) {
    console.log(`Deleting usercontent file: ${file}`);
    fs.unlink(path.join("./files/usercontent/cards", file), err => {
      if (err) throw err;
    });
  }
});

fs.readdir("./files/usercontent/pfp", (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join("./files/usercontent/pfp", file), err => {
      if (err) throw err;
    });
  }
});

app.listen(5000, () => {
  console.log("Server has started!!");
});
