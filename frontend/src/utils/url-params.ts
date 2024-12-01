import { type Filters, defaultFilters } from "./product-filters";

export function getFiltersFromSearchParams(searchParams: URLSearchParams): {
  filters: Filters;
  searchQuery: string;
} {
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const targetAudience = searchParams.get("targetAudience");
  const sortBy = searchParams.get("sortBy");
  const onSale = searchParams.get("onSale");
  const brand = searchParams.get("brand");
  const reset = searchParams.get("reset");

  if (reset === "true") {
    return {
      filters: {
        ...defaultFilters,
        ...(category && { category }),
      },
      searchQuery: search,
    };
  }

  const filters: Filters = {
    ...defaultFilters,
    ...(category && { category }),
    ...(targetAudience && { targetAudience }),
    ...(sortBy && { sortBy: sortBy as Filters["sortBy"] }),
    ...(onSale && { onSale: onSale === "true" }),
    ...(brand && { brand }),
  };

  return { filters, searchQuery: search };
}
