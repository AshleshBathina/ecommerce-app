import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import { addAddress, getAddresses, updateAddress, deleteAddress, addToWishlist, getWishlist, removeFromWishlist } from "../controllers/userController.js";

const router = Router();

router.use(protectRoute)

//address routes
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses)
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress)

//wishlist routes
router.post("/wishlist", addToWishlist)
router.get("/wishlist", getWishlist)
router.delete("/wishlist/:productId", removeFromWishlist)

export default router