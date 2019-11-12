import React from "react";
import { IonChip } from "@ionic/react";
import { json } from "overmind";

import arrayContainsArray from "app/util/arrayContainsArray";

// Types
import { FilterFn } from "../hooks/useFilters";

const FILTER_KEY = "TAG_SELECT";

const FilterTags: React.FC<FilterTagsProps> = props => {
  const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>([]);

  const onTagClick = (tagId: string, toggled: boolean) => {
    const newTags = [...selectedTagIds];

    if (toggled) {
      newTags.push(tagId);
    } else {
      newTags.splice(newTags.indexOf(tagId), 1);
    }

    if (newTags.length === 0) {
      props.removeFilter(FILTER_KEY);
    } else {
      props.updateFilter(FILTER_KEY, (item: Item) =>
        arrayContainsArray(json(item.tagIds), newTags)
      );
    }

    setSelectedTagIds(newTags);
  };

  const list = props.tags.map((tag: Tag) => {
    const selected = selectedTagIds.includes(tag.id);
    const onClick = () => onTagClick(tag.id, !selected);

    return (
      <IonChip key={tag.id} onClick={onClick} outline={selected}>
        {tag.name}
      </IonChip>
    );
  });

  return <>{list}</>;
};

export default FilterTags;

// Types
interface FilterTagsProps {
  tags: Tag[];
  removeFilter: (name: string) => void;
  updateFilter: (name: string, filterFn: FilterFn<any>) => void;
}
