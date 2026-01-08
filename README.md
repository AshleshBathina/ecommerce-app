# E-Commerce Platform

A robust, full-stack e-commerce solution features a modern Admin Dashboard and a scalable REST API backend. 

## 🚀 Tech Stack

### Admin Panel (Frontend)
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS 4 + DaisyUI
- **State Management**: TanStack Query (React Query)
- **Authentication**: Clerk
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend API
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: Clerk SDK
- **Media Storage**: Cloudinary
- **Background Jobs**: Inngest

## ✨ Features Implemented

### Admin Dashboard
- **Comprehensive Overview**: Visual dashboard for monitoring store performance.
- **Product Management**: Full CRUD operations for products, including image uploads via Cloudinary.
- **Order Management**: Track and update order statuses.
- **Customer Management**: View and manage customer accounts.
- **Secure Authentication**: Admin-only access protected by Clerk

### Core Backend Services
- **RESTful API**: Structured endpoints in `routes/` (Admin, Auth, Products, etc.).
- **Data Models**: robust Schemas for Products, Users, Carts, Orders, and Reviews.
- **Media Handling**: Seamless integration with Cloudinary for asset management.
- **Scalable Architecture**: Controller-Service-Repository pattern (implied by folder structure).

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Clerk API Keys
- Cloudinary Credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with MONGODB_URI, CLERK_SECRET_KEY, CLOUDINARY_URL etc.
   npm run dev
   ```

3. **Admin Panel Setup**
   ```bash
   cd admin
   npm install
   # Create .env file with VITE_CLERK_PUBLISHABLE_KEY etc.
   npm run dev
   ```

The Admin Panel will launch at `http://localhost:5173` (default Vite port) and the Backend Server will run on the configured port (default 5000).
