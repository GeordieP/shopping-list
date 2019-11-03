import { Action } from "overmind";

export const safeRemoveTag: Action<string> = ({ actions }, tagId) => {
  actions.tags.remove(tagId);
  actions.items.removeTagFromAll(tagId);
};

export const safeRemoveItem: Action<string> = ({ actions }, itemId) => {
  actions.items.remove(itemId);
  actions.lists.removeEntryFromAll(itemId);
};
