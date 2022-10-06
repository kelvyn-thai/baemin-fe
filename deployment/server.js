const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const helmet = require("helmet");
const cors = require("cors");
const STATIC_FOLDER = path.resolve("build");
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
app.use(cors());
app.use(express.static(STATIC_FOLDER));
app.use(express.static(__dirname + "/public"));
app.get("*", function (_, response) {
  response.sendFile(path.resolve(STATIC_FOLDER, "index.html"));
});
app.listen(port);

console.log("server started on port " + port);
