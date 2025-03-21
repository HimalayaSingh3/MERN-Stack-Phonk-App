const mongoose = require("mongoose");

const Phonk = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  frontImage: { type: String, required: true }, // Cloudinary image URL
  audioFile: { type: String, required: true }, // Cloudinary audio URL
  cloudinaryIds: {
    frontImage: { type: String },
    audioFile: { type: String },
  },
});

module.exports = mongoose.model("Phonk", Phonk);
