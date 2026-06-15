# @repo/categories

Shared category definitions for the portfolio blog. Used across **frontend** and **backend** to ensure consistency.

---

## Category System

```mermaid
flowchart LR
    subgraph Categories["🏷️ Blog Categories"]
        direction LR
        ALL["🏠 ALL<br/>Default filter<br/>Shows all posts"] --> SW["💻 SOFTWARE<br/>Engineering<br/>Architecture"]
        SW --> TC["🔧 TECH<br/>Technology<br/>Tools & Trends"]
        TC --> LF["🌱 LIFE<br/>Personal<br/>Career & Culture"]
        LF --> CM["🤝 COMMUNITY<br/>Open Source<br/>Events & Ecosystem"]
    end

    style ALL fill:#e3f2fd
    style SW fill:#e8f5e9
    style TC fill:#fff3e0
    style LF fill:#fce4ec
    style CM fill:#f3e5f5
```

### Category Filter States

```mermaid
flowchart TD
    subgraph Filter["🔘 Filter Button States"]
        direction TB
        Active["✅ Active Category<br/>🟢 Green Pill<br/>bg-primary = #2e7d32<br/>text-white"]
        Inactive["⚪ Inactive Category<br/>⚪ White Outline<br/>border-border-subtle<br/>hover:text-primary"]
    end

    style Active fill:#c8e6c9
    style Inactive fill:#ffffff
```

---

## 💻 Usage

### ⚛️ Frontend (React)
```tsx
import { CategoryType, isValidCategory } from "@repo/categories";

// 🎨 Static list for filter buttons
const categories = ["All", "Software", "Tech", "Life", "Community"];

// ✅ Validate API response
const cat = apiResponse.category;
if (isValidCategory(cat)) {
  setActiveCategory(cat);
}
```

### ⚡ Backend (NestJS)
```ts
import { CategoryType } from "@repo/categories";

// 📝 In DTO
@IsEnum(CategoryType)
category!: CategoryType;

// 🗄️ In service
if (query.category) {
  where.category = query.category;
}
```

---

## Exports

| Export | Type | Description |
|--------|------|-------------|
| 🏷️ `CategoryType` | `const` / `type` | Enum object and TypeScript type |
| ✅ `isValidCategory` | `function` | Type guard: checks if value is a valid category |
| 📝 `getCategoryLabel` | `function` | Maps enum key to display string |

## Category Validation Flow

```mermaid
flowchart TD
    A["👆 User clicks category"] --> B["⚛️ Set activeCategory state"]
    B --> C["🌐 Call getBlogPosts with category"]
    C --> D["⚡ Backend receives category parameter"]
    D --> E{"❓ isValidCategory?"}
    E -->|"❌ No"| F["🚫 Ignore filter, return all posts"]
    E -->|"✅ Yes"| G["🗄️ Apply Prisma where clause"]
    G --> H["💾 Query database"]
    H --> I["📦 Return filtered posts"]
    I --> J["🎨 Frontend renders filtered list"]

    style A fill:#e3f2fd
    style B fill:#e8f5e9
    style C fill:#e3f2fd
    style D fill:#fff3e0
    style E fill:#f8bbd0
    style F fill:#ffcdd2
    style G fill:#e8f5e9
    style H fill:#c8e6c9
    style I fill:#c8e6c9
    style J fill:#e1bee7
```

---

## Category Change History

```
Previous: All, Software, Tech, Life, Programming
Current:  All, Software, Tech, Life, Community
                              │
                              ▼
                    "Programming" replaced by "Community"
```

> **Note**: The database stores `category` as a plain `String`, so no migration is required when updating the enum. Only posts with the old category value (`"Programming"`) will no longer have a dedicated filter button — they will still appear under the **"All"** filter.

---

**Maintained by Tiani Pekins** 🇨🇲
