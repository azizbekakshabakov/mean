var express = require("express");
var router = express.Router();
const { Song } = require("../schemas/song");
const axios = require("axios");
const { auth } = require("../middleware/auth");

/* GET home page. */
router.get("/one", function (req, res, next) {
  res.status(200).send("Hello visitor");
});

router.get("/two", function (req, res, next) {
  res.status(200).send({ name: "George Washington", age: 28, city: "Magadan" });
});

// ENTER NAME PARAMETER HERE
router.get("/three", function (req, res, next) {
  let result = "";
  console.log(req.query);
  if (req.query["name"])
    for (let i = 0; i < 10; i++) {
      result += ` ${req.query["name"]}`;
    }

  res.status(200).send({ data: result });
});

//созранить данные через пост
router.post("/four", async (req, res) => {
  const song = await Song(req.body).save();

  res.status(201).send({ data: song, message: "Песня создана" });
});

//ограничить доступ, сторонний ресурс
router.get("/five", auth, async (req, res, next) => {
  let result = {};

  if (req.query["latitude"] && req.query["longitude"])
    result = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${req.query["latitude"]}&longitude=${req.query["longitude"]}&daily=temperature_2m_max,temperature_2m_min`
    );

  res.status(200).send({ data: result.data });
});

module.exports = router;
