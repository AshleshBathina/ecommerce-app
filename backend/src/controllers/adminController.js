import cloudinary from "../config/cloudinary.js"
import Product from "../models/product.js"

export async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) return res.status(400).json({ message: "All fields are required" })

    if (!req.files || req.files.length === 0) return res.status(400).json({ message: "At least one image is required" });

    if (req.files.length > 3) return res.status(400).json({ message: "Maximum 3 images are allowed" })

    const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path, {
      folder: "products"
    }))

    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map(result => result.secure_url);

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls
    })

    res.status(201).json(product)
  } catch (error) {
    console.error("Error creating product", error)
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getAllProducts(req, res) { }

export async function updateProduct(req, res) { }

export async function deleteProduct(req, res) { }