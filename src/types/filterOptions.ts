// Types for filter options fetched from the backend API
export interface FilterOption {
  id: number;
  name: string;
}

export interface FilterOptions {
  countries: FilterOption[];
  levels: FilterOption[];
  fields_of_study: FilterOption[];
  fund_types: FilterOption[];
  categories: FilterOption[];
}
