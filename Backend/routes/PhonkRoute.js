const router = require("express").Router();
const { auth } = require("../middleware/Auth");
const Phonk = require("../models/Phonk");

// Get all podcasts
router.get("/get-phonks", async (req, res) => {
  try {
    const phonks = await Phonk.find();
    return res
      .status(200)
      .json({ message: "Fetched All Podcasts", data: phonks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get podcast by ID
router.get("/get-phonk/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const phonk = await Phonk.findById(id);

    if (!phonk) {
      return res.status(404).json({ message: "Phonk not found" });
    }

    return res
      .status(200)
      .json({ message: "Phonk fetched by ID", data: phonk });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
