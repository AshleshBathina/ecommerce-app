# Admin Dashboard - Ecommerce App

This is the admin panel for the Ecommerce Application, built with React and Vite. It provides a comprehensive interface for managing products, orders, and customers, ensuring secure access via Clerk authentication.

## Features

### 🔐 Authentication & Security
- **Secure Login**: Powered by **Clerk** to ensure only authorized personnel can access the system.
- **Admin Verification**: Protected routes ensure that only the user with the configured `ADMIN_EMAIL` can perform administrative actions.

### 📊 Dashboard
- **Overview Statistics**: Real-time business metrics including:
  - Total Revenue (₹)
  - Total Orders
  - Total Customers
  - Total Products
- **Recent Orders**: Quick access to the 5 most recent orders with status indicators.

### 📦 Product Management
- **Create Product**: Upload up to 3 images (via Cloudinary), set description, price, stock, and category.
- **Edit Product**: Modify existing product details and inventory.
- **Delete Product**: Remove products and automatically clean up associated images from storage.
- **View Products**: Sortable list of all products.

### 🛍️ Order Management
- **View Orders**: Comprehensive list of customer orders.
- **Update Status**: Workflow management with `pending`, `shipped`, and `delivered` statuses.
- **Order Details**: View customer shipping info and ordered items.

### 👥 Customer Management
- **Customer Insights**: View registered users with their profile images and email.
- **Activity Tracking**: Monitor address count and wishlist size for each customer.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, DaisyUI
- **Authentication**: Clerk (React & Express SDKs)
- **State Management**: TanStack Query
- **Data Fetching**: Axios
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Ensure your backend `.env` file includes:
   ```env
   CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   ADMIN_EMAIL=your_admin_email@example.com
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   DB_URL=...
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
