# Portfolio Frontend

The **React 19** single-page application powering the public portfolio. Designed for smooth navigation, scroll-linked animations, and a reading-first blog experience.

---

## Application Architecture

```mermaid
flowchart TB
    subgraph Browser["🌐 User Browser"]
        direction TB
        URL["🔀 URL Change"]
    end

    URL --> Router

    subgraph Vite["⚡ Vite Dev Server"]
        direction TB
        Router["🗺️ React Router"]
    end

    Router -->|matches| Pages

    subgraph Pages["📄 Pages"]
        direction LR
        H["🏠 Home<br/>/"] --> P["📁 Projects<br/>/projects"]
        P --> A["👤 About<br/>/about"]
        A --> B["📝 Blog<br/>/blog"]
        B --> BP["📄 BlogPost<br/>/blog/:id"]
        BP --> C["📨 Contact<br/>/contact"]
    end

    Pages -->|wrapped by| Layout

    subgraph Layout["🎨 Layout"]
        direction TB
        N["📌 Navbar"] --> PageContent["📄 Page Content"]
        PageContent --> F["📌 Footer"]
    end

    Layout -->|calls| API

    subgraph API["🔌 API Service Layer"]
        direction TB
        S["📁 src/services/api.ts"]
        S --> getBlog["📝 getBlogPosts()"]
        S --> getProj["📁 getProjects()"]
        S --> getPost["📄 getBlogPost(id)"]
        S --> submit["📨 submitContact()"]
    end

    API -->|HTTP fetch| Backend

    subgraph Backend["⚡ Backend API"]
        direction TB
        BE["NestJS API<br/>env: VITE_API_URL"]
    end

    style Browser fill:#e3f2fd
    style Vite fill:#fff3e0
    style Pages fill:#e8f5e9
    style Layout fill:#f3e5f5
    style API fill:#e1f5fe
    style Backend fill:#fff9c4
    style H fill:#bbdefb
    style P fill:#bbdefb
    style A fill:#bbdefb
    style B fill:#bbdefb
    style BP fill:#bbdefb
    style C fill:#bbdefb
    style N fill:#f8bbd0
    style F fill:#f8bbd0
    style getBlog fill:#ffe0b2
    style getProj fill:#ffe0b2
    style getPost fill:#ffe0b2
    style submit fill:#ffe0b2
```

## Component Hierarchy

```mermaid
flowchart TB
    subgraph App["🚀 App.tsx"]
        direction TB
        R["🗺️ React Router"]
    end

    R -->|wraps| Layout

    subgraph LayoutComp["🎨 Layout.tsx"]
        direction TB
        N["📌 Navbar"] --> OC["📂 Outlet<br/>Page Content"]
        OC --> F["📌 Footer"]
    end

    OC -->|renders| Pages

    subgraph PageComponents["📄 Pages"]
        direction LR
        H["🏠 Home.tsx"] --> P["📁 Projects.tsx"]
        P --> A["👤 About.tsx"]
        A --> B["📝 Blog.tsx"]
        B --> BP["📄 BlogPost.tsx"]
        BP --> C["📨 Contact.tsx"]
    end

    B -->|uses| BlogFilter
    B -->|uses| SearchBar
    B -->|uses| ProgressBar

    subgraph BlogFeatures["🎯 Blog Features"]
        direction TB
        BlogFilter["🏷️ CategoryFilter<br/>All | Software | Tech | Life | Community"]
        SearchBar["🔍 SearchBar<br/>title + excerpt"]
        ProgressBar["📊 ScrollProgressBar<br/>hover + scroll"]
    end

    style App fill:#e3f2fd
    style LayoutComp fill:#f3e5f5
    style PageComponents fill:#e8f5e9
    style BlogFeatures fill:#fff3e0
    style N fill:#f8bbd0
    style F fill:#f8bbd0
    style H fill:#bbdefb
    style P fill:#bbdefb
    style A fill:#bbdefb
    style B fill:#bbdefb
    style BP fill:#bbdefb
    style C fill:#bbdefb
    style BlogFilter fill:#ffe0b2
    style SearchBar fill:#ffe0b2
    style ProgressBar fill:#ffe0b2
```

---

## Pages

