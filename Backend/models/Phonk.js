const mongoose = require("mongoose");

const Phonk = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  frontImage: { type: String, required: true },
  audioFile: { type: String, required: true }, // Ensure this matches the field in your backend
});

module.exports = mongoose.model("Phonk", Phonk);
