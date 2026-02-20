# 🛒 E-Commerce Platform

A full-stack e-commerce solution consisting of three applications: a **customer-facing storefront**, an **admin dashboard**, and a **REST API backend**.

---

## 🗂️ Project Structure

```
ecommerce-app/
├── frontend/    # Customer storefront (React + Vite)
├── admin/       # Admin dashboard (React + Vite + DaisyUI)
└── backend/     # REST API server (Node.js + Express + MongoDB)
```

---

## 🚀 Tech Stack

### Frontend (Customer Storefront)
| Technology | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| TailwindCSS | 4 |
| React Router | 7 |
| TanStack Query | 5 |
| Clerk (Auth) | 5 |
| Axios | 1 |
| Lucide React | latest |

### Admin Panel
| Technology | Version |
|---|---|
| React | 19 |
| Vite | 7 |
| TailwindCSS | 4 |
| DaisyUI | 5 |
| React Router | 7 |
| TanStack Query | 5 |
| Clerk (Auth) | 5 |
| Axios | 1 |
| Lucide React | latest |

### Backend API
| Technology | Version |
|---|---|
| Node.js | ≥ 20 |
| Express | 5 |
| MongoDB + Mongoose | 9 |
| Clerk SDK (`@clerk/express`) | 1 |
| Cloudinary | 2 |
| Inngest (background jobs) | 3 |
| Multer (file uploads) | 2 |

---

## ✨ Features

### 🛍️ Customer Storefront (`/frontend`)

- **Authentication** — Clerk-powered sign-in/sign-up with SSO callback support.
- **Product Listing** — Browse products with real-time search and category filtering (All, Electronics, Fashion, Sports, Books).
- **Wishlist** — Toggle products in/out of a personal wishlist with heart icons.
- **Cart Management** — Add items, adjust quantities with `+`/`-` controls, remove items, and view a live order summary (subtotal + ₹10 shipping).
- **Profile Page** — User profile view.
- **Protected Routes** — Unauthenticated users are redirected to `/login`.

**Routes:**
| Path | Page |
|---|---|
| `/login` | Login / SSO |
| `/home` | Product listing |
| `/cart` | Shopping cart |
| `/profile` | User profile |

---

### 🖥️ Admin Dashboard (`/admin`)

- **Dashboard Overview** — Key metrics and store performance at a glance.
- **Product Management** — Full CRUD with Cloudinary image uploads.
- **Order Management** — View and update order statuses.
- **Customer Management** — Browse and manage registered customers.
- **Secure Access** — Clerk-protected; non-admin users are redirected to login.

**Routes:**
| Path | Page |
|---|---|
| `/login` | Admin sign-in |
| `/dashboard` | Overview & metrics |
| `/products` | Product CRUD |
| `/orders` | Order management |
| `/customers` | Customer records |

---

### ⚙️ Backend API (`/backend`)

**Base URL:** `http://localhost:3000`

| Route prefix | Purpose |
|---|---|
| `GET /api/health` | Health check |
| `/api/admin` | Admin-only operations |
| `/api/users` | User management |
| `/api/products` | Product CRUD & queries |
| `/api/cart` | Cart operations |
| `/api/orders` | Order management |
| `/api/reviews` | Product reviews |
| `/api/inngest` | Inngest background job handler |

**Data Models:** `User`, `Product`, `Cart`, `Order`, `Review`

**Production:** In production mode the backend serves the compiled admin panel from `admin/dist/`.

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** v20+
- **MongoDB** connection string
- **Clerk** account (publishable key + secret key)
- **Cloudinary** account (cloud name, API key, API secret)
- **Inngest** account (for background jobs)

---

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/AshleshBathina/ecommerce-app.git
cd ecommerce-app
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
NODE_ENV=development
PORT=3000
```

```bash
npm run dev
```
> Backend runs on **http://localhost:3000**

---

#### 3. Admin Panel Setup
```bash
cd admin
npm install
```

Create `admin/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3000
```

```bash
npm run dev
```
> Admin panel runs on **http://localhost:5173**

---

#### 4. Frontend (Storefront) Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:3000
```

```bash
npm run dev
```
> Storefront runs on **http://localhost:5174**

---

### Seeding the Database

To populate the database with sample products:
```bash
cd backend
npm run seed:products
```

---

## 🚢 Deployment

The root `package.json` provides convenience scripts for deployment platforms (e.g., Render):

```bash
# Install dependencies and build the admin panel
npm run build

# Start the production server (serves both API and admin panel)
npm start
```

In production, the Express server statically serves `admin/dist/` and handles all non-API routes with the admin `index.html`.

---

## 📄 License

ISC
