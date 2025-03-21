const router = require("express").Router();
const Phonk = require("../models/Phonk");
const uploadHandler = require("../middleware/Cloudinary");
const cloudinary = require("../middleware/Cloudinary");
const cloudinarys = require("cloudinary").v2;

// Get All Phonks
router.get("/get-phonks", async (req, res) => {
  try {
    const phonks = await Phonk.find();
    return res.status(200).json({ message: "Fetched All Phonks", data: phonks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add New Phonk
router.post("/add-phonk", uploadHandler, async (req, res) => {
  try {
    const { title, artist } = req.body;

    if (!title || !artist || !req.uploadedFiles.frontImage || !req.uploadedFiles.audioFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPhonk = new Phonk({
      title,
      artist,
      frontImage: req.uploadedFiles.frontImage.url,
      audioFile: req.uploadedFiles.audioFile.url,
      cloudinaryIds: {
        frontImage: req.uploadedFiles.frontImage.public_id,
        audioFile: req.uploadedFiles.audioFile.public_id,
      },
    });

    await newPhonk.save();
    return res.status(201).json({ message: "Phonk added successfully", data: newPhonk });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add phonk" });
  }
});

// Delete Phonk
router.delete("/delete-phonk/:id", async (req, res) => {
  try {
    const phonk = await Phonk.findById(req.params.id);
    if (!phonk) return res.status(404).json({ message: "Phonk not found" });

    console.log("Phonk found:", phonk);

    const { frontImage, audioFile } = phonk.cloudinaryIds;

    if (frontImage) {
      console.log("Deleting frontImage:", frontImage);
      await cloudinarys.uploader.destroy(frontImage, { resource_type: "image" });
    }

    if (audioFile) {
      console.log("Deleting audioFile:", audioFile);
      await cloudinarys.uploader.destroy(audioFile, { resource_type: "video" });
    }

    await Phonk.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Phonk deleted successfully" });
  } catch (error) {
    console.error("Error deleting phonk:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
