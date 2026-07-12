# Portfolio Backend

A **NestJS** REST API serving the portfolio frontend. Handles blog CRUD, project showcases, contact form submissions, JWT authentication, and file uploads.

---

## Module System

```mermaid
flowchart TB
    AppModule["🏠 AppModule<br/>Root Module"] --> Infrastructure
    AppModule --> AuthLayer
    AppModule --> CoreService
    AppModule --> BusinessLogic
    AppModule --> Communication

    subgraph Infrastructure["🏗️ Infrastructure Layer"]
        direction TB
        PrismaMod["🗄️ PrismaModule<br/>Database Connection"]
        ConfigMod["⚙️ ConfigModule<br/>Environment Config"]
    end

    subgraph AuthLayer["🔐 User & Auth Layer"]
        direction TB
        AuthMod["🔑 AuthModule<br/>JWT + Passport"]
        UserMod["👤 UserModule<br/>Admin Management"]
    end

    subgraph CoreService["⚙️ Core Service Layer"]
        direction TB
        BlogMod["📝 BlogModule<br/>Posts & Categories"]
        ProjMod["📁 ProjectModule<br/>Project Showcase"]
        UploadMod["📤 FileUploadModule<br/>Image Upload"]
    end

    subgraph BusinessLogic["💼 Business Logic Layer"]
        direction TB
        ContactMod["📨 ContactModule<br/>Form Submissions"]
        CommentMod["💬 CommentModule<br/>Blog Comments"]
    end

    subgraph Communication["📡 Communication Layer"]
        direction TB
        EmailMod["📧 EmailModule<br/>Notifications"]
    end

    style AppModule fill:#fff3e0
    style Infrastructure fill:#e1f5fe
    style AuthLayer fill:#fce4ec
    style CoreService fill:#e8f5e9
    style BusinessLogic fill:#f3e5f5
    style Communication fill:#fff9c4
    style PrismaMod fill:#bbdefb
    style ConfigMod fill:#bbdefb
    style AuthMod fill:#f8bbd0
    style UserMod fill:#f8bbd0
    style BlogMod fill:#c8e6c9
    style ProjMod fill:#c8e6c9
    style UploadMod fill:#c8e6c9
    style ContactMod fill:#e1bee7
    style CommentMod fill:#e1bee7
    style EmailMod fill:#fff59d
```

## Layered Architecture

```mermaid
flowchart TB
    subgraph Client["🌐 Client"]
        React["⚛️ React SPA"]
    end

    React -->|HTTP/REST| Gateway

    subgraph Gateway["🚪 API Gateway"]
        direction TB
        CORS["🌐 CORS"]
        ValPipe["✅ ValidationPipe"]
        JWT["🔐 JWT AuthGuard"]
    end

    Gateway -->|routes to| Controllers

    subgraph Controllers["🎮 Controllers"]
        direction LR
        BlogCtrl["📝 BlogController"]
        ProjCtrl["📁 ProjectController"]
        AuthCtrl["🔑 AuthController"]
        ContactCtrl["📨 ContactController"]
        CommentCtrl["💬 CommentController"]
        UploadCtrl["📤 FileUploadController"]
    end

    Controllers -->|uses| Services

    subgraph Services["⚙️ Services"]
        direction LR
        BlogSvc["📝 BlogService<br/>CRUD Logic"]
        ProjSvc["📁 ProjectService<br/>CRUD Logic"]
        AuthSvc["🔑 AuthService<br/>JWT + bcrypt"]
        ContactSvc["📨 ContactService<br/>Form Handling"]
        CommentSvc["💬 CommentService<br/>Moderation"]
        UploadSvc["📤 FileUploadService<br/>Storage"]
    end

    Services -->|uses| Prisma

    subgraph Prisma["🗄️ Prisma ORM"]
        direction TB
        Client["📦 Prisma Client"]
    end

    Prisma -->|queries| DB

    subgraph DB["💾 PostgreSQL"]
        direction TB
        Tables["📋 Tables:<br/>users, blog_posts,<br/>projects, comments,<br/>contact_submissions"]
    end

    style Client fill:#e3f2fd
    style Gateway fill:#fff3e0
    style Controllers fill:#e8f5e9
    style Services fill:#fce4ec
    style Prisma fill:#f3e5f5
    style DB fill:#e1f5fe
    style BlogCtrl fill:#c8e6c9
    style ProjCtrl fill:#c8e6c9
    style AuthCtrl fill:#c8e6c9
    style ContactCtrl fill:#c8e6c9
    style CommentCtrl fill:#c8e6c9
    style UploadCtrl fill:#c8e6c9
    style BlogSvc fill:#f8bbd0
    style ProjSvc fill:#f8bbd0
    style AuthSvc fill:#f8bbd0
    style ContactSvc fill:#f8bbd0
    style CommentSvc fill:#f8bbd0
    style UploadSvc fill:#f8bbd0
```

---

## API Endpoints

