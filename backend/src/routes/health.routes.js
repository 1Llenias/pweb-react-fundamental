
const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

// Check backend status
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Backend API is running",
  });
});

// Check database connection
router.get("/db", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "success",
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(503).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

module.exports = router;
