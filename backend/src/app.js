
const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Product Management API",
  });
});

module.exports = app;