### 📝 Blog
```
GET    /blog              → 📋 List all posts (paginated, filterable)
GET    /blog?category=X   → 🔍 Filter by category
GET    /blog/:idOrSlug    → 📄 Get single post
POST   /blog              → ✨ Create post (JWT required)
PUT    /blog/:id          → 📝 Update post (JWT required)
DELETE /blog/:id          → 🗑️ Delete post (JWT required)
```

### 📁 Projects
```
GET    /projects          → 📋 List all projects
POST   /projects          → ✨ Create project (JWT required)
PUT    /projects/:id      → 📝 Update project (JWT required)
DELETE /projects/:id      → 🗑️ Delete project (JWT required)
```

### 📨 Contact
```
POST   /contact           → 📤 Submit contact form
GET    /contact           → 📋 List submissions (JWT required)
```

### 🔐 Auth
```
POST   /auth/login        → 🔑 Login, returns JWT
```

### 💬 Comments
```
POST   /comments          → 💬 Create comment (public, needs approval)
```

### 📤 File Upload
```
POST   /upload            → 📎 Upload image/file (JWT required)
```

---

## Data Flow

### Blog Post Creation
```
Client POST /blog
    │
    ▼
┌─────────────────────────────────────────┐
│ AuthGuard (JWT)                         │
│    │                                    │
│    ▼                                    │
│ DTO Validation (class-validator)        │
│    │                                    │
│    ▼                                    │
│ BlogService.create()                    │
│    │                                    │
│    ├─► Check slug uniqueness            │
│    ├─► Build Prisma create input        │
│    └─► prisma.blogPost.create()         │
│         │                               │
│         ▼                               │
│    Return post with author relation     │
└─────────────────────────────────────────┘
```

## API Request Flow

```mermaid
flowchart TD
    A["🌐 Client sends request"] --> B{"❓ Route matches?"}
    B -->|"❌ No"| C["⚠️ 404 Not Found"]
    B -->|"✅ Yes"| D{"🔐 Auth required?"}
    D -->|"✅ Yes"| E{"❓ Valid JWT?"}
    E -->|"❌ No"| F["🚫 401 Unauthorized"]
    E -->|"✅ Yes"| G["👤 Extract user from token"]
    G --> H["🎮 Controller receives request"]
    D -->|"❌ No"| H
    H --> I["✅ Validate DTO"]
    I -->|"❌ Invalid"| J["⚠️ 400 Bad Request"]
    I -->|"✅ Valid"| K["⚙️ Service processes request"]
    K --> L{"🗄️ Database query"}
    L -->|"❌ Error"| M["💥 500 Server Error"]
    L -->|"✅ Success"| N["📦 Return response"]
    N --> O["🌐 Client receives JSON"]

    style A fill:#e3f2fd
    style B fill:#f8bbd0
    style C fill:#ffcdd2
    style D fill:#f8bbd0
    style E fill:#f8bbd0
    style F fill:#ffcdd2
    style G fill:#e8f5e9
    style H fill:#fff3e0
    style I fill:#f8bbd0
    style J fill:#ffcdd2
    style K fill:#e8f5e9
    style L fill:#f8bbd0
    style M fill:#ffcdd2
    style N fill:#c8e6c9
    style O fill:#e3f2fd
```

---

## Database Schema

```
┌─────────────────────┐      ┌─────────────────────┐
│       User          │      │      BlogPost       │
├─────────────────────┤      ├─────────────────────┤
│ id (PK)             │      │ id (PK)             │
│ email               │      │ title               │
│ password (hash)     │      │ slug (unique)       │
│ name                │      │ content             │
│ createdAt           │      │ excerpt             │
│ updatedAt           │      │ externalUrl         │
└─────────────────────┘      │ category (String)   │
        │                    │ tags (String[])     │
        │                    │ featured (Boolean)  │
        │                    │ published (Boolean) │
        │                    │ publishedAt         │
        │                    │ createdAt           │
        │                    │ updatedAt           │
        │                    │ authorId (FK) ──────┼──► User.id
        │                    └─────────────────────┘
        │
        │                    ┌─────────────────────┐
        │                    │      Comment        │
        │                    ├─────────────────────┤
        │                    │ id (PK)             │
        │                    │ authorName          │
        │                    │ content             │
        │                    │ approved (Boolean)  │
        │                    │ createdAt           │
        │                    │ blogPostId (FK) ────┼──► BlogPost.id
        │                    └─────────────────────┘
        │
        └────────────────►┌─────────────────────┐
                          │      Project        │
                          ├─────────────────────┤
                          │ id (PK)             │
                          │ title               │
                          │ slug (unique)       │
                          │ description         │
                          │ technologies (Str[])│
                          │ thumbnail           │
                          │ demoUrl             │
                          │ gitUrl              │
                          │ featured (Boolean)  │
                          │ authorId (FK) ──────┼──► User.id
                          └─────────────────────┘
```

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| ⚡ NestJS | 10 | Framework, DI, modular architecture |
| 🗄️ Prisma | 6 | ORM, type-safe queries, migrations |
| 💾 PostgreSQL | 15+ | Relational database |
| 🔐 JWT | | Stateless auth tokens |
| 🛡️ Passport | | Auth strategies |
| ✅ class-validator | | DTO validation |
| 📖 Swagger | | API documentation |
| 🔒 bcrypt | | Password hashing |

