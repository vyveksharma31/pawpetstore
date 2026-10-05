# ROADMAP.md — PAWPETSTORE MASTER DEVELOPMENT ROADMAP

> **Project:** PawPetStore  
> **Architecture:** Full-Stack Modular Monolith (React + Vite + Tailwind CSS / Node.js + Express + MongoDB)  
> **Status Tracking:** Updated after the completion of each phase.  

---

## ROADMAP OVERVIEW & DEPENDENCY GRAPH

```
[Phase 0: Planning & Docs] ➔ [Phase 1: Project Setup] ➔ [Phase 2: Design System & Shell]
                                                                  │
┌─────────────────────────────────────────────────────────────────┴─────────────────────────────────┐
│                                                                                                   ▼
▼                                                                                         [Phase 4: Product Catalog API & DB]
[Phase 3: Homepage Visuals]                                                                         │
│                                                                                                   ▼
│                                                                                         [Phase 5: Product Details Page]
│                                                                                                   │
│                                                                                                   ▼
│                                                                                         [Phase 6: Search, Filter & Sort]
│                                                                                                   │
└───────────────────────────────────────────────────┬───────────────────────────────────────────────┘
                                                    ▼
                                          [Phase 7: Authentication]
                                                    │
                                                    ▼
                                          [Phase 8: Cart System]
                                                    │
                                                    ▼
                                          [Phase 9: Checkout & Orders]
                                                    │
    ┌───────────────────────────────────────────────┼───────────────────────────────────────────────┐
    ▼                                               ▼                                               ▼
[Phase 10-13: Dedicated Pet Niches]       [Phase 14: Vet Clinic & Appointments]          [Phase 15: User Account Dashboard]
(Dogs, Cats, Birds, Accessories)                    │                                               │
    │                                               │                                               │
    └───────────────────────────────────────────────┴───────────────────────────────────────────────┘
                                                    │
                                                    ▼
                                          [Phase 16: Admin Dashboard]
                                                    │
                                                    ▼
                                          [Phase 17: Backend Hardening & Security]
                                                    │
                                                    ▼
                                          [Phase 18: Performance & Optimization]
                                                    │
                                                    ▼
                                          [Phase 19: Accessibility & Mobile Testing]
                                                    │
                                                    ▼
                                          [Phase 20: Comprehensive Verification & Testing]
                                                    │
                                                    ▼
                                          [Phase 21: Final Documentation & Portfolio Polish]
                                                    │
                                                    ▼
                                          [Phase 22: Git & GitHub Integration (When Limit Resets)]
                                                    │
                                                    ▼
                                          [Phase 23: Production Deployment Readiness]
```

---

## PHASE BREAKDOWN & EXECUTION MATRIX

---

### PHASE 0 — Project Planning, Architecture & Documentation
- **Status:** [x] Completed
- **Objective:** Establish the engineering foundation, architecture blueprint, development rules, roadmap, and project documentation prior to generating any application code.
- **Features:**
  - Project directory structure design.
  - Definition of permanent project rules in `BRAIN.md`.
  - Step-by-step 24-phase roadmap with verification gates in `ROADMAP.md`.
  - Comprehensive GitHub-ready project documentation in `README.md`.
  - Production-ready `.gitignore` and `.env.example`.
- **Files Involved:** `BRAIN.md`, `ROADMAP.md`, `README.md`, `.gitignore`, `.env.example`
- **Backend / Database / API Work:** Architectural design and schema drafting.
- **Frontend Work:** UI/UX design token definition, color palette selection, responsive layout planning.
- **Testing Requirements:** Validate documentation clarity and cross-document consistency.
- **Completion Criteria:** All 3 core documentation files and configuration templates are in place and aligned.

---

### PHASE 1 — Project Initialization & Tooling Setup
- **Status:** [x] Completed
- **Objective:** Initialize the decoupled frontend (`frontend/`) and backend (`backend/`) environments with essential configurations, scripts, and dependencies.
- **Features:**
  - Initialize Vite React project in `frontend/` with Tailwind CSS and PostCSS.
  - Initialize Node.js Express server in `backend/` with `package.json`.
  - Configure root scripts (`concurrently` or parallel scripts for running both services easily).
  - Setup environment variable loading (`dotenv`) and CORS configuration.
