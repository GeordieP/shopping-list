import { Action } from "overmind";

export const safeRemoveTag: Action<string> = ({ actions }, tagId) => {
  actions.items.removeTagFromAll(tagId);
  // actions.tags.remove(tagId);
};

export const safeRemoveList: Action<string> = ({ actions }, listId) => {
  actions.items.removeAllFromList(listId);
  actions.lists.remove(listId);
};
