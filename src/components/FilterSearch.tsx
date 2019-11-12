import React from "react";
import { IonSearchbar } from "@ionic/react";

// Types
import { FilterFn } from "../hooks/useFilters";

const FILTER_KEY = "SEARCH";

const FilterSearch: React.FC<FilterSearchProps> = props => {
  const onSearchInput = (e: any) => {
    if (!e || !e.target) {
      props.removeFilter(FILTER_KEY);
    }

    const search = e.target.value || "";
    props.updateFilter(FILTER_KEY, (item: Item) => item.name.includes(search));
  };

  return <IonSearchbar onInput={onSearchInput} showCancelButton="never" />;
};

export default FilterSearch;

// Types
interface FilterSearchProps {
  removeFilter: (name: string) => void;
  updateFilter: (name: string, filterFn: FilterFn<any>) => void;
}
