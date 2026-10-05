# BRAIN.md — PAWPETSTORE PROJECT MEMORY & ENGINEERING RULES

> **Version:** 1.0.0  
> **Last Updated:** October 2026  
> **Status:** Active Source of Truth  
> **Audience:** Developer (BCA Student Portfolio), AI Pair Programmer, Code Reviewers  

---

## 1. PROJECT PURPOSE & VISION

**PawPetStore** is a comprehensive, production-grade pet-commerce and veterinary care platform designed to serve pet parents with a seamless digital experience. Unlike basic student demo projects or static mockups, PawPetStore is engineered as a full-stack, enterprise-structured modular application combining:

1. **Modern Pet E-Commerce:** High-performance catalog browsing for Dogs, Cats, Birds, and General Pet Accessories (food, treats, toys, cages, grooming, health care) with real-time stock tracking, rich filtering, cart management, and order workflows.
2. **Breed Discovery Hub:** Data-driven breed exploration enabling pet parents to learn about physical traits, temperament, nutritional needs, and targeted product recommendations.
3. **Veterinary & Clinic Booking Suite:** A specialized service portal for booking clinical consultations, vaccinations, dental checkups, grooming appointments, and emergency pet care with date/time slot selection.
4. **User & Admin Portals:** Secure JWT-based authentication supporting customer profiles, order history, address books, appointment schedules, and an administrative control panel for inventory, order fulfillment, and service management.

### Portfolio Objective
This project serves as a capstone-level portfolio piece demonstrating mastery of full-stack engineering fundamentals: clean component architecture, robust RESTful APIs, relational data modeling inside MongoDB/Mongoose, security best practices, state management, and modern UI/UX design without unnecessary enterprise bloat.

---

## 2. TECHNOLOGY STACK & JUSTIFICATIONS

| Layer | Technology | Version / Tooling | Architectural Justification |
|---|---|---|---|
| **Frontend Framework** | **React** | 18+ (Vite) | Industry-standard declarative component architecture, virtual DOM performance, vast ecosystem, and clear mental model for a junior engineer. |
| **Build Tool** | **Vite** | Latest | Instant Hot Module Replacement (HMR), lightning-fast ES module bundling, and zero-config optimization compared to legacy Webpack/Create React App. |
| **Styling** | **Tailwind CSS** | 3.4+ | Utility-first CSS providing atomic styling consistency, tiny production bundle footprints (via PurgeCSS), rapid UI iteration, and built-in responsive breakpoints. |
| **Routing** | **React Router DOM** | 6+ | Declarative client-side routing, nested layouts, protected route wrappers, and dynamic URL parameter handling (`/products/:id`, `/clinic/:serviceId`). |
| **State Management** | **React Context + Hooks** | Native (`useContext`, `useReducer`, custom hooks) | Avoids premature Redux/Zustand boilerplate while providing clean, testable global state for Auth, Cart, and Notifications. |
| **Icons** | **Lucide React** | Latest | Feather-light, tree-shakeable modern SVG icons matching contemporary SaaS aesthetics. |
| **Backend Runtime** | **Node.js** | 20+ LTS | Asynchronous, event-driven JavaScript runtime sharing language parity across frontend and backend. |
| **Server Framework** | **Express.js** | 4+ | Minimalist, unopinionated, robust HTTP server layer facilitating clean middleware pipelines and REST routing. |
| **Database** | **MongoDB** | 7+ (Mongoose ODM) | Flexible document schema ideal for diverse product catalogs (varying attributes across dog food vs bird cages), rich subdocuments for orders, and indexing support. |
| **Authentication** | **JWT (JSON Web Tokens) + bcryptjs** | Stateless Bearer Tokens | Industry-standard secure stateless authorization with hashed, salted passwords (cost factor 10). |
| **Validation** | **Joi / Express-Validator** | Modular Schemas | Strict fail-fast request body and query parameter validation preventing database pollution and injection attacks. |

---

## 3. ARCHITECTURE DECISIONS

### Strict Root Structure Rule (Only 5 Items Allowed at Root)
The root directory of PawPetStore must contain **ONLY** these five items:
```text
PawPetStore/
├── frontend/        # Modern React + Vite + Tailwind CSS SPA
├── backend/         # Node.js + Express + MongoDB REST API
├── README.md        # Comprehensive Public Documentation
├── ROADMAP.md       # Step-by-Step Implementation Tracking
└── BRAIN.md         # Permanent Project Rules & Engineering Memory
```

**STRICT PROHIBITION:**
Do NOT create random files or folders directly in the project root:
No `client/`, `server/`, `src/`, `components/`, `models/`, `routes/`, `public/`, `assets/`, `node_modules/`, `package.json`, or `.env` at root.
All application source code, configuration files, and dependencies must reside exclusively within `frontend/` and `backend/`.

### Mandatory Workflow Before EVERY Task
```text
READ BRAIN.md
        ↓
READ README.md
        ↓
READ ROADMAP.md
        ↓
Identify current phase
        ↓
Identify current task
        ↓
Check dependencies
        ↓
Inspect existing implementation
        ↓
Make changes
        ↓
Run appropriate tests/checks
        ↓
Update documentation/status if required
```

### Why NOT Microservices?
Microservices add severe operational overhead (service discovery, distributed transactions, network latency, multiple deployments) that harms code maintainability for single-developer and small-team projects. A clean modular monolith with strict domain boundaries provides identical architectural hygiene with 10x developer productivity.

---

## 4. CODING CONVENTIONS & STYLE GUIDE

### General JavaScript Conventions
- **ES6+ Standards:** Use arrow functions, destructuring, template literals, optional chaining (`?.`), and nullish coalescing (`??`).
- **Async/Await:** Always use `async/await` with `try...catch` blocks for asynchronous operations. Never use raw promise chains (`.then().catch()`) unless wrapping an un-promisified callback API.
- **Naming Conventions:**
  - Files (React Components): `PascalCase.jsx` (e.g., `ProductCard.jsx`, `Navbar.jsx`)
  - Files (Utilities/Hooks/Backend): `camelCase.js` (e.g., `formatCurrency.js`, `useCart.js`, `productController.js`)
  - Folders: `kebab-case` or `camelCase` uniformly (e.g., `components/`, `controllers/`, `services/`)
  - Variables & Functions: `camelCase` (e.g., `fetchProductById`, `isCartOpen`)
  - Constants & Enums: `UPPER_SNAKE_CASE` (e.g., `ORDER_STATUS_PENDING`, `MAX_QUANTITY_PER_ITEM`)
  - Mongoose Models: `PascalCase` singular (e.g., `Product`, `User`, `Appointment`)

### Functions & Modularity
- **Single Responsibility Principle (SRP):** Each function or component must do exactly one thing well.
- **Max Function Length:** Strive for functions under 40 lines. Break complex logic into pure utility functions.
- **No Magic Numbers:** Replace bare numbers with named constants (e.g., `const FREE_SHIPPING_THRESHOLD_INR = 999;`).

---

## 5. UI/UX & DESIGN SYSTEM RULES

### Brand Identity
- **Brand Name:** PawPetStore
- **Core Mood:** Friendly, Trustworthy, Modern, Premium, Warm, Professional (never childish or clip-art looking).
- **Inspiration:** High-end Indian D2C pet brands (Heads Up For Tails, Supertails) fused with Chewy's reliable functional density.

### Color Palette (Tailwind Tokens)
- **Primary Brand (Warm Coral / Amber):**
  - Primary Base: `#F97316` (`orange-500`) / Hover: `#EA580C` (`orange-600`) / Light Tint: `#FFF7ED` (`orange-50`)
- **Secondary Accent (Forest Teal / Health):**
  - Secondary Base: `#0D9488` (`teal-600`) / Hover: `#0F766E` (`teal-700`) / Light Tint: `#F0FDFA` (`teal-50`)
- **Neutrals (Slate & Off-White):**
  - Background: `#F8FAFC` (`slate-50`)
  - Card Surface: `#FFFFFF` (`white`)
  - Text Primary: `#0F172A` (`slate-900`)
  - Text Muted: `#64748B` (`slate-500`)
  - Border Lines: `#E2E8F0` (`slate-200`)
- **Semantic Accents:**
  - Success: `#16A34A` (`green-600`)
  - Error: `#DC2626` (`red-600`)
  - Warning: `#D97706` (`amber-600`)
  - Star Rating: `#FBBF24` (`amber-400`)

### Typography
- Primary Font: **Inter** or **Outfit** (clean geometric sans-serif loaded via Google Fonts).
- Headings: Bold / ExtraBold with tight letter tracking (`tracking-tight`).
- Body: Normal weight (`font-normal`), line-height 1.6 (`leading-relaxed`) for maximum readability.

