# Admin Dashboard - Ecommerce App

This is the admin panel for the Ecommerce Application, built with React and Vite. It provides a comprehensive interface for managing products, orders, and customers, as well as viewing key business metrics.

## Features

### 📊 Dashboard
- **Overview Statistics**: View real-time data on:
  - Total Orders
  - Total Revenue
  - Total Customers
  - Total Products

### 📦 Product Management
- **Create Product**: Add new products with up to 3 images, description, price, stock, and category.
- **Edit Product**: Update existing product details including images and inventory.
- **Delete Product**: Remove products from the catalog and associated images from Cloudinary.
- **View Products**: List all products sorted by most recent.

### 🛍️ Order Management
- **View Orders**: Access a complete list of customer orders with user details and ordered items.
- **Update Status**: Change order status to `pending`, `shipped`, or `delivered`.

### 👥 Customer Management
- **View Customers**: Browse a list of all registered users.
- **Customer Insights**: View customer profile images, names, emails, address counts, and wishlist item counts.

## Tech Stack
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios (implied by API structure)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```