---

## Folder Structure

```
backend/
├── prisma/
│   ├── schema.prisma         ← Database schema
│   └── seed.ts               ← Seed data (admin user, blog posts, projects)
│
├── src/
│   ├── blog/
│   │   ├── blog.controller.ts    ← Route handlers
│   │   ├── blog.service.ts       ← Business logic
│   │   ├── blog.module.ts        ← Module definition
│   │   └── dto/
│   │       └── blog.dto.ts       ← Create/Update/Query DTOs
│   │
│   ├── projects/
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   ├── projects.module.ts
│   │   └── dto/
│   │       └── project.dto.ts
│   │
│   ├── contact/
│   │   ├── contact.controller.ts
│   │   ├── contact.service.ts
│   │   └── dto/
│   │       └── contact.dto.ts
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts
│   │
│   ├── comments/
│   │   ├── comments.controller.ts
│   │   ├── comments.service.ts
│   │   └── dto/
│   │       └── comment.dto.ts
│   │
│   ├── file-upload/
│   │   ├── file-upload.controller.ts
│   │   └── file-upload.service.ts
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── main.ts                   ← Entry point
│   └── app.module.ts             ← Root module
│
├── test/
│   └── app.e2e-spec.ts           ← End-to-end tests
│
├── package.json
└── tsconfig.json
```

---

## Development

```bash
# 📦 Install dependencies (from root or backend dir)
yarn install

# ⚙️ Environment setup
cp .env.example .env
# Edit .env set DATABASE_URL, JWT_SECRET
# (Database URL is private never commit this file)

# 🗄️ Database
yarn prisma migrate dev
yarn prisma db seed

# ▶️ Run dev server (via Turborepo)
yarn dev --filter=backend

# 🧪 Run tests
yarn test --filter=backend
yarn test:e2e --filter=backend
```

---

## Authentication

```
┌─────────────┐
│   Login     │
│  (email,    │
│  password)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Auth      │
│   Service   │
│  • Validate │
│    password │
│    (bcrypt) │
│  • Sign JWT │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   JWT Token │
│   (1 day)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│   Protected Routes          │
│   Authorization: Bearer <jwt>│
│   • POST /blog              │
│   • PUT /blog/:id           │
│   • DELETE /blog/:id        │
│   • POST /projects          │
│   • POST /upload            │
└─────────────────────────────┘
```

---

## Auth Flow

```mermaid
flowchart TD
    A["👤 User sends POST /auth/login"] --> B["🎮 Controller receives email + password"]
    B --> C["🔑 AuthService validates credentials"]
    C --> D{"❓ User exists?"}
    D -->|"❌ No"| E["🚫 401 Unauthorized"]
    D -->|"✅ Yes"| F["🔒 bcrypt compares password hash"]
    F -->|"❌ Mismatch"| E
    F -->|"✅ Match"| G["🔐 Generate JWT token"]
    G --> H["📦 Return token to client"]
    H --> I["💾 Client stores token"]
    I --> J["📡 Subsequent requests include Authorization: Bearer <token>"]
    J --> K["🔍 Passport JWT Strategy validates token"]
    K -->|"✅ Valid"| L["✅ Grant access to protected route"]
    K -->|"❌ Invalid"| M["🚫 401 Unauthorized"]

    style A fill:#e3f2fd
    style B fill:#fff3e0
    style C fill:#e8f5e9
    style D fill:#f8bbd0
    style E fill:#ffcdd2
    style F fill:#e8f5e9
    style G fill:#c8e6c9
    style H fill:#c8e6c9
    style I fill:#e3f2fd
    style J fill:#e3f2fd
    style K fill:#f8bbd0
    style L fill:#a5d6a7
    style M fill:#ffcdd2
```

---

## Blog Categories

🏷️ Valid category values (enforced by DTO):

```mermaid
flowchart LR
    ALL["🏠 ALL<br/>View all posts"] --> SW["💻 SOFTWARE<br/>Engineering<br/>Architecture"]
    SW --> TC["🔧 TECH<br/>Technology<br/>Tools & Trends"]
    TC --> LF["🌱 LIFE<br/>Personal<br/>Career & Culture"]
    LF --> CM["🤝 COMMUNITY<br/>Open Source<br/>Events & Ecosystem"]

    style ALL fill:#e3f2fd
    style SW fill:#e8f5e9
    style TC fill:#fff3e0
    style LF fill:#fce4ec
    style CM fill:#f3e5f5
```

> 💡 Stored as plain `String` in PostgreSQL no migration needed to add new categories.

---

## 📝 Notes for Reviewers

- 🗄️ **Prisma client is generated** inside `src/generated/prisma/` do not edit manually.
- ✅ **DTOs use class-validator** for runtime type checking, not just TypeScript.
- 🎯 **All services return Prisma-select optimized data** no over-fetching.
- 🧪 **E2E tests use the real database** ensure `DATABASE_URL` is set before running.
- 💬 **Comments are moderated** `approved: false` by default, admin can approve.

---

**Maintained by Tiani Pekins | Backend Engineer** 🇨🇲
