const fs = require("fs");
const express = require("express");
const path = require("path");
const getDirName = require("path").dirname;

const app = express();

app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//СОЗДАТЬ ФАЙЛ
app.post("/create-file", async (req, res) => {
  const { name, text } = req.body;
  console.log(req.body);

  fs.mkdir(getDirName(name), { recursive: true }, function (err) {
    if (err) {
      res.status(400).send(err);
      return;
    }

    fs.writeFile(name, text, (err) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
    });
  });

  res.status(200).send("ok");
});

app.post("/get-file", async (req, res) => {
  const { name } = req.body;

  fs.readFile(name, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("The text:", data);
    res.status(200).send(data);
  });

  console.log(name);
});

app.post("/delete-file", async (req, res) => {
  const { name } = req.body;

  fs.unlink(name, (err) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    res.status(200).send("ok");
  });
});
