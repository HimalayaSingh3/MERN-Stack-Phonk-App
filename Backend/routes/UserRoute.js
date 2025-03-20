const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/Auth");

// Sign-up route
router.post("/register",async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (username.length < 5) {
      return res.status(400).json({ message: "Username must have at least 5 characters" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must have at least 8 characters" });
    }

    // Check if user exists (either by email or username)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Username or Email already exists" });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Sign-Up Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Sign-in route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email, isAdmin: existingUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Set cookie
    res.cookie("phonkUserToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return res.status(200).json({
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      message: "Sign-In Successfully",
    });
  } catch (error) {
    console.error("Sign-In Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// Logout route
router.post("/logout", (req, res) => {
  try {
    res.cookie("phonkUserToken", "", { expires: new Date(0) });
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Check if cookie exists
router.get("/check-cookie", (req, res) => {
  try {
    const token = req.cookies.phonkUserToken;
    return res.status(200).json({ message: !!token });
  } catch (error) {
    console.error("Check Cookie Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Fetch user details
router.get("/user-details", auth, async (req, res) => {
  try {
    const { email } = req.user;
    const existingUser = await User.findOne({ email }).select("-password");

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: existingUser });
  } catch (error) {
    console.log("User Details Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
