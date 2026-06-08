<div align="center">
  <h1 align="center">Zeco. (زيكو) - Full-Stack E-Commerce API & Platform</h1>

  <p align="center">
    A robust, scalable Full-Stack eCommerce platform featuring a powerful Backend API architecture seamlessly integrated with a modern, responsive React frontend.
    <br />
    <a href="#features"><strong>Explore the features »</strong></a>
    <br />
  </p>
</div>

<details open>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#project-architecture">Project Architecture</a></li>
    <li><a href="#author">Author</a></li>
  </ol>
</details>

## About The Project

**Zeco.** is a complete **Full-Stack eCommerce solution**. While it features a premium, meticulously designed frontend, the core of the project is its **robust Backend API architecture**. Engineered for high performance, security, and scalability, the backend manages complex relational data, secure authentication flows, and dynamic inventory management. The frontend acts as a seamless client to this powerful backend, offering lightning-fast state management and bilingual support.

---

## Tech Stack

This project leverages the latest and most powerful tools in the React ecosystem:

### Core Framework
* **[React 19](https://react.dev/)** & **[Vite](https://vitejs.dev/)** - Lightning-fast frontend tooling and rendering.
* **[React Router DOM v7](https://reactrouter.com/)** - Client-side routing.

### Backend & API Architecture
* **[Supabase](https://supabase.com/)** - Core Backend-as-a-Service providing a fully functional PostgreSQL database, authentication, and RESTful API layer.
* **PostgreSQL Database** - Scalable and highly relational database for products, categories, users, and orders.
* **Row Level Security (RLS)** - Advanced database-level security policies to protect user data and transactions.
* **Storage** - Secure cloud storage for product images and user media.

### Frontend & UI
* **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
* **[Material-UI (MUI)](https://mui.com/)** & **[PrimeReact](https://primereact.org/)** - For accessible and complex UI components.
* **[Lucide React](https://lucide.dev/)** - Beautiful & consistent iconography.
* **Swiper & React Slick** - Advanced touch-enabled carousels and sliders.

### Utilities
* **[i18next](https://www.i18next.com/)** - Internationalization (Bilingual EN/AR support).
* **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)** - Schema-based form validation.

---

## Key Features

⚙️ **Powerful Backend API & Database:**
- **Secure Authentication:** Full auth flow (Login, Register, Session management) powered by Supabase Auth.
- **Relational Database:** Complex PostgreSQL schema managing products, categories, inventory, and user carts.
- **API Endpoints:** RESTful data fetching for products with support for complex filtering, sorting, and pagination directly at the database level.

✨ **Premium Frontend UI/UX:** 
- Highly polished interface with micro-animations, glassmorphism, and a meticulously crafted design system.
- Flawless **Dark & Light Mode** toggle that natively integrates with Tailwind classes.
- Fast global state management using **Zustand**.

🌍 **True Bilingual Support (i18n):** 
- Full localization for **English (LTR)** and **Arabic (RTL)**.
- Dynamic layout flipping.
- Specialized typography integrations (e.g., *Cairo* for Arabic UI, *Lalezar* for Brand Typography).

---

## 🔐 Authentication & Backend Security

Zeco implements a state-of-the-art authentication system and a highly secure backend infrastructure:

### 1. Robust User Authentication (Supabase Auth)
- **Seamless Login/Register:** Fully featured email and password authentication flows.
- **Session Management:** Secure JWT-based session handling, persisted automatically across page reloads.
- **Form Validation:** Advanced client-side validation using **Zod** and **React Hook Form** to ensure data integrity before it even hits the server (e.g., strong password enforcement, valid email formats).

### 2. Backend Security (PostgreSQL & RLS)
- **Row Level Security (RLS):** Policies are enforced directly at the PostgreSQL database level. Users can only fetch, update, or delete their own data (like their personal cart items or profile data).
- **Protected Routes:** The React frontend uses higher-order components and Zustand state to instantly protect sensitive routes (like the Checkout page) and redirect unauthenticated users.

### 3. Global Auth State (Zustand)
- Authentication state is globally managed via a custom Zustand store (`useAuthStore`).
- The UI instantly reacts to authentication changes (e.g., the Navbar seamlessly swaps the "Login" button for a "Sign Out" button and user profile icon without page reloads).

---

## 🛒 Advanced E-Commerce Capabilities 
- **Smart Filtering & Sorting:** Filter products by category, price, and attributes instantly.
- **Slide-out Cart:** Interactive, globally managed shopping cart with real-time total calculations.
- **Skeleton Loaders:** Elegant loading states (not just spinners!) that match exact card layouts to prevent layout shift.

🚀 **Performance Optimized:** 
- Built on Vite for instant HMR.
- State handled by Zustand (no React Context re-rendering bottlenecks).
- Lazy loaded components and optimized image handling.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm or yarn or pnpm

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/Mohammed-Alssadi/eCommerce.git
   ```
2. Navigate to the project directory
   ```sh
   cd eCommerce-API
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set up your Environment Variables (Create a `.env` file in the root directory)
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
5. Run the development server
   ```sh
   npm run dev
   ```

---

## Project Architecture

The application follows a highly scalable **Feature-Sliced Design** approach. Inside the `src` directory, code is grouped by domain rather than file type:

```text
src/
├── components/       # Shared global components (Layout, UI, Navbar, Footer)
├── features/         # Domain-specific modules
│   ├── auth/         # Authentication logic and pages
│   ├── cart/         # Shopping cart state, components, and pages
│   ├── categories/   # Category browsing and filtering
│   ├── home/         # Landing page and Hero sections
│   ├── products/     # Product catalog, details, and cards
│   └── search/       # Search functionality
├── lib/              # Utility configurations (Supabase config, i18n config)
├── store/            # Global state (if not contained within features)
└── index.css         # Global Tailwind directives and base styles
```

---

## Author

**Mohammed Alssadi**
- GitHub: [Mohammed-Alssadi](https://github.com/Mohammed-Alssadi)

---
<p align="center">Built with ❤️ to redefine the eCommerce experience.</p>
