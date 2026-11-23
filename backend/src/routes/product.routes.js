
const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

// Validate product ID
function getProductId(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      status: "error",
      message: "Product ID tidak valid.",
    });
    return null;
  }

  return id;
}

// Validate product data
function validateProduct(req, res) {
  const { name, price } = req.body;
  const numericPrice = Number(price);

  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({
      status: "error",
      message: "Nama produk wajib diisi.",
    });
    return null;
  }

  if (
    price === undefined ||
    price === null ||
    price === "" ||
    !Number.isFinite(numericPrice) ||
    numericPrice <= 0
  ) {
    res.status(400).json({
      status: "error",
      message: "Harga harus berupa angka lebih dari 0.",
    });
    return null;
  }

  return {
    name: name.trim(),
    price: numericPrice,
  };
}

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });

    res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil daftar produk.",
    });
  }
});

// GET product by ID
router.get("/:id", async (req, res) => {
  const id = getProductId(req, res);
  if (id === null) return;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Produk tidak ditemukan.",
      });
    }

    res.json({
      status: "success",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil detail produk.",
    });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  const productData = validateProduct(req, res);
  if (!productData) return;

  try {
    const product = await prisma.product.create({
      data: productData,
    });

    res.status(201).json({
      status: "success",
      message: "Produk berhasil ditambahkan.",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Gagal menambahkan produk.",
    });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  const id = getProductId(req, res);
  if (id === null) return;

  const productData = validateProduct(req, res);
  if (!productData) return;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });

    res.json({
      status: "success",
      message: "Produk berhasil diperbarui.",
      data: product,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui produk.",
    });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const id = getProductId(req, res);
  if (id === null) return;

  try {
    const product = await prisma.product.delete({
      where: { id },
    });

    res.json({
      status: "success",
      message: "Produk berhasil dihapus.",
      data: product,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        status: "error",
        message: "Produk tidak ditemukan.",
      });
    }

    res.status(500).json({
      status: "error",
      message: "Gagal menghapus produk.",
    });
  }
});

module.exports = router;
