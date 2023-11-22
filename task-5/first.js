const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

app.listen(8080);

// ОТПРАВКА СТРАНИЦЫ
app.get("/page", async (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
