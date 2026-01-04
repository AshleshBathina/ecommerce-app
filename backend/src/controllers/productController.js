import { Product } from "../models/product.js";

export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(200).json(product)
  } catch (error) {
    console.error("Error fetching product: ", error);
    res.status(500).json({ message: "Internal server error" })
  }
}