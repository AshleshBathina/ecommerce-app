import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getAllProducts } from "../controllers/adminController.js";
import { getProductById } from "../controllers/productController.js";

const router = Router();

router.get("/", protectRoute, getAllProducts);
router.get("/:id", protectRoute, getProductById);

export default router;