# Tiani Pekins Portfolio

A modern, full-stack portfolio platform built for showcasing engineering projects, technical blog posts, and professional contact. Designed for speed, clarity, and mobile-first browsing.

---

## Architecture Overview

```mermaid
flowchart TB
    subgraph Client["🖥️ Client Layer"]
        direction LR
        H["🏠 Home"] --> P["📁 Projects"]
        P --> A["👤 About"]
        A --> B["📝 Blog"]
        B --> BP["📄 BlogPost"]
        BP --> C["📨 Contact"]
    end

    Client -->|HTTP/REST API| API

    subgraph API["⚡ API Gateway — NestJS"]
        direction TB
        BLOG["📝 /blog<br/>CRUD + Filter"]
        PROJ["📁 /projects<br/>CRUD"]
        AUTH["🔐 /auth<br/>JWT Login"]
        CONT["📨 /contact<br/>Submit"]
        UP["📤 /upload<br/>File"]
        COM["💬 /comments<br/>Create"]
    end

    API -->|Prisma ORM| DB

    subgraph DB["🗄️ Database — PostgreSQL"]
        direction LR
        U["👤 users"]
        BP2["📝 blog_posts"]
        PR["📁 projects"]
        CM["💬 comments"]
        CS["📨 contact_submissions"]
    end

    style Client fill:#e1f5fe
    style API fill:#fff3e0
    style DB fill:#e8f5e9
    style H fill:#bbdefb
    style P fill:#bbdefb
    style A fill:#bbdefb
    style B fill:#bbdefb
    style BP fill:#bbdefb
    style C fill:#bbdefb
    style BLOG fill:#ffe0b2
    style PROJ fill:#ffe0b2
    style AUTH fill:#ffe0b2
    style CONT fill:#ffe0b2
    style UP fill:#ffe0b2
    style COM fill:#ffe0b2
    style U fill:#c8e6c9
    style BP2 fill:#c8e6c9
    style PR fill:#c8e6c9
    style CM fill:#c8e6c9
    style CS fill:#c8e6c9
```

### Monorepo Package Dependencies

```mermaid
flowchart TB
    subgraph Root["📦 Root Workspace"]
        direction TB
        T["⚡ turbo.json<br/>Task Orchestration"]
    end

    subgraph Apps["📱 Apps"]
        direction LR
        FE["🖥️ frontend<br/>React + Vite"]
        BE["⚡ backend<br/>NestJS"]
    end

    subgraph Packages["📦 Shared Packages"]
        direction TB
        UI["🎨 @repo/ui<br/>Components"]
        CAT["🏷️ @repo/categories<br/>Blog Categories"]
        ESL["📏 @repo/eslint-config<br/>Lint Rules"]
    end

    Root --> Apps
    Root --> Packages
    FE -->|uses| UI
    FE -->|uses| CAT
    BE -->|uses| CAT
    BE -->|uses| ESL
    FE -->|uses| ESL
    UI -->|uses| ESL

    style Root fill:#e3f2fd
    style FE fill:#e8f5e9
    style BE fill:#fff3e0
    style UI fill:#f3e5f5
    style CAT fill:#fce4ec
    style ESL fill:#fff9c4
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
| ⚛️ **Frontend** | React 19 + Vite | UI rendering & SPA routing |
| 🎨 **Styling** | Tailwind CSS v4 | Utility-first CSS with custom tokens |
| ✨ **Animations** | Framer Motion (`motion/react`) | Scroll-linked animations, transitions |
| ⚡ **Backend** | NestJS | Modular REST API architecture |
| 🗄️ **Database** | PostgreSQL + Prisma | Relational data with type-safe queries |
| 🔐 **Auth** | JWT + Passport | Stateless token-based admin authentication |
| 🚀 **Monorepo** | Turborepo | Shared packages, unified build pipeline |

---

## Project Structure

```mermaid
flowchart TB
    subgraph Root["📁 portfolio/"]
        direction TB
        Turbo["⚡ turbo.json<br/>Task Orchestration"]
        Pkg["📦 package.json<br/>Workspace Config"]
    end

    subgraph AppsDir["📁 apps/"]
        direction LR
        FE["🖥️ frontend/<br/>React SPA<br/>6 pages"]
        BE["⚡ backend/<br/>NestJS API<br/>REST endpoints"]
    end

    subgraph PkgDir["📁 packages/"]
        direction TB
        UI["🎨 ui/<br/>Shared Components<br/>Navbar, Footer, Card, Button"]
        CAT["🏷️ categories/<br/>Blog Categories<br/>All, Software, Tech, Life, Community"]
        ESL["📏 eslint-config/<br/>Shared Lint Rules"]
    end

    Root --> AppsDir
    Root --> PkgDir

    style Root fill:#e3f2fd
    style AppsDir fill:#e8f5e9
    style PkgDir fill:#fff3e0
    style FE fill:#bbdefb
    style BE fill:#ffe0b2
    style UI fill:#f3e5f5
    style CAT fill:#fce4ec
    style ESL fill:#fff9c4
