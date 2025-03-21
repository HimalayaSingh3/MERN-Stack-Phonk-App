const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Db = require("./controllers/Db");
const cookieParser = require("cookie-parser");
const userApi = require("./routes/UserRoute");
const phonkApi = require("./routes/PhonkRoute");
const adminApi = require("./routes/Admin");
const fileUpload = require("express-fileupload");
const uploadHandler = require("./middleware/Cloudinary");

const app = express();
dotenv.config();
Db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mern-stack-phonk-app.onrender.com"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);


app.use(fileUpload({ useTempFiles: true }));

const PORT = process.env.PORT || 5000;

// Routes
app.post("/upload", uploadHandler, (req, res) => {
  res.json({
    message: "Files uploaded successfully",
    uploadedFiles: req.uploadedFiles,
  });
});
app.use("/api/v1/users", userApi);
app.use("/api/v1/admin", adminApi);
app.use("/api/v1/phonks", phonkApi);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
