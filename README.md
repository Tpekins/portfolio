# Tiani Pekins Portfolio

A modern, full-stack portfolio platform built for showcasing engineering projects, technical blog posts, and professional contact. Designed for speed, clarity, and mobile-first browsing.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │   Home      │   │  Projects   │   │   About     │               │
│  │   (GSAP)    │   │   (Grid)    │   │   (Bio)     │               │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │    Blog     │   │  BlogPost   │   │   Contact   │               │
│  │ (Filter +   │   │  (Comments) │   │   (Form)    │               │
│  │  Search)    │   │             │   │             │               │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │
└─────────┼─────────────────┼─────────────────┼──────────────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                            ▼ HTTP/REST API
┌─────────────────────────────────────────────────────────────────────┐
│                       API GATEWAY (NestJS)                           │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │   /blog     │   │  /projects  │   │  /contact   │               │
│  │  (CRUD)     │   │  (CRUD)     │   │  (Submit)   │               │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │   /auth     │   │ /upload     │   │  /comments  │               │
│  │  (JWT)      │   │ (File)      │   │  (Create)   │               │
│  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │
└─────────┼─────────────────┼─────────────────┼──────────────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                            ▼ Prisma ORM
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                           │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │
│  │   users     │   │ blog_posts  │   │   projects  │               │
│  └─────────────┘   └─────────────┘   └─────────────┘               │
│  ┌─────────────┐   ┌─────────────┐                                   │
│  │   comments  │   │contact_sub..│                                   │
│  └─────────────┘   └─────────────┘                                   │
└─────────────────────────────────────────────────────────────────────┘
```

## Request Flow

```mermaid
flowchart TD
    A[User opens browser] --> B[React Router matches URL]
    B --> C{Static or Dynamic?}
    C -->|Static page| D[Render page component]
    C -->|Needs data| E[Call API service]
    E --> F[HTTP GET /blog?category=X]
    F --> G[NestJS Controller receives request]
    G --> H[Service validates query]
    H --> I{Category filter?}
    I -->|Yes| J[Apply Prisma where clause]
    I -->|No| K[Return all posts]
    J --> L[Prisma queries PostgreSQL]
    K --> L
    L --> M[Return JSON response]
    M --> N[React renders posts]
    N --> O[User sees blog list]
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 + Vite | UI rendering & SPA routing |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with custom tokens |
| **Animations** | Framer Motion (`motion/react`) | Scroll-linked animations, transitions |
| **Backend** | NestJS | Modular REST API architecture |
| **Database** | PostgreSQL + Prisma | Relational data with type-safe queries |
| **Auth** | JWT + Passport | Stateless token-based admin authentication |
| **Monorepo** | Turborepo | Shared packages, unified build pipeline |

---

## Project Structure

```
portfolio/
├── apps/
│   ├── frontend/          ← React SPA (6 pages, see README inside)
│   └── backend/           ← NestJS API (REST endpoints, see README inside)
│
├── packages/
│   ├── ui/                ← Shared React components (Navbar, Footer, Card, Button)
│   ├── categories/        ← Shared blog category definitions (All, Software, Tech, Life, Community)
│   └── eslint-config/     ← Shared lint rules
│
├── turbo.json             ← Turborepo task orchestration
└── package.json           ← Root workspace configuration
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database

### 1. Install dependencies
```bash
yarn install
```

### 2. Environment setup
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit .env and set DATABASE_URL
```

### 3. Database setup
```bash
cd apps/backend
yarn prisma migrate dev
yarn prisma db seed
```

### 4. Run the entire stack (Turborepo)
```bash
# From root — starts all packages in parallel
yarn dev
```

**What runs:**
```
@repo/categories#dev ──► Shared category package (watch mode)
@repo/ui#dev         ──► Shared UI components (watch mode)
frontend#dev         ──► Vite dev server (http://localhost:3001)
backend#dev          ──► NestJS dev server (http://localhost:3000)
```

### 5. Run individual apps
```bash
# Frontend only
yarn dev --filter=frontend

# Backend only
yarn dev --filter=backend

# Shared packages only
yarn dev --filter=@repo/ui
```

---

## Build & Deploy

```bash
# Build everything
yarn build

# Build specific app
yarn build --filter=frontend
```

---

## Shared Packages

```
Frontend ───────► @repo/ui ───────► Reusable components
                │
                ▼
Backend ───────► @repo/categories ─► CategoryType enum + helpers
                │
                ▼
                @repo/eslint-config ─► Shared lint rules
```

---

## Documentation

Detailed documentation for each part of the project:

| Docs | What you'll find |
|------|------------------|
| [Frontend README](./apps/frontend/README.md) | React pages, Tailwind styling, animations, blog filter, scroll progress bar |
| [Backend README](./apps/backend/README.md) | NestJS API endpoints, database schema, auth flow, Prisma setup |
| [Categories README](./packages/categories/README.md) | Blog category definitions (`All`, `Software`, `Tech`, `Life`, `Community`) |

---

## License

MIT — feel free to fork, learn, and build your own.

---

**Built by Tiani Pekins | Software Engineer** 🇨🇲
