import React from "react";

// Hooks
import useFilters from "../../hooks/useFilters";

// Components
import ListItem from "./ListItem";
import { CompletableItem } from "./";

// filter states - static filter objects/functions to use with filter state hook.
// store these in module scope rather than re-creating them on every render.
//
// Pending: only show items that have their completed property set false
const pendingFilter = {
  completed: (item: CompletableItem) => item.complete === false
};
// Completed: only show items that have their completed property set true
const completedFilter = { completed: (item: CompletableItem) => item.complete };

const ItemsList: React.FC<ItemsListProps> = props => {
  const list = props.items.map(item => {
    const toggleComplete = () => props.setItemComplete(item.id, !item.complete);
    const removeFromList = () => props.removeItemFromList(item.id);

    return (
      <ListItem
        key={item.id}
        toggleComplete={toggleComplete}
        removeFromList={removeFromList}
        {...item}
      />
    );
  });

  return <>{list}</>;
};

export default ItemsList;

export const CompletedItemsList: React.FC<ItemsListProps> = ({
  items,
  ...props
}) => {
  const { applyFilters } = useFilters(completedFilter);
  const filteredItems = applyFilters(items);

  return <ItemsList items={filteredItems} {...props} />;
};

export const PendingItemsList: React.FC<ItemsListProps> = ({
  items,
  ...props
}) => {
  const { applyFilters } = useFilters(pendingFilter);
  const filteredItems = applyFilters(items);

  return <ItemsList items={filteredItems} {...props} />;
};

// Types

interface ItemsListProps {
  items: CompletableItem[];
  setItemComplete: (itemId: string, complete: boolean) => void;
  removeItemFromList: (itemId: string) => void;
}