| Route | Page | Key Features |
|-------|------|--------------|
| `/` | 🏠 **Home** | Hero intro, featured projects, latest blog posts, GSAP scroll animations |
| `/projects` | 📁 **Projects** | Grid of all projects with tech stack tags |
| `/about` | 👤 **About** | Bio, skills, experience timeline |
| `/blog` | 📝 **Blog** | Category filter (All → Software → Tech → Life → Community), search bar, vertical scroll progress indicator |
| `/blog/:id` | 📄 **BlogPost** | Full article, comments section, like counter |
| `/contact` | 📨 **Contact** | Contact form with validation |

---

## 🎯 Key Features

### 🏷️ Blog Category Filter

```mermaid
flowchart LR
    ALL["🏠 ALL"] --> SW["💻 SOFTWARE"]
    SW --> TC["🔧 TECH"]
    TC --> LF["🌱 LIFE"]
    LF --> CM["🤝 COMMUNITY"]

    ALL -.->|🔍 Search| S["🔎 Search bar<br/>title + excerpt"]

    style ALL fill:#2e7d32,color:#fff
    style SW fill:#fff,stroke:#666
    style TC fill:#fff,stroke:#666
    style LF fill:#fff,stroke:#666
    style CM fill:#fff,stroke:#666
    style S fill:#e3f2fd
```

- 🟢 **Active category**: Green pill (`bg-primary` = `#2e7d32`)
- ⚪ **Inactive category**: White outline pill

### 📊 Scroll Progress Indicator

```
📝 Blog Page (hover + scroll triggers)
┌─────────────────────────────────────────┐
│                                         │
│  ┌──┐                                   │
│  │🟢│ ← Green bar (grows with scroll)   │
│  │  │                                   │
│  │  │  ┌──────────────────────────┐    │
│  │  │  │ 📄 Post 1                │    │
│  │  │  │ 📄 Post 2                │    │
│  │  │  │ 📄 Post 3                │    │
│  │  │  │ 📄 Post 4                │    │
│  │  │  │ 📄 ...                   │    │
│  └──┘  └──────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

- 👁️ **Visible only when**: `hovering` AND `scrolling`
- 📏 **Height**: 960px fixed bar
- 📋 **List height**: 1400px (shows ~4 posts at a time)

## Blog Filter Flow

```mermaid
flowchart TD
    A["👤 User opens /blog"] --> B["🌐 Fetch all posts from API"]
    B --> C["🏷️ Extract unique categories"]
    C --> D["🎨 Render filter buttons"]
    D --> E["👆 User clicks category"]
    E --> F{"❓ Active category?"}
    F -->|"🏠 ALL"| G["📋 Show all posts"]
    F -->|"📁 Other"| H["🔍 Filter posts by category"]
    G --> I["⌨️ User types in search"]
    H --> I
    I --> J{"❓ Search term?"}
    J -->|"✅ Yes"| K["🔎 Filter by title + excerpt"]
    J -->|"❌ No"| L["📋 Keep current list"]
    K --> M["📊 Render filtered posts"]
    L --> M
    M --> N["🖱️ User scrolls list"]
    N --> O{"❓ Hovering AND scrolling?"}
    O -->|"✅ Yes"| P["📊 Show green progress bar"]
    O -->|"❌ No"| Q["👁️ Hide progress bar"]

    style A fill:#e3f2fd
    style B fill:#e8f5e9
    style C fill:#e8f5e9
    style D fill:#fff3e0
    style E fill:#e3f2fd
    style F fill:#f8bbd0
    style G fill:#c8e6c9
    style H fill:#c8e6c9
    style I fill:#e3f2fd
    style J fill:#f8bbd0
    style K fill:#ffe0b2
    style L fill:#ffe0b2
    style M fill:#c8e6c9
    style N fill:#e3f2fd
    style O fill:#f8bbd0
    style P fill:#a5d6a7
    style Q fill:#ffcdd2
