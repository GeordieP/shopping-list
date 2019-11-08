import { Action } from "overmind";

export const safeRemoveTag: Action<string> = ({ actions }, tagId) => {
  actions.tags.remove(tagId);
  actions.items.removeTagFromAll(tagId);
};

export const safeRemoveList: Action<string> = ({ actions }, listId) => {
  actions.lists.remove(listId);
  actions.items.removeAllFromList(listId);
};