```

---

## Quick Start

### Prerequisites
- 📦 Node.js 20+
- 🗄️ PostgreSQL database

### 1️⃣ Install dependencies
```bash
yarn install
```

### 2️⃣ Environment setup
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit .env and set DATABASE_URL
```

### 3️⃣ Database setup
```bash
cd apps/backend
yarn prisma migrate dev
yarn prisma db seed
```

### 4️⃣ Run the entire stack (Turborepo)
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

### 5️⃣ Run individual apps
```bash
# 🖥️ Frontend only
yarn dev --filter=frontend

# ⚡ Backend only
yarn dev --filter=backend

# 📦 Shared packages only
yarn dev --filter=@repo/ui
```

---

## Build & Deploy

```bash
# 🔨 Build everything
yarn build

# 🖥️ Build specific app
yarn build --filter=frontend

# ⚡ Build backend only
yarn build --filter=backend
```

---

## Shared Packages

```mermaid
flowchart LR
    subgraph FE["🖥️ Frontend"]
        direction TB
        F1["⚛️ React Components"]
        F2["🏷️ Category Filters"]
        F3["📏 ESLint Rules"]
    end

    subgraph Packages["📦 Shared Packages"]
        direction TB
        UI["🎨 @repo/ui<br/>Button, Card, Navbar,<br/>Footer, Code"]
        CAT["🏷️ @repo/categories<br/>CategoryType enum,<br/>isValidCategory()"]
        ESL["📏 @repo/eslint-config<br/>React + TypeScript<br/>Lint Rules"]
    end

    subgraph BE["⚡ Backend"]
        direction TB
        B1["📝 Blog DTOs"]
        B2["🏷️ Category Validation"]
        B3["📏 ESLint Rules"]
    end

    FE -->|imports| Packages
    BE -->|imports| Packages
    F1 --> UI
    F2 --> CAT
    F3 --> ESL
    B1 --> CAT
    B2 --> CAT
    B3 --> ESL

    style FE fill:#e8f5e9
    style BE fill:#fff3e0
    style Packages fill:#e3f2fd
    style UI fill:#f3e5f5
    style CAT fill:#fce4ec
    style ESL fill:#fff9c4
```

---

## Documentation

📚 Detailed documentation for each part of the project:

| 📖 Docs | 🔍 What you'll find |
|---------|---------------------|
| [🖥️ Frontend README](./apps/frontend/README.md) | React pages, Tailwind styling, animations, blog filter, scroll progress bar |
| [⚡ Backend README](./apps/backend/README.md) | NestJS API endpoints, database schema, auth flow, Prisma setup |
| [🏷️ Categories README](./packages/categories/README.md) | Blog category definitions (`All`, `Software`, `Tech`, `Life`, `Community`) |

---

## License

MIT — feel free to fork, learn, and build your own.

---

**Built by Tiani Pekins | Software Engineer** 🇨🇲