- **Files Involved:**
  - `frontend/package.json`, `frontend/vite.config.js`, `frontend/tailwind.config.js`, `frontend/postcss.config.js`, `frontend/src/index.css`, `frontend/src/main.jsx`
  - `backend/package.json`, `backend/server.js`, `backend/app.js`, `backend/config/db.js`
- **Backend Work:** Express app bootstrap, basic health check endpoint (`GET /api/health`), MongoDB connection utility.
- **Database Work:** Verify local or remote MongoDB connection strings and error handling.
- **API Work:** `GET /api/health` returns `{ success: true, message: "PawPetStore API is healthy" }`.
- **Frontend Work:** Tailwind setup validation, clean modern reset, Lucide icons integration.
- **Testing Requirements:** Both frontend dev server and backend server start cleanly without syntax or dependency errors.
- **Completion Criteria:** Running `npm run dev` in frontend serves the Vite application, and running `npm run server` in backend connects to database and responds to health checks.

---

### PHASE 2 — Design System & Global UI Shell
- **Status:** [x] Completed
- **Objective:** Build reusable atomic UI components and the persistent global shell (Navbar, Mobile Drawer, Location Selector modal, Footer).
- **Features:**
  - Full-featured responsive Navbar with brand logo, nav links, category dropdowns, search trigger, location picker button, wishlist counter, cart badge, and auth state preview.
  - Mobile slide-out drawer navigation with touch-friendly accordion links.
  - Interactive location selector modal allowing users to choose or type their delivery city/pincode.
  - Comprehensive Footer featuring brand story, quick links, category links, clinic links, customer care, and newsletter input.
  - Core atomic components: Button, Input, Modal, Badge, Dropdown, Spinner/Loader, Toast.
- **Files Involved:**
  - `frontend/src/components/layout/Navbar.jsx`
  - `frontend/src/components/layout/MobileNav.jsx`
  - `frontend/src/components/layout/Footer.jsx`
  - `frontend/src/components/common/Button.jsx`
  - `frontend/src/components/common/Modal.jsx`
  - `frontend/src/components/common/Badge.jsx`
  - `frontend/src/components/common/LocationModal.jsx`
  - `frontend/src/layouts/MainLayout.jsx`
- **Backend / Database / API Work:** None (Pure UI Foundation).
- **Frontend Work:** Responsive navigation, mobile drawer transitions, sticky navbar with backdrop blur.
- **Testing Requirements:** Test layout at 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop).
- **Completion Criteria:** Reusable component library functional; Navbar and Footer render seamlessly across all responsive breakpoints.

---

### PHASE 3 — Homepage & Visual Storytelling
- **Status:** [x] Completed
- **Objective:** Create a high-converting, visually rich homepage that immediately communicates trust, quality, and the dual nature of PawPetStore (Commerce + Vet Care).
- **Features:**
  - **Hero Section:** Engaging headline, value proposition, CTA buttons ("Shop Now", "Book Vet Care"), high-res pet hero imagery, and floating trust metrics.
  - **Shop by Pet Section:** Visual category cards for Dogs, Cats, Birds, and General Accessories with hover scale micro-animations.
  - **Shop by Dog Breed Section:** Interactive carousel/grid of top dog breeds with photo, temperament, and link to filtered products.
  - **Cat Breeds Highlight:** Spotlight on popular cat breeds.
  - **Bird Life Section:** Feathered friend essentials showcase.
  - **Veterinary Banner:** Highlighting on-demand clinic checkups, vaccinations, and expert consultation.
  - **Trust & Quality Badges:** 100% Genuine Pet Food, Free Shipping on ₹999+, Verified Vets, 24/7 Pet Parent Support.
- **Files Involved:**
  - `frontend/src/pages/HomePage.jsx`
  - `frontend/src/components/home/HeroSection.jsx`
  - `frontend/src/components/home/PetCategories.jsx`
  - `frontend/src/components/home/BreedShowcase.jsx`
  - `frontend/src/components/home/ClinicBanner.jsx`
  - `frontend/src/components/home/TrustBadges.jsx`
