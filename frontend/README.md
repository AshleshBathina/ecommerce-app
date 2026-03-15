# 🛍️ Ashoppp – Customer Storefront

The customer-facing frontend of the [Ashoppp](https://ashoppp.vercel.app/) e-commerce platform, built with **React 19** and **Vite 7**.

**Live URL:** [ashoppp.vercel.app](https://ashoppp.vercel.app/)

---

## 🚀 Tech Stack

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

---

## ✨ Features

- **Authentication** — Clerk-powered sign-in with Google and Apple OAuth, including an SSO callback handler.
- **Product Listing** — Browse products with real-time search and category filtering (All, Electronics, Fashion, Sports, Books). Desktop view has a horizontal filter sidebar.
- **Wishlist** — Toggle products in/out of a personal wishlist with heart icons.
- **Cart Management** — Add items, adjust quantities, remove items, and view a live order summary (subtotal + ₹10 shipping). Optimised desktop layout.
- **Profile Page** — View and manage account details with a two-column desktop layout.
- **Address Management** — Full CRUD for saved delivery addresses, with a default address flag and a modal form. Desktop uses a responsive card grid.
- **Protected Routes** — Unauthenticated users are redirected to `/login`.

---

## 🗺️ Routes

| Path | Page |
|---|---|
| `/login` | Login (Google / Apple OAuth) |
| `/sso-callback` | Clerk SSO callback handler |
| `/home` | Product listing |
| `/cart` | Shopping cart |
| `/profile` | User profile |
| `/addresses` | Saved delivery addresses |

---

## 🛠️ Local Setup

### Prerequisites
- Node.js v20+
- Running backend (see [`/backend`](../backend))

### Installation

```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

> Storefront runs on **http://localhost:5173**

---

## 🚢 Deployment (Vercel)

Deployed as a standalone Vercel project. A `vercel.json` catch-all rewrite prevents 404s on page reload for React Router client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Set `VITE_API_URL` to your production backend URL (e.g., `https://ashoppp.onrender.com`) in Vercel's environment variable settings.

---

## 📁 Project Structure

```
src/
├── components/   # Shared UI components (PageLoader, etc.)
├── hooks/        # Custom React hooks
├── layouts/      # DashboardLayout (nav + outlet)
├── lib/          # Axios instance & query client
├── modals/       # Modal components (AddressModal, etc.)
├── pages/        # Route-level page components
└── utils/        # Helper utilities
```
