
const API_URL = "http://localhost:3000/api/products";

// Get all products
export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil daftar produk.");
  }

  const result = await response.json();
  return result.data;
}

// Get product by ID
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil detail produk.");
  }

  const result = await response.json();
  return result.data;
}

// Create product
export async function createProduct(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal menambahkan produk.");
  }

  const result = await response.json();
  return result.data;
}

// Update product
export async function updateProduct(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal memperbarui produk.");
  }

  const result = await response.json();
  return result.data;
}

// Delete product
export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal menghapus produk.");
  }

  const result = await response.json();
  return result.data;
}
