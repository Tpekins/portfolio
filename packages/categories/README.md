# @repo/categories

Shared category definitions for portfolio projects.

## Usage

### Frontend (React)
```tsx
import { BLOG_CATEGORIES, CategoryType } from "@repo/categories";

const categories = BLOG_CATEGORIES;
```

### Backend (NestJS)
```ts
import { BLOG_CATEGORIES, CategoryType } from "@repo/categories";

@Query(() => [String])
getCategories() {
  return BLOG_CATEGORIES;
}
```

## Exports

- `BLOG_CATEGORIES` - Array of all available blog categories
- `CATEGORY_LABELS` - Mapping of categories to display labels
- `CategoryType` - TypeScript type for category values
- `isValidCategory()` - Type guard function
- `getCategoryLabel()` - Helper to get display label for a category
