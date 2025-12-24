import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import { createReview, deleteReview } from "../controllers/reviewController.js";

const router = Router();

router.post("/", protectRoute, createReview)

//delete is not implemented in the frontend
router.delete("/:reviewId", protectRoute, deleteReview)

export default router;