```

---

## Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| ⚛️ React | 19 | UI framework |
| ⚡ Vite | 6 | Build tool + dev server |
| 🗺️ React Router | 7 | Client-side routing |
| 🎨 Tailwind CSS | 4 | Utility-first styling |
| ✨ Framer Motion | `motion/react` | Animations, scroll-linked effects |
| 🔣 Lucide React | — | Icon library |
| 🌐 Native fetch | — | API calls |

---

## 🎨 Styling System

### Custom Design Tokens (`src/index.css`)

| 🎯 Token | 🎨 Value | 💡 Usage |
|----------|----------|----------|
| `--color-primary` | `#2e7d32` 🟢 | Green — buttons, active states, links |
| `--color-primary-light` | `#f1f8f1` 🟩 | Light green background |
| `--color-bg-primary` | `#ffffff` ⬜ | White — main background |
| `--color-bg-secondary` | `#fafafa` ⬜ | Off-white — secondary bg |
| `--color-text-primary` | `#000000` ⬛ | Black — headings |
| `--color-text-secondary` | `#666666` 🔘 | Gray — body text |
| `--color-card` | `#ffffff` ⬜ | Card background |
| `--color-border-subtle` | `#eeeeee` 🔘 | Light borders |

### 🔤 Typography
- 🖋️ **Display**: Poppins (headings, hero text)
- 📝 **Body**: Inter (paragraphs, UI text)
- ✍️ **Script**: Cedarville Cursive (accents)

---

## Folder Structure

```
frontend/
├── public/                 ← Static assets
├── src/
│   ├── pages/
│   │   ├── Home.tsx          ← Landing page with GSAP
│   │   ├── Blog.tsx          ← Category filter + post list
│   │   ├── BlogPost.tsx      ← Single article + comments
│   │   ├── Projects.tsx      ← Project grid
│   │   ├── About.tsx         ← Bio page
│   │   └── Contact.tsx       ← Contact form
│   │
│   ├── components/
│   │   └── Layout.tsx        ← Navbar + Footer wrapper
│   │
│   ├── services/
│   │   └── api.ts            ← API client functions
│   │
│   ├── App.tsx               ← Router setup
│   ├── main.tsx              ← Entry point
│   └── index.css             ← Tailwind tokens + custom classes
│
├── index.html
├── vite.config.ts
└── package.json
```

---

## Development

```bash
# ▶️ Start dev server (via Turborepo)
yarn dev --filter=frontend

# 🔨 Build for production
yarn build --filter=frontend

# 👁️ Preview production build
yarn preview --filter=frontend
```

---

## 🌐 API Integration

```mermaid
flowchart TB
    subgraph FE["🖥️ Frontend"]
        direction TB
        Vite["⚡ Vite Dev Server"]
        Env["🔧 .env"]
    end

    subgraph API["🔌 API Calls"]
        direction TB
        G1["📥 GET /blog?page=1&limit=10"]
        G2["📥 GET /blog/:slug"]
        G3["📥 GET /projects"]
        P1["📤 POST /contact"]
        P2["📤 POST /auth/login"]
    end

    subgraph BE["⚡ Backend"]
        direction TB
        Nest["🚀 NestJS API"]
    end

    FE -->|fetch()| API
    API -->|HTTP| BE
    Env -->|VITE_API_URL| FE

    style FE fill:#e8f5e9
    style API fill:#e1f5fe
    style BE fill:#fff3e0
    style Vite fill:#c8e6c9
    style Env fill:#fff9c4
    style Nest fill:#ffe0b2
    style G1 fill:#bbdefb
    style G2 fill:#bbdefb
    style G3 fill:#bbdefb
    style P1 fill:#f8bbd0
    style P2 fill:#f8bbd0
```

**🔧 Environment variable (in `.env`):**
```
# 🖥️ Development
VITE_API_URL=http://localhost:3000

# 🚀 Production (private — set in deployment platform)
# VITE_API_URL=https://your-backend-url.com
```

---

## 📝 Notes for Reviewers

- 🧠 **No global state library**: React `useState` + `useEffect` are sufficient for this scale.
- 🎨 **No CSS-in-JS**: Tailwind + custom CSS classes keep it fast and cache-friendly.
- 🌐 **API calls use native `fetch`**: Lightweight, no extra bundle size.
- ✨ **Animations are GPU-optimized**: `transform` and `opacity` only, no layout thrashing.

---

**Maintained by Tiani Pekins | Frontend Engineer** 🇨🇲
