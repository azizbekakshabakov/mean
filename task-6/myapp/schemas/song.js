const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
});

const Song = mongoose.model("song", songSchema);

module.exports = { Song };
