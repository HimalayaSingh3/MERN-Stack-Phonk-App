const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Db =  require("./controllers/Db")
const cookieParser = require("cookie-parser");
const userApi = require("./routes/UserRoute");
const phonkApi = require("./routes/PhonkRoute");
const adminApi = require("./routes/Admin");

const app = express();
dotenv.config();
Db()

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/users", userApi);
app.use("/api/v1/admin", adminApi);
app.use("/api/v1/phonks", phonkApi);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
