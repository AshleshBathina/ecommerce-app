import { Product } from "../models/product.js";
import { Order } from "../models/order.js";
import { Review } from "../models/review.js";

export async function createReview(req, res) {
  try {
    const { productId, orderId, rating } = req.body;
    const user = req.user;

    if (!rating || rating > 5 || rating < 1) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" })
    }

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({ error: "Order not found" })
    }

    if (order.clerkId !== user.clerkId) {
      return res.status(403).json({ error: "Not authorized to review this order" })
    }

    if (order.status !== "delivered") {
      return res.status(400).json({ error: "Can only review delievered orders" })
    }

    const existingReview = await Review.findOne({ productId, userId: user._id });
    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this product" })
    }


    const review = await Review.create({
      productId,
      userId: user._id,
      orderId,
      rating
    })

    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0)
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        averageRating: totalRating / reviews.length,
        totalReviews: totalReviews = reviews.length
      }
    )

    if (!updatedProduct) {
      await Review.findByIdAndDelete(review._id)
      res.status(404).json({ error: "Product not found" })
    }

    res.status(201).json({ message: "Review submitted successfully", review })


  } catch (error) {
    console.error("Error in createReview controller", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" })
    }

    if (review.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this review" })
    }

    const productId = review.productId;

    await Review.findByIdAndDelete(reviewId)

    const reviews = await Review.findById({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0)
    await Product.findByIdAndUpdate(productId, {
      averageRating: totalRating / reviews.length,
      totalReviews: reviews.length
    })

    res.status(200).json({ message: "Review deleted successfully" });

  } catch (error) {
    console.error("Error in deleteReview controller", error);
    res.status(500).json({ error: "Internal server error" })
  }
}