- **Backend / Database / API Work:** Serve initial featured categories & breeds via API endpoint or mock seed fallback.
- **Frontend Work:** CSS transitions, responsive grid layouts, card hover effects.
- **Testing Requirements:** Verify homepage looks visually striking, loads swiftly, and all CTA buttons route properly.
- **Completion Criteria:** Homepage renders complete with zero broken images, zero layout jumps, and rich aesthetic polish.

---

### PHASE 4 — Product Catalog & Database Architecture
- **Status:** [x] Completed
- **Objective:** Implement the MongoDB database schemas, robust seed dataset (60+ realistic products), and RESTful product query endpoints.
- **Features:**
  - Mongoose models for `Product`, `Category`, and `Breed`.
  - Realistic seed script (`backend/seed/seedData.js`) containing 65+ curated pet products across Dogs, Cats, Birds, and Accessories (brands like Royal Canin, Pedigree, Whiskas, Sheba, Drools, Me-O, Versele-Laga).
  - REST endpoints for fetching products with pagination, category filtering, pet type filtering, price range, and sorting.
- **Files Involved:**
  - `backend/models/Product.js`, `backend/models/Category.js`, `backend/models/Breed.js`
  - `backend/controllers/productController.js`, `backend/routes/productRoutes.js`
  - `backend/seed/seedData.js`, `backend/seed/products.json`
- **Backend Work:** Dynamic query builder supporting `$regex`, `$gte`, `$lte`, `$in`, pagination (`limit`, `skip`), and sort fields.
- **Database Work:** Indexing on `petType`, `category`, `price`, `rating`, `slug`.
- **API Work:**
  - `GET /api/products` (supports query params: `petType`, `category`, `breed`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`)
  - `GET /api/products/:id`
  - `GET /api/categories`
  - `GET /api/breeds`
- **Frontend Work:** API client service (`frontend/src/services/productService.js`) with Axios or fetch.
- **Testing Requirements:** Execute seed script, query API via curl/browser, verify structured JSON response and pagination meta.
- **Completion Criteria:** Database populated with realistic data; `GET /api/products` returns clean paginated results with proper status codes.

---

### PHASE 5 — Product Details Page & Gallery
- **Status:** [x] Completed
- **Objective:** Build an immersive product detail view with multi-image gallery, pricing breakdown, specifications, stock indicator, and review highlights.
- **Features:**
  - Multi-image interactive gallery with thumbnail selector.
  - Price display with original MRP, discounted price, and percentage savings badge.
  - Stock availability status ("In Stock" with green badge, "Only 3 left" with warning badge, or "Out of Stock").
  - Quantity selector component (bounded between 1 and available stock).
  - Tabbed specification section (Description, Ingredients/Materials, Feeding/Usage Guide, Suitable Breeds).
  - Add to Cart and Instant Buy Now action buttons.
  - Related/recommended products carousel.
- **Files Involved:**
  - `frontend/src/pages/ProductDetailPage.jsx`
  - `frontend/src/components/product/ProductGallery.jsx`
  - `frontend/src/components/product/ProductInfo.jsx`
  - `frontend/src/components/product/ProductTabs.jsx`
  - `frontend/src/components/product/RelatedProducts.jsx`
- **Backend Work:** `GET /api/products/:id/related` or controller logic to fetch products sharing petType and category.
- **API Work:** `GET /api/products/:slugOrId`.
- **Frontend Work:** Route definition `/products/:id`, skeleton loading state, breadcrumbs navigation.
- **Testing Requirements:** Navigate from homepage/catalog to product detail; verify correct data rendering, image switching, and edge-case handling for out-of-stock items.
- **Completion Criteria:** Product details page fully dynamic, renders rich product information, and gracefully handles invalid IDs (404 state).

---

### PHASE 6 — Search, Filter & Sort System
- **Status:** [x] Completed
- **Objective:** Create a fast, intuitive e-commerce search and multi-faceted filtering interface.
- **Features:**
  - Dedicated `/products` catalog page with sticky/collapsible filter sidebar.
  - Global search bar with 350ms debounce and real-time dropdown suggestions.
  - Filter criteria: Pet Type (Dog, Cat, Bird), Category, Sub-Category, Price Range slider/inputs, Brand checkboxes, Minimum Customer Rating.
  - Sort options: Featured / Relevance, Price: Low to High, Price: High to Low, Customer Rating, Newest Arrivals.
  - Active filter chips with one-click remove and "Clear All" action.
  - Empty state when no products match with "Reset Filters" action.
- **Files Involved:**
  - `frontend/src/pages/ProductListPage.jsx`
  - `frontend/src/components/catalog/FilterSidebar.jsx`
  - `frontend/src/components/catalog/SortDropdown.jsx`
  - `frontend/src/components/catalog/ActiveFilterChips.jsx`
  - `frontend/src/components/common/SearchBar.jsx`
  - `frontend/src/hooks/useDebounce.js`
- **Backend Work:** Enhanced text search indexing or regex queries across `name`, `brand`, `description`, `keywords`.
- **API Work:** `GET /api/products/search?q=royal` and advanced query string filtering.
- **Frontend Work:** URL query params synchronization (`?search=dog+food&category=food&sort=price_asc`) so search results can be bookmarked/shared.
- **Testing Requirements:** Test search queries with spaces/special characters, test multiple combined filters, verify pagination preserves active filters.
- **Completion Criteria:** Searching and filtering updates the catalog instantaneously with zero page reloads.

---

### PHASE 7 — Authentication & User State
- **Status:** [x] Completed
- **Objective:** Implement secure user registration, login, logout, and protected client routes with JWT tokens.
- **Features:**
  - User model with bcrypt password hashing and email uniqueness constraints.
  - Auth controllers for `register`, `login`, and `getMe` (current user profile).
  - JWT generation with signed payload and expiry.
  - `AuthContext` on frontend managing token storage (localStorage/memory), user state, and login/logout methods.
  - Auth modal / pages for Login and Register with form validation (email format, password length).
  - Protected Route wrapper component (`ProtectedRoute.jsx`) safeguarding private pages.
- **Files Involved:**
  - `backend/models/User.js`
  - `backend/controllers/authController.js`
  - `backend/routes/authRoutes.js`
  - `backend/middleware/authMiddleware.js`
  - `frontend/src/context/AuthContext.jsx`
  - `frontend/src/pages/LoginPage.jsx`
  - `frontend/src/pages/RegisterPage.jsx`
  - `frontend/src/components/auth/ProtectedRoute.jsx`
- **Backend Work:** Token signing, `protect` and `adminOnly` middleware verifying Bearer tokens.
- **API Work:**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- **Frontend Work:** Form validation, error messages display (e.g., "Invalid credentials", "Email already in use"), persistent login session on page refresh.
- **Testing Requirements:** Register a new user, verify hashed password in DB, login and receive token, access protected `/account` route, verify unauthorized access redirects to `/login`.
- **Completion Criteria:** Full auth cycle working with clear error messages, secure token handling, and protected route redirection.

---

### PHASE 8 — Cart Management System
- **Status:** [x] Completed
- **Objective:** Provide a seamless, responsive shopping cart experience with local persistence and backend synchronization.
- **Features:**
  - Slide-over Cart Drawer accessible from any page via the Navbar cart icon.
  - Dedicated full `/cart` page.
  - Operations: Add item, Remove item, Increment/Decrement quantity (with max stock limits), Clear cart.
  - Calculation of Subtotal, Estimated Taxes, Delivery Fees (Free over ₹999), and Grand Total.
  - Persistent cart state in `localStorage` for guests, synced with server when logged in.
  - Out-of-stock warning and quantity cap safeguards.
- **Files Involved:**
  - `frontend/src/context/CartContext.jsx`
  - `frontend/src/components/cart/CartDrawer.jsx`
  - `frontend/src/components/cart/CartItem.jsx`
  - `frontend/src/pages/CartPage.jsx`
  - `frontend/src/components/cart/OrderSummaryCard.jsx`
  - `backend/models/Cart.js` (Optional server sync)
- **Backend Work:** Cart validation helper to ensure prices and stock remain authentic before checkout.
- **Frontend Work:** Optimistic UI updates with instant badge counter animation and quantity toast feedback.
- **Testing Requirements:** Add multiple items, change quantities, reload browser to test persistence, verify calculations match to the exact rupee.
- **Completion Criteria:** Cart works reliably for both guest and authenticated users without calculation discrepancies.

---

### PHASE 9 — Checkout & Order Processing
- **Status:** [x] Completed
- **Objective:** Build a multi-step checkout workflow with shipping address input, payment method selection (Cash on Delivery & Demo Online Payment), and order confirmation.
- **Features:**
  - Step 1: Customer details & Shipping Address form with validation (Name, Phone, Address, City, State, Pincode).
  - Step 2: Order summary review (Items, Quantities, Pricing breakdown).
  - Step 3: Payment method choice (Cash on Delivery / UPI Demo Payment / Card Demo).
  - Step 4: Order placement, inventory reduction, and generation of unique Order ID (e.g., `ORD-2026-XXXX`).
  - Dedicated `/order-success/:orderId` page showing order receipt, delivery timeline, and action buttons ("Continue Shopping", "View Orders").
- **Files Involved:**
  - `backend/models/Order.js`
  - `backend/controllers/orderController.js`
  - `backend/routes/orderRoutes.js`
  - `frontend/src/pages/CheckoutPage.jsx`
  - `frontend/src/pages/OrderSuccessPage.jsx`
  - `frontend/src/components/checkout/AddressForm.jsx`
  - `frontend/src/components/checkout/PaymentMethodSelector.jsx`
- **Backend Work:** Order creation controller verifying product prices and decrementing stock within a transactional/atomic check.
- **API Work:**
  - `POST /api/orders`
  - `GET /api/orders/:id`
  - `GET /api/orders/my-orders`
- **Frontend Work:** Multi-step form state management, submission loader, error handling.
- **Testing Requirements:** Place complete order with Cash on Delivery; verify order created in DB, stock decremented, cart emptied, and user redirected to confirmation.
- **Completion Criteria:** End-to-end checkout flow works cleanly without errors or data duplication.

---

### PHASE 10 — Dogs Dedicated Section
- **Status:** [x] Completed
- **Objective:** Curate an end-to-end portal specifically for dog parents (`/dogs`).
- **Features:**
  - Hero banner tailored to dogs.
  - Subcategory pills: Dry Food, Wet Food, Treats, Chew Toys, Beds & Mats, Collars & Leashes, Grooming, Supplements.
  - Breed selector highlighting popular dog breeds (Labrador, Golden Retriever, German Shepherd, Beagle, Indie, Shih Tzu) with breed care tips.
  - Filtered catalog view showing exclusively dog-suitable products.
- **Files Involved:**
  - `frontend/src/pages/DogsPage.jsx`
  - `frontend/src/components/pet/DogBreedFilter.jsx`
  - `frontend/src/components/pet/PetCategoryPills.jsx`
- **Backend / Database Work:** Ensure products are tagged with `petType: 'dog'` and relevant subcategories.
- **Testing Requirements:** Verify navigating to `/dogs` only shows dog products and breed filters function accurately.
- **Completion Criteria:** Dedicated dog section is fully populated and styled.

---

### PHASE 11 — Cats Dedicated Section
- **Status:** [x] Completed
- **Objective:** Curate an end-to-end portal specifically for cat parents (`/cats`).
- **Features:**
  - Cat-themed aesthetic banner and messaging.
  - Subcategory pills: Cat Dry Food, Wet Gravy Food, Cat Litter & Scoops, Scratching Posts & Trees, Interactive Toys, Grooming & Hairball Care.
  - Cat breed showcase (Persian, Siamese, Maine Coon, Bengal, Indie Cat).
  - Filtered catalog view showing exclusively cat-suitable products.
- **Files Involved:**
  - `frontend/src/pages/CatsPage.jsx`
  - `frontend/src/components/pet/CatBreedFilter.jsx`
- **Backend / Database Work:** Ensure products are tagged with `petType: 'cat'` and relevant subcategories.
- **Testing Requirements:** Verify cat products render correctly with cat-specific categories.
- **Completion Criteria:** Dedicated cat section is fully populated and styled.

---

### PHASE 12 — Birds Dedicated Section
- **Status:** [ ] Not started
- **Objective:** Curate an end-to-end portal specifically for bird parents (`/birds`).
- **Features:**
  - Bird sanctuary aesthetic banner and messaging.
  - Subcategory pills: Daily Seed Mix, Pellets, Mineral Blocks, Cages & Aviaries, Perches & Swings, Feeding Bowls & Waterers.
  - Bird species guide (Budgerigar, Cockatiel, Lovebird, African Grey, Finch, Canary).
  - Filtered catalog view showing bird-suitable products.
- **Files Involved:**
  - `frontend/src/pages/BirdsPage.jsx`
  - `frontend/src/components/pet/BirdSpeciesFilter.jsx`
- **Backend / Database Work:** Ensure products are tagged with `petType: 'bird'` and relevant subcategories.
- **Testing Requirements:** Verify bird catalog displays appropriate bird supplies and species care notes.
- **Completion Criteria:** Dedicated bird section is fully populated and styled.

---

### PHASE 13 — Pet Accessories & Care Section
- **Status:** [ ] Not started
- **Objective:** Provide a dedicated browsing experience for universal pet accessories and supplies (`/accessories`).
- **Features:**
  - Subcategories: Travel Carriers & Crates, Stainless Steel Bowls & Automatic Feeders, Deshedding Brushes & Shampoos, Waste Clean-up & Waste Bags, Pet Apparel & Raincoats.
  - Universal pet compatibility tags.
- **Files Involved:**
  - `frontend/src/pages/AccessoriesPage.jsx`
- **Testing Requirements:** Filter and search within accessories catalog.
- **Completion Criteria:** Accessories section functional and populated.

---

### PHASE 14 — Clinic & Veterinary Care Suite
- **Status:** [ ] Not started
- **Objective:** Build the platform's key differentiator: the `/clinic` veterinary portal and interactive appointment booking workflow.
- **Features:**
  - Veterinary service catalog cards: General Pet Checkup, Puppy/Kitten Vaccination Package, Dental Scaling & Cleaning, Dermatological / Fur Care, Nutrition Consultation, Emergency Triage.
  - Interactive multi-step Booking Modal / Page:
    - Step 1: Select Service & Pet Type (Dog, Cat, Bird).
    - Step 2: Choose Appointment Date (interactive date picker with disabled past dates).
    - Step 3: Choose available Time Slot (e.g., 10:00 AM, 11:30 AM, 02:00 PM, 04:30 PM).
    - Step 4: Enter Pet Details (Pet Name, Age/Months, Symptoms/Reason for visit) and Owner Contact Number.
    - Step 5: Appointment review and confirmation.
  - Database persistence in `appointments` collection with reference to the user.
  - Appointment confirmation screen with booking reference ID.
- **Files Involved:**
  - `backend/models/ClinicService.js`
  - `backend/models/Appointment.js`
  - `backend/controllers/clinicController.js`
  - `backend/routes/clinicRoutes.js`
  - `frontend/src/pages/ClinicPage.jsx`
  - `frontend/src/components/clinic/ServiceCard.jsx`
  - `frontend/src/components/clinic/BookingModal.jsx`
  - `frontend/src/components/clinic/VetTrustSection.jsx`
- **Backend Work:** Appointment slot conflict checks and creation controller.
- **API Work:**
  - `GET /api/clinic/services`
  - `POST /api/clinic/appointments`
  - `GET /api/clinic/appointments/my-appointments`
- **Frontend Work:** Accessible booking wizard, validation for date/time and phone number.
- **Testing Requirements:** Book an appointment, verify record created in DB with correct status (`pending`), view appointment under user appointments.
- **Completion Criteria:** Complete clinic booking system operational with validated data and user feedback.

---

### PHASE 15 — User Account Dashboard
- **Status:** [ ] Not started
- **Objective:** Create a personalized, responsive customer portal (`/account`) for managing orders, appointments, profile, and saved addresses.
- **Features:**
  - Tabbed or sidebar navigation: Profile Overview, Order History, Vet Appointments, Saved Addresses, Wishlist.
  - Order History: List past orders with status badges (`Pending`, `Confirmed`, `Delivered`), order date, total, and expandable item details.
  - Vet Appointments: List upcoming and past appointments with service name, scheduled date/time, and status.
  - Address Book: Add, edit, or delete shipping addresses.
  - Profile settings: Update name, phone number, and change password.
- **Files Involved:**
  - `frontend/src/pages/AccountPage.jsx`
  - `frontend/src/components/account/ProfileTab.jsx`
  - `frontend/src/components/account/OrdersTab.jsx`
  - `frontend/src/components/account/AppointmentsTab.jsx`
  - `frontend/src/components/account/AddressesTab.jsx`
  - `frontend/src/components/account/WishlistTab.jsx`
- **Backend Work:** Endpoints for fetching customer-specific orders and appointments based on authenticated JWT.
- **API Work:**
  - `GET /api/users/profile`
  - `PUT /api/users/profile`
  - `GET /api/orders/my-orders`
  - `GET /api/clinic/appointments/my-appointments`
- **Testing Requirements:** Log in as user, update profile, verify orders and appointments display accurately.
- **Completion Criteria:** User dashboard provides comprehensive self-service management.

---

### PHASE 16 — Admin Dashboard
- **Status:** [ ] Not started
- **Objective:** Construct an authorized Administrative Dashboard (`/admin`) to oversee business metrics, inventory, orders, and clinic appointments.
- **Features:**
  - Protected admin route (`adminOnly` middleware verifying `role === 'admin'`).
  - Analytics Summary Cards: Total Revenue, Total Orders Placed, Active Products, Upcoming Appointments.
  - Product Inventory Table: List all products with stock indicators, quick search, Add New Product modal, Edit Product modal, and Delete/Deactivate button.
  - Order Management: View incoming orders, filter by status, update order status (`Pending` -> `Confirmed` -> `Shipped` -> `Delivered`).
  - Appointment Management: View booked vet consultations, update status (`Confirmed` / `Completed` / `Cancelled`).
- **Files Involved:**
  - `frontend/src/pages/admin/AdminDashboardPage.jsx`
  - `frontend/src/pages/admin/AdminProductsPage.jsx`
  - `frontend/src/pages/admin/AdminOrdersPage.jsx`
  - `frontend/src/pages/admin/AdminAppointmentsPage.jsx`
  - `backend/controllers/adminController.js`
  - `backend/routes/adminRoutes.js`
- **Backend Work:** Admin aggregation queries calculating real totals from MongoDB collections (no fake charts or random numbers).
- **API Work:**
  - `GET /api/admin/stats`
  - `POST /api/products` (Admin only)
  - `PUT /api/products/:id` (Admin only)
  - `DELETE /api/products/:id` (Admin only)
  - `PUT /api/orders/:id/status` (Admin only)
  - `PUT /api/clinic/appointments/:id/status` (Admin only)
- **Testing Requirements:** Attempt accessing admin routes as regular user (expect 403 Forbidden), login as admin user, perform product update and order status change.
- **Completion Criteria:** Admin dashboard fully functional, reflecting live database metrics.

---

### PHASE 17 — Backend Hardening & Security
- **Status:** [ ] Not started
- **Objective:** Fortify the backend API against malicious inputs, brute-force attempts, and common vulnerabilities.
- **Features:**
  - Request validation schemas for all write endpoints (Auth, Products, Orders, Appointments).
  - Centralized global error handling middleware catching Mongoose CastErrors, ValidationErrors, and duplicate key errors.
  - Security headers via `helmet`.
  - Rate limiting via `express-rate-limit` on `/api/auth` endpoints.
  - Data sanitization against NoSQL query injection.
  - Production-ready CORS whitelist configuration.
- **Files Involved:**
  - `backend/middleware/errorHandler.js`
  - `backend/middleware/rateLimiter.js`
  - `backend/validators/authValidator.js`
  - `backend/validators/orderValidator.js`
- **Testing Requirements:** Submit malformed JSON, invalid IDs, duplicate emails, and rapid successive requests to confirm proper HTTP status codes (400, 429) and safe error messages without stack trace leaks.
- **Completion Criteria:** Zero unhandled promise rejections; robust security headers and validation on all routes.

---

### PHASE 18 — Performance & Asset Optimization
- **Status:** [ ] Not started
- **Objective:** Maximize application responsiveness, streamline bundle sizes, and optimize media delivery.
- **Features:**
  - Route code-splitting with `React.lazy()` and `Suspense` for all top-level page routes.
  - Image lazy loading (`loading="lazy"`) and graceful fallback placeholders for failed image loads.
  - Debounced input handlers for search and filter inputs.
  - Database index validation using MongoDB explain plans on high-frequency filters.
- **Files Involved:** `frontend/src/App.jsx`, `frontend/src/components/common/ImageWithFallback.jsx`
- **Testing Requirements:** Inspect network waterfall in browser DevTools to verify chunks load on-demand when navigating routes.
- **Completion Criteria:** Clean bundle split, instant navigation, no unoptimized network payloads.

---

### PHASE 19 — Accessibility & Responsive Testing
- **Status:** [ ] Not started
- **Objective:** Ensure compliance with basic web accessibility guidelines (WCAG AA) and flawless mobile responsiveness.
- **Features:**
  - Semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<article>`).
  - Screen reader friendly attributes (`aria-label`, `aria-expanded`, `aria-hidden` where appropriate).
  - Visible focus indicators on all interactive elements.
  - Cross-device layout verification across 375px (iPhone SE), 390px (iPhone 14), 768px (iPad Mini), 1024px (iPad Pro), and 1440px (Desktop).