### Component Guidelines
- **Elevations & Borders:** Subtle borders (`border border-slate-200/80`) paired with soft natural box-shadows (`shadow-sm hover:shadow-md transition-shadow`).
- **Rounded Corners:** Consistent `rounded-xl` (12px) for cards, `rounded-lg` (8px) for buttons/inputs, `rounded-full` for badges/pills.
- **Transitions:** Snappy micro-interactions (`transition-all duration-200 ease-out`). Never use sluggish (>400ms) or jarring bouncy animations.
- **Feedback & States:** Every interactive button must show hover, active, focus-visible (accessible outline), and disabled/loading states.

---

## 6. BACKEND RULES & REST API CONVENTIONS

### Layered Separation of Concerns
1. **Routes (`backend/routes/`):** Define URL paths, HTTP verbs, attach auth/role middleware, and bind to controllers. No business logic.
2. **Controllers (`backend/controllers/`):** Parse HTTP requests, validate query/body, invoke service/model methods, and return standardized JSON responses.
3. **Models (`backend/models/`):** Mongoose schemas with strict types, default values, validation hooks, indexes, and virtual fields.
4. **Middleware (`backend/middleware/`):** Authentication checks, role authorization, centralized error handlers, CORS, rate limiters, request loggers.
5. **Utils/Helpers (`backend/utils/`):** Reusable pure logic (token generators, response formatters, custom error classes).

### Standard JSON Response Envelope
All API endpoints must return a predictable JSON envelope:
```json
// Success Response
{
  "success": true,
  "statusCode": 200,
  "message": "Products retrieved successfully",
  "data": { ... },
  "meta": {
    "total": 48,
    "page": 1,
    "limit": 12,
    "totalPages": 4
  }
}

// Error Response
{
  "success": false,
  "statusCode": 404,
  "message": "Product with ID 65a123... not found",
  "errors": []
}
```

### HTTP Status Codes
- `200 OK`: Successful GET, PUT, or DELETE.
- `201 Created`: Successful POST creating a resource.
- `400 Bad Request`: Validation failure or missing parameters.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks required permissions (e.g., non-admin accessing admin route).
- `404 Not Found`: Target resource does not exist.
- `409 Conflict`: Duplicate key error (e.g., email already registered).
- `500 Internal Server Error`: Unhandled server/database exceptions.

---

## 7. DATABASE CONVENTIONS & SCHEMAS

### Naming & Rules
- Database Name: `pawpetstore`
- Collection Names: Plural lowercase managed by Mongoose (e.g., `users`, `products`, `orders`).
- ID Fields: Standard MongoDB `_id` (`ObjectId`).
- Timestamps: Always enable `{ timestamps: true }` in Mongoose schemas for automatic `createdAt` and `updatedAt`.
- Soft Deletes: For critical business entities (like Products), prefer active status flags (`isActive: Boolean`) rather than hard deletion.

### Core Collections
1. **Users:** `name`, `email`, `password` (hashed), `role` (`'customer' | 'admin'`), `phone`, `addresses`, `wishlist`.
2. **Products:** `name`, `slug`, `brand`, `petType` (`'dog' | 'cat' | 'bird' | 'general'`), `category`, `subCategory`, `breedSuitability`, `price`, `discountPercentage`, `stock`, `images`, `description`, `specifications`, `rating`, `reviewCount`, `isFeatured`.
3. **Breeds:** `name`, `petType`, `origin`, `temperament`, `size`, `lifeSpan`, `image`, `description`, `careTips`, `recommendedCategories`.
4. **Orders:** `user`, `orderItems` (snapshot of product details & price at checkout), `shippingAddress`, `paymentMethod`, `paymentStatus`, `orderStatus`, `subtotal`, `shippingFee`, `totalAmount`, `trackingNumber`.
5. **ClinicServices:** `title`, `slug`, `category`, `shortDescription`, `fullDescription`, `durationMinutes`, `price`, `targetPets`, `image`, `isAvailable`.
6. **Appointments:** `user`, `service`, `petName`, `petType`, `petAge`, `ownerPhone`, `date`, `timeSlot`, `notes`, `status` (`'pending' | 'confirmed' | 'completed' | 'cancelled'`).

---

## 8. SECURITY RULES

1. **Password Safety:** Passwords must NEVER be stored in plain text. Always hash with `bcryptjs` with salt rounds >= 10. Exclude password fields by default in queries (`select: false`).
2. **Token Security:** Store JWT secrets in `.env`. Never send JWT secret to frontend. Use appropriate expiration times (e.g., `7d`).
3. **Environment Isolation:** Never hardcode database URIs, API keys, or port numbers in code. Use `dotenv`.
4. **CORS Configuration:** Restrict CORS in production to the trusted client origin. Allow local dev ports (`http://localhost:5173`) in development.
5. **Data Sanitization:** Sanitize user inputs to prevent NoSQL injection and XSS attacks. Validate ObjectIds before querying.
6. **Rate Limiting:** Protect public auth routes (`/api/auth/login`, `/api/auth/register`) with rate limiters to prevent brute-force attacks.

---

## 9. PERFORMANCE & OPTIMIZATION RULES

1. **Route Code-Splitting:** Use React `React.lazy()` and `Suspense` for page-level components so users only download the code for the active route.
2. **Image Performance:**
   - Always specify `alt` attributes.
   - Use `loading="lazy"` for images below the fold.
   - Serve responsive dimensions; avoid serving 4000px raw photos for 200px thumbnails.
   - Provide graceful fallback images if an image URL fails to load.
3. **Search Debounce:** Debounce search input keystrokes by 300ms–400ms to eliminate server hammering.
4. **Database Query Optimization:**
   - Index high-frequency query fields (`petType`, `category`, `price`, `rating`, `slug`).
   - Use `.select()` to exclude large unused fields in list endpoints.
   - Paginate all list endpoints (`limit`, `page`).

---

## 10. ERROR HANDLING & UI STATES

Never leave the user looking at a broken screen or an unhandled white-page crash. Every interactive view must implement the **4 Universal UI States**:

```
┌─────────────────────────────────────────────────────────────┐
│                   THE 4 UNIVERSAL UI STATES                 │
├───────────────┬─────────────────────────────────────────────┤
│ 1. LOADING    │ Skeleton loaders or accessible spinners.    │
│ 2. SUCCESS    │ Clean, populated content view.              │
│ 3. EMPTY      │ Friendly illustration/text + action button. │
│ 4. ERROR      │ Clear error message + "Try Again" button.   │
└───────────────┴─────────────────────────────────────────────┘
```

Backend errors must be caught by a centralized error-handling middleware (`errorHandler.js`) and returned formatted with meaningful messages.

---

## 11. THINGS THAT MUST NEVER BE DONE ❌

1. **NEVER** commit `.env`, `node_modules/`, `dist/`, or `.DS_Store` to Git.
2. **NEVER** commit plaintext credentials or API secrets.
3. **NEVER** build fake static buttons that do nothing when clicked.
4. **NEVER** build a giant 2000-line monolithic component file (e.g., one huge `App.jsx`).
5. **NEVER** rewrite working code without an explicit technical defect or user request.
6. **NEVER** use generic low-quality placeholder text like `"Product 1"`, `"Lorem ipsum"`. Use realistic pet names, brands (e.g., Royal Canin, Pedigree, Whiskas), and medical descriptions.
7. **NEVER** put backend business logic or database queries directly inside Express route files.
8. **NEVER** mutate React state directly (e.g., `cart.push(item)`); always use immutable updates (`setCart(prev => [...prev, item])`).
9. **NEVER** introduce bloated external dependencies when 15 lines of clean native JavaScript will suffice.

---

## 12. THINGS THAT SHOULD ALWAYS BE DONE ✅

1. **ALWAYS** check `BRAIN.md` and `ROADMAP.md` before starting any phase or feature.
2. **ALWAYS** write clean, readable code with intuitive naming that a BCA student can understand and defend in a technical viva/interview.
3. **ALWAYS** maintain consistent responsive behavior across Mobile (375px+), Tablet (768px+), and Desktop (1024px, 1280px+).
4. **ALWAYS** use environment variables for ports, URIs, and configuration keys.
5. **ALWAYS** update `ROADMAP.md` checkboxes when completing milestones.
6. **ALWAYS** provide realistic seed data so the application looks lively and functional out-of-the-box.
7. **ALWAYS** handle edge cases: empty search results, out-of-stock items, zero cart items, network failure.
8. **ALWAYS** format prices consistently (e.g., Indian Rupee `₹` format with comma separators).

---

## 13. FUTURE EXPANSION PLANS (POST-PHASE 23)

- Integration of live payment gateways (Razorpay / Stripe) in webhook-verified sandbox mode.
- SMS / WhatsApp appointment reminders via Twilio or Gupshup.
- Real-time order tracking with interactive timeline stages.
- Pet vaccination digital passport (downloadable PDF).
- AI Pet Diet Recommendation assistant.
