import { Switch } from "@/components/ui/switch";
import SelectFilter from "./select-filter";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const SORT_OPTIONS = {
  NEWEST: "newest",
  PRICE_HIGH: "highest-price",
  PRICE_LOW: "lowest-price",
} as const;

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

type Filters = {
  category: string;
  brand: string;
  targetAudience: string;
  minPrice: number;
  maxPrice: number;
  onSale: boolean;
  sortBy: SortOption;
};

export default function ProductFilter({
  filters,
  setFilters,
  priceRange,
  existingCategories,
  existingBrands,
  existingTargetAudiences,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  priceRange: { min: number; max: number };
  existingCategories: string[];
  existingBrands: string[];
  existingTargetAudiences: string[];
}) {
  const sortOptions = [
    { value: SORT_OPTIONS.NEWEST, label: "Newest" },
    { value: SORT_OPTIONS.PRICE_HIGH, label: "Highest Price" },
    { value: SORT_OPTIONS.PRICE_LOW, label: "Lowest Price" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SelectFilter
        label="Sort by"
        options={sortOptions.map((opt) => opt.value)}
        value={filters.sortBy}
        onChange={(value) =>
          setFilters({ ...filters, sortBy: value as SortOption })
        }
        optionLabels={Object.fromEntries(
          sortOptions.map((opt) => [opt.value, opt.label]),
        )}
      />
      <SelectFilter
        label="Category"
        options={existingCategories}
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value })}
      />
      <SelectFilter
        label="Brand"
        options={existingBrands}
        value={filters.brand}
        onChange={(value) => setFilters({ ...filters, brand: value })}
      />
      <SelectFilter
        label="Target Audience"
        options={existingTargetAudiences}
        value={filters.targetAudience}
        onChange={(value) => setFilters({ ...filters, targetAudience: value })}
      />

      <div className="space-y-4">
        <div>
          <Label>Price Range</Label>
          <div className="mt-2 grid grid-cols-[1fr,auto,1fr] items-center gap-2">
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFilters({
                  ...filters,
                  minPrice: Math.min(value, filters.maxPrice),
                });
              }}
              min={priceRange.min}
              max={filters.maxPrice}
            />
            <span>-</span>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setFilters({
                  ...filters,
                  maxPrice: Math.max(value, filters.minPrice),
                });
              }}
              min={filters.minPrice}
              max={priceRange.max}
            />
          </div>
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            max={priceRange.max}
            min={priceRange.min}
            step={1}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) =>
              setFilters({
                ...filters,
                minPrice: Math.min(min, max),
                maxPrice: Math.max(min, max),
              })
            }
            className="mt-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.onSale}
            onCheckedChange={(checked) =>
              setFilters({ ...filters, onSale: checked })
            }
          />
          <Label>On Sale</Label>
        </div>
      </div>
    </div>
  );
}