- **Files Involved:** All client components.
- **Testing Requirements:** Full keyboard navigation test (Tab, Enter, Escape on modals); test on mobile viewport emulation.
- **Completion Criteria:** Flawless keyboard accessibility and zero horizontal overflow on mobile viewports.

---

### PHASE 20 — Comprehensive Testing & Verification
- **Status:** [ ] Not started
- **Objective:** Perform end-to-end verification of all critical user journeys.
- **Features:**
  - Journey 1: Guest user lands on homepage, searches "puppy food", filters by price, views product detail, and adds to cart.
  - Journey 2: User registers new account, logs in, proceeds to checkout, enters shipping address, places Cash-on-Delivery order.
  - Journey 3: User navigates to `/clinic`, books a veterinary consultation for a pet, receives confirmation, and views booking in `/account`.
  - Journey 4: Admin logs in, updates product stock, checks live revenue stats, and updates order status.
- **Testing Requirements:** Document manual or automated test execution and log results.
- **Completion Criteria:** All 4 major journeys complete without errors or console warnings.

---

### PHASE 21 — Final Documentation & Code Commentary
- **Status:** [ ] Not started
- **Objective:** Polish codebase documentation, clarify architectural patterns, and finalize the portfolio presentation for interview readiness.
- **Features:**
  - Add explanatory comments to key architectural patterns (JWT auth flow, cart reducer, query builder) explaining the "Why" for viva preparation.
  - Update `README.md` with accurate feature descriptions, screenshots, API reference table, and quick start guides.
  - Synchronize `BRAIN.md` with any final adjustments.
- **Files Involved:** `README.md`, `BRAIN.md`, `ROADMAP.md`
- **Completion Criteria:** Documentation is 100% accurate, professional, and reflects the true final implementation.

---

### PHASE 22 — Git & GitHub Integration
- **Status:** [ ] Not started (Deferred until GitHub rate limit clears)
- **Objective:** Initialize Git version control, prepare branch structure, craft descriptive commit messages, and push to remote repository.
- **Features:**
  - `git init` in project root.
  - Verify `.gitignore` prevents `.env` and `node_modules` from tracking.
  - Clean initial commit with professional commit message.
  - Configure GitHub remote and push `main` branch.
- **Completion Criteria:** Clean repository pushed to GitHub with verified commit history.

---

### PHASE 23 — Production Deployment Readiness
- **Status:** [ ] Not started
- **Objective:** Prepare production build artifacts and deployment documentation for cloud platforms (e.g., Vercel frontend + Render/Railway backend + MongoDB Atlas).
- **Features:**
  - Production build verification (`npm run build` in `client`).
  - Production static serving or cloud deployment configurations.
  - Comprehensive deployment guide in documentation.
- **Completion Criteria:** Production build succeeds without errors, ready for one-click hosting deployment.
