import { Product } from "@/types/product";

export type SortOption = "newest" | "highest-price" | "lowest-price";

export type Filters = {
  category: string;
  brand: string;
  targetAudience: string;
  minPrice: number;
  maxPrice: number;
  onSale: boolean;
  sortBy: SortOption;
};

export const defaultFilters: Filters = {
  category: "",
  brand: "",
  targetAudience: "",
  minPrice: 0,
  maxPrice: 1000,
  onSale: false,
  sortBy: "newest",
};

export function filterProducts(
  products: Product[],
  filters: Filters,
  searchQuery: string,
) {
  return products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesAudience =
        !filters.targetAudience ||
        product.target_audience === filters.targetAudience;
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesSale =
        !filters.onSale || (filters.onSale && (product.discount ?? 0) > 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesAudience &&
        matchesPrice &&
        matchesSale
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "highest-price":
          return b.price - a.price;
        case "lowest-price":
          return a.price - b.price;
        case "newest":
        default:
          return new Date(b._id).getTime() - new Date(a._id).getTime();
      }
    });
}

export function getUniqueValues<T extends Product, K extends keyof T>(
  products: T[],
  key: K,
): T[K][] {
  return Array.from(new Set(products.map((p) => p[key])));
}

export function calculatePriceRange(products: Product[]) {
  if (!products.length) return { min: 0, max: 1000 };

  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}
