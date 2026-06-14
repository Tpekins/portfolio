/**
 * Portfolio Categories
 * Shared category definitions used across frontend and backend applications
 */

export const CategoryType = {
  ALL: "All",
  TECH: "Tech",
  SOFTWARE: "Software",
  LIFE: "Life",
  COMMUNITY: "Community",
} as const;
export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

// Helper functions
export const isValidCategory = (value: unknown): value is CategoryType => {
  return typeof value === "string" && Object.values(CategoryType).includes(value as CategoryType);
};

export const getCategoryLabel = (category: keyof typeof CategoryType): string => {
  return CategoryType[category];
};
