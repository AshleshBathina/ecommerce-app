import { User } from "../models/user.js"

export async function addAddress(req, res) {
  try {
    const { label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault } = req.body;

    if (!label || !fullName || !streetAddress || !city || !state || !zipCode || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const user = req.user;

    if (isDefault) {
      user.addresses.forEach(addr => { addr.isDefault = false });
    }

    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault
    })

    await user.save()

    res.status(201).json({ message: "Address added successfully", addresses: user.addresses })
  } catch (error) {
    console.error("Error adding address", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getAddresses(req, res) {
  try {
    const user = req.user;

    res.status(200).json({ message: "Addresses fetched successfully", addresses: user.addresses })

  } catch (error) {
    console.error("Error fetching addresses", error)
    res.status(500).json({ message: "Internal server error" })
  }

}

export async function updateAddress(req, res) {
  try {
    const { addressId } = req.params;

    const { label, fullName, streetAddress, city, state, zipCode, phoneNumber, isDefault } = req.body;

    const user = req.user;
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" })
    }

    if (isDefault) {
      user.addresses.forEach(addr => { addr.isDefault = false });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save()

    res.status(200).json({ message: "Address updated successfully", addresses: user.addresses })

  } catch (error) {
    console.error("Error updating address", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function deleteAddress(req, res) {
  try {
    const { addressId } = req.params;

    const user = req.user;

    user.addresses.pull(addressId)

    await user.save();

    res.status(200).json({ message: "Address deleted successfully", addresses: user.addresses })
  } catch (error) {
    console.error("Error in deleteAddress controller: ", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function addToWishlist(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ error: "Product already in wishlist" })
    }

    user.wishlist.push(productId)
    await user.save()

    res.status(200).json({ message: "Product added to wishlist successfully" })

  } catch (error) {
    console.error("Error in addToWishlist controller: ", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const { productId } = req.params;

    const user = req.user;

    if (!user.wishlist.includes(productId)) {
      return res.status(400).json({ error: "Product not in wishlist" })
    }

    user.wishlist.pull(productId)

    await user.save()

    res.status(200).json({ message: "Product removed from wishlist successfully", wishlist: user.wishlist })

  } catch (error) {
    console.error("Error in getWishlist controller: ", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function getWishlist(req, res) {
  try {
    const user = req.user;

    res.status(200).json({ message: "Wishlist fetched successfully", wishlist: user.wishlist })

  } catch (error) {
    console.error("Error in getWishlist controller: ", error)
    res.status(500).json({ error: "Internal server error" })
  }
}