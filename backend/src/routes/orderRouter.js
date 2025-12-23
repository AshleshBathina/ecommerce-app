import { Router } from "express"
import { protectRoute } from "../middleware/authMiddleware.js";
import { createOrder, getUserOrders } from "../controllers/orderController.js"

const router = Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);

export default router;