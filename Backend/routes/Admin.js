const router = require("express").Router();
const Phonk = require("../models/Phonk");
const upload = require("../middleware/Multer");

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
router.post("/add-phonk", upload, async (req, res) => {
  try {
    const { title, artist } = req.body;
    if (!title || !artist || !req.files["frontImage"] || !req.files["audioFile"]) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const frontImage = req.files["frontImage"][0].path;
    const audioFile = req.files["audioFile"][0].path;

    const newPhonk = new Phonk({
      title,
      artist,
      frontImage,
      audioFile,
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
    const { id } = req.params;
    const phonk = await Phonk.findById(id);

    if (!phonk) {
      return res.status(404).json({ message: "Phonk not found" });
    }

    await Phonk.findByIdAndDelete(id);
    return res.status(200).json({ message: "Phonk deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete phonk" });
  }
});

module.exports = router;
