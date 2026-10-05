# PawPetStore 🐾

> A modern, full-stack pet-commerce and pet-care platform engineered with React, Node.js, Express, Tailwind CSS, and MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-20+-68A063?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4+-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Project Goals](#-project-goals)
4. [Key Features](#-key-features)
5. [Technology Stack](#-technology-stack)
6. [System Architecture](#-system-architecture)
7. [Directory Structure](#-directory-structure)
8. [Installation & Getting Started](#-installation--getting-started)
9. [Environment Variables](#-environment-variables)
10. [Database Architecture & Setup](#-database-architecture--setup)
11. [Running the Application](#-running-the-application)
12. [REST API Documentation](#-rest-api-documentation)
13. [Core Subsystems](#-core-subsystems)
    - [Authentication & Authorization](#authentication--authorization)
    - [Product Catalog & Filtering](#product-catalog--filtering)
    - [Cart Management](#cart-management)
    - [Checkout & Order Processing](#checkout--order-processing)
    - [Veterinary Clinic & Appointments](#veterinary-clinic--appointments)
    - [Admin Control Center](#admin-control-center)
14. [Performance & Optimization](#-performance--optimization)
15. [Security Engineering](#-security-engineering)
16. [Screenshots & UI Showcase](#-screenshots--ui-showcase)
17. [Development Workflow & Git Guidelines](#-development-workflow--git-guidelines)
18. [Future Enhancements](#-future-enhancements)
19. [Author & Academic Context](#-author--academic-context)

---

## 🌟 Project Overview

**PawPetStore** is a modern, high-performance web platform designed to streamline pet parenting. Built from the ground up as a production-grade full-stack application, PawPetStore bridges the gap between digital e-commerce and accessible pet wellness services. It empowers pet owners to discover premium nutrition, supplies, and accessories for dogs, cats, and birds, while concurrently offering a streamlined digital booking system for veterinary checkups and healthcare consultations.

---

## 🎯 Problem Statement

Pet owners frequently encounter fragmented digital experiences:
- Commercial pet stores lack structured breed guidance, resulting in unsuitable food and toy selections.
- E-commerce platforms typically omit veterinary clinic services, requiring separate offline clinic visits or disparate booking channels.
- Many independent pet care websites feature dated, unintuitive user interfaces lacking mobile responsiveness, real-time stock feedback, and transparent order tracking.

**PawPetStore** solves this by uniting trusted commerce, breed discovery, and clinical veterinary care under a single, unified digital roof.

---

## 🚀 Project Goals

1. **Production-Ready Full-Stack Architecture:** Deliver a modular, scalable application utilizing React (Vite), Express.js, and MongoDB with clean separation of concerns.
2. **First-Class User Experience (UX):** Provide an accessible, responsive, aesthetic UI inspired by modern D2C platforms, with micro-interactions, skeleton loaders, and zero jarring layout shifts.
3. **Robust Data Modeling:** Implement relational schema relationships in Mongoose covering users, products, categories, breeds, carts, orders, and clinic appointments.
4. **Strong Portfolio Demonstration:** Serve as a flagship BCA capstone project showcasing deep understanding of REST APIs, database indexing, client-side state management, and web security.

---

## ✨ Key Features

### 🛒 E-Commerce & Pet Products
- **Comprehensive Catalog:** Dedicated portals for Dogs, Cats, Birds, and Universal Accessories.
- **Data-Driven Breed Directory:** Explore breeds with temperament traits, physical dimensions, and tailored product recommendations.
- **Dynamic Search & Filtering:** Debounced real-time search combined with multi-faceted filtering (pet type, category, price range, brand, customer rating).
- **Rich Product Detail Pages:** Multi-image image gallery, stock availability badges, nutritional specifications, and quantity controls.

### 🛍️ Cart & Checkout Flow
- **Slide-Over Cart Drawer & Dedicated Cart Page:** Real-time subtotal, shipping fee calculation (free shipping over ₹999), and item count updates.
- **Stock Guard:** Automated checks preventing users from ordering quantities exceeding current warehouse stock.
- **Streamlined Checkout:** Address selection, order summary review, and flexible payment options (Cash-on-Delivery and simulated UPI/Card payment).
- **Order Tracking:** Detailed order confirmation receipts with tracking status stages (`Pending`, `Confirmed`, `Shipped`, `Delivered`).

### 🏥 Veterinary & Clinic Care
- **Service Catalog:** General checkups, vaccination schedules, dental scaling, dermatological care, nutrition guidance, and emergency consultations.
- **Interactive Booking Wizard:** Select service, pet type, date picker, convenient time slot, and enter pet health history.
- **Appointment Management:** Store appointments in the database with status tracking viewable from the user's dashboard.

### 🔐 User & Admin Experience
- **Secure Authentication:** JWT-based stateless authentication with bcrypt salted password hashing and protected client routes.
- **Customer Dashboard:** Manage profile details, view order history, track vet appointments, and maintain shipping addresses.
- **Administrative Portal:** View live business statistics (revenue, total orders, active inventory), manage products (CRUD), update order fulfillment stages, and monitor clinic schedules.

---

## 💻 Technology Stack

### Frontend
- **Framework:** React 18+ (SPA with functional components & hooks)
- **Tooling:** Vite (rapid HMR & ES module bundling)
- **Styling:** Tailwind CSS 3.4+ (utility-first design system)
- **Routing:** React Router DOM 6+
- **Icons:** Lucide React
- **State Management:** Native React Context (`AuthContext`, `CartContext`)

### Backend
- **Runtime:** Node.js 20+ LTS
- **Server Framework:** Express.js 4+
- **Database:** MongoDB 7+ with Mongoose 8+ ODM
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Security & Utilities:** `helmet`, `cors`, `express-rate-limit`, `dotenv`

---

## 🏛️ System Architecture

PawPetStore follows a **Modular Monolith** architecture with clean client-server separation:

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT LAYER                          │
│            React 18 + Vite + Tailwind CSS + Context         │
│  (Pages: Home, Catalog, ProductDetail, Cart, Clinic, etc.)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON (REST API)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                          │
│                   Node.js + Express.js                      │
│                                                             │
│   Middleware: Auth (JWT), Rate Limiter, Error Handler, CORS │
│   Controllers: Auth, Products, Orders, Clinic, Admin        │
│   Models: User, Product, Category, Breed, Order, etc.       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Mongoose ODM
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                         │
│                    MongoDB (NoSQL)                          │
│   Collections: users, products, categories, orders, etc.    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure

The root of the repository strictly follows the **5-Item Rule**:
```text
PawPetStore/
├── frontend/                   # Modern React + Vite SPA
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── assets/             # Brand logos, pet category graphics
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Button, Input, Modal, Badge, Loader
│   │   │   ├── layout/         # Navbar, Footer, MobileNav
│   │   │   ├── home/           # Hero, CategoryCards, BreedShowcase
│   │   │   ├── catalog/        # FilterSidebar, SortDropdown, SearchBar
│   │   │   ├── product/        # ProductCard, ProductGallery, ProductInfo
│   │   │   ├── cart/           # CartDrawer, CartItem, OrderSummary
│   │   │   ├── checkout/       # AddressForm, PaymentSelector
│   │   │   ├── clinic/         # ServiceCard, BookingModal
│   │   │   └── account/        # ProfileTab, OrdersTab, AppointmentsTab
│   │   ├── context/            # AuthContext, CartContext, ThemeContext
│   │   ├── hooks/              # useDebounce, useFetch
│   │   ├── layouts/            # MainLayout, AdminLayout
│   │   ├── pages/              # Route views (Home, Products, Clinic, Admin, etc.)
│   │   ├── services/           # API service modules (fetch client)
│   │   ├── utils/              # formatCurrency, dateHelpers, validators
│   │   ├── App.jsx             # Top-level Router & Route split definitions
│   │   ├── index.css           # Tailwind design tokens & dark mode classes
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML5 entry with metadata
│   ├── tailwind.config.js      # Tailwind theme configuration
│   ├── package.json            # Frontend dependencies and scripts
│   └── vite.config.js          # Vite build configuration & /api proxy
│
├── backend/                    # Backend REST API (Node.js + Express + MongoDB)
│   ├── config/                 # Database connection & env validation
│   ├── controllers/            # Route handler business logic
│   ├── middleware/             # Auth check, role guard, error handler
│   ├── models/                 # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/                 # Express REST route endpoints
│   ├── seed/                   # Realistic seed data and populate script
│   ├── utils/                  # Token generator, API response helper
│   ├── validators/             # Request payload validation schemas
│   ├── app.js                  # Express middleware configuration
│   ├── package.json            # Backend dependencies and scripts
│   └── server.js               # HTTP listener & DB connection entry point
│
├── README.md                   # Comprehensive public-facing documentation
├── ROADMAP.md                  # Detailed phase-by-phase execution tracking
└── BRAIN.md                    # Permanent project rules & architectural laws
```

---

## 🛠️ Installation & Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm:** v9.0.0 or higher
- **MongoDB:** Local MongoDB Community Server running on `mongodb://localhost:27017` OR a MongoDB Atlas cloud URI.

### 1. Clone or Open Project
```bash
cd PawPetStore
```

### 2. Configure Environment Variables
Set up environment files inside `backend/` and `frontend/`:
```bash
# In backend directory (backend/.env):
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pawpetstore
JWT_SECRET=super_secret_jwt_key_replace_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

# In frontend directory (frontend/.env):
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Seed the Database
Populate your MongoDB database with realistic pet products, breeds, and clinic services:
```bash
cd backend
npm run seed
```

---

## ⚙️ Environment Variables

The project utilizes environment variables to keep sensitive credentials secure. Never commit real `.env` files.

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pawpetstore
JWT_SECRET=super_secret_jwt_key_replace_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🗄️ Database Architecture & Setup

PawPetStore uses MongoDB with strict Mongoose schemas:

| Collection | Description | Key Indexes |
|---|---|---|
| `users` | Customer and Admin credentials, addresses, and wishlist. | `email` (unique) |
| `products` | Pet food, supplies, toys, and healthcare products. | `slug` (unique), `petType`, `category`, `price`, `rating` |
| `categories` | Categorization for Dog, Cat, Bird, and General items. | `slug` (unique) |
| `breeds` | Dog and cat breed characteristics and care advice. | `name`, `petType` |
| `orders` | Completed customer purchases, line items, and delivery status. | `user`, `orderStatus`, `createdAt` |
| `clinicServices` | Veterinary consultation packages and pricing. | `slug` (unique), `isAvailable` |
| `appointments` | Booked veterinary slots, pet details, and status. | `user`, `date`, `status` |

---

## 🚦 Running the Application

Run the backend and frontend in separate terminals:

**Terminal 1 (Backend REST API):**
```bash
cd backend
npm run dev
# Server listening on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Vite dev server running on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser to access the PawPetStore interface.

---

## 📡 REST API Documentation

All responses return a standardized JSON envelope:
`{ "success": true, "statusCode": 200, "message": "...", "data": { ... } }`

### Authentication Endpoints
- `POST /api/auth/register` — Register a new user account.
- `POST /api/auth/login` — Authenticate user and receive JWT.
- `GET /api/auth/me` — Retrieve current authenticated user profile *(Protected)*.

### Products & Catalog
- `GET /api/products` — Retrieve paginated products with multi-filter query support.
- `GET /api/products/:id` — Retrieve comprehensive details for a specific product.
- `GET /api/categories` — List all product categories.
- `GET /api/breeds` — Retrieve breed list with care guidelines.

### Orders & Checkout
- `POST /api/orders` — Create a new order *(Protected)*.
- `GET /api/orders/my-orders` — Retrieve past orders for authenticated user *(Protected)*.
- `GET /api/orders/:id` — Retrieve individual order receipt *(Protected)*.

### Veterinary Clinic
- `GET /api/clinic/services` — List all available clinical procedures and pricing.
- `POST /api/clinic/appointments` — Book a veterinary consultation slot *(Protected)*.
- `GET /api/clinic/appointments/my-appointments` — View user's appointments *(Protected)*.

### Admin Operations *(Admin Role Only)*
- `GET /api/admin/stats` — Aggregate metrics (revenue, orders count, low stock items).
- `POST /api/products` — Add a new product to inventory.
- `PUT /api/products/:id` — Update product details or stock level.
- `DELETE /api/products/:id` — Deactivate or remove a product.
- `PUT /api/orders/:id/status` — Advance order fulfillment status.

---

## 🔒 Security Engineering

- **Password Encryption:** Passwords salted and hashed with `bcryptjs` (cost factor 10). Plaintext passwords never stored.
- **Stateless Authorization:** Secure JWT tokens verified via Express middleware.
- **Input Sanitization:** Fail-fast validation prevents NoSQL injection and schema tampering.
- **Security Headers:** HTTP headers hardened using `helmet`.
- **CORS Policy:** Strict origin restriction protecting APIs from cross-origin exploits.
- **Brute-Force Protection:** Rate limiting applied to sensitive authentication routes via `express-rate-limit`.

---

## ⚡ Performance & Optimization

- **Route Splitting:** React routes split using `React.lazy()` and `Suspense`, loading chunks on demand.
- **Search Debounce:** Search queries debounced by 350ms to minimize server strain.
- **Asset Handling:** Responsive image dimensions, native lazy loading (`loading="lazy"`), and fallback image handlers prevent UI breakage.
- **Database Indexing:** Compound indexes on frequently filtered fields ensure sub-50ms query response times.

---

## 🖼️ Screenshots & UI Showcase

*(Screenshots will be captured and linked here upon UI completion in Phase 2/3)*

- **Homepage:** Hero banner, Shop by Pet cards, Breed showcase, and Trust badges.
- **Catalog & Search:** Multi-faceted filter sidebar, sorting options, and responsive product cards.
- **Product Details:** High-res gallery, specification tabs, and stock warnings.
- **Clinic Portal:** Veterinary consultation catalog and interactive appointment wizard.
- **Admin Dashboard:** Business KPIs and inventory management table.

---

## 🔄 Development Workflow & Git Guidelines

1. Always consult `BRAIN.md` before making architectural or structural changes.
2. Follow the 24-phase structure outlined in `ROADMAP.md`.
3. Keep commits atomic and descriptive:
   - `feat(catalog): implement multi-faceted product filtering`
   - `fix(cart): prevent quantity increment beyond warehouse stock`
   - `docs: update API endpoints in README`

---

## 🔮 Future Enhancements

- Live payment gateway integration (Razorpay / Stripe webhook sandbox).
- Real-time order delivery progress tracking.
- WhatsApp & SMS automated appointment confirmations.
- Digital Pet Health Passport with vaccination history PDF exports.

---

## 👨‍💻 Author & Academic Context

- **Developer:** BCA Student Portfolio Project
- **Project:** PawPetStore Full-Stack Web Application
- **Purpose:** Demonstrating full-stack engineering proficiency, database design, REST API craftsmanship, and modern UI/UX design.

*Crafted with care for pets and pet parents everywhere. 🐾*
