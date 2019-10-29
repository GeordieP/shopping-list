import { Action } from "overmind";

export const add: Action<Tag> = ({ state }, tag) => {
  state.tags.tags[tag.id] = tag;
};

export const remove: Action<string> = ({ state }, tagId) => {
  delete state.tags.tags[tagId];
};

export const updateTag: Action<{ tagId: string; newFields: Partial<Tag> }> = (
  { state },
  { tagId, newFields }
) => {
  state.tags.tags[tagId] = { ...state.tags.tags[tagId], ...newFields };
};

export const addItem: Action<{ tagId: string; itemId: string }> = (
  { state },
  { tagId, itemId }
) => {
  state.tags.tags[tagId].items.push(itemId);
};

export const removeItem: Action<{ tagId: string; itemId: string }> = (
  { state },
  { tagId, itemId }
) => {
  const index = state.tags.tags[tagId].items.indexOf(tagId);
  if (index < 0) return;
  state.tags.tags[tagId].items.splice(index, 1);
};

export const removeItemFromAll: Action<string> = (
  { state, actions },
  itemId
) => {
  state.tags.tagsList.forEach(tag =>
    actions.tags.removeItem({ tagId: tag.id, itemId })
  );
};
