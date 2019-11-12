import { useState } from "react";

export default function useFilters<T>(
  defaultFilters: FilterFnCollection<T> = {}
) {
  const [filters, setFilters] = useState<FilterFnCollection<T>>(defaultFilters);

  const updateFilter = (name: string, filter: FilterFn<T>) => {
    setFilters({ ...filters, [name]: filter });
  };

  const removeFilter = (name: string) => {
    if (!(name in filters)) return;

    const newFilters = { ...filters };
    delete newFilters[name];
    setFilters(newFilters);
  };

  const filtersArr = Object.values(filters);
  const applyFilters = (items: T[]) =>
    filtersArr.reduce((acc, filterFn) => acc.filter(filterFn), items);

  return {
    applyFilters,
    updateFilter,
    removeFilter
  };
}

// Types

export type FilterFn<T> = (item: T) => boolean;
type FilterFnCollection<T> = { [key in string]: FilterFn<T> };
