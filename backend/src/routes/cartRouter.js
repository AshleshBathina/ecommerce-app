import { Router } from "express"
import { protectRoute } from "../middleware/authMiddleware.js";

import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = Router();

router.use(protectRoute)

router.get("/", getCart)
router.post("/", addToCart)
router.put("/:productId", updateCartItem)
router.delete("/:productId", removeFromCart)
router.delete("/", clearCart)


export default router;