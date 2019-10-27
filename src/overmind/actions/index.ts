import { Action } from "overmind";

export const addItem: Action<Item> = ({ state }, item) => {
  state.items[item.id] = item;
};

export const removeItem: Action<ID> = ({ state }, itemId) => {
  delete state.items[itemId];
};

export const updateItem: Action<{ itemId: ID; newFields: Partial<Item> }> = (
  { state },
  { itemId, newFields }
) => {
  state.items[itemId] = { ...state.items[itemId], ...newFields };
};

export const completeItem: Action<ID> = ({ state }, itemId) => {
  state.items[itemId].complete = true;
};

export const uncompleteItem: Action<ID> = ({ state }, itemId) => {
  state.items[itemId].complete = false;
};

export const listifyItem: Action<ID> = ({ state }, itemId) => {
  state.items[itemId].listed = true;
};

export const unlistifyItem: Action<ID> = ({ state }, itemId) => {
  state.items[itemId].listed = false;
};

export const addTag: Action<{ itemId: ID; tagId: ID }> = (
  { state },
  { itemId, tagId }
) => {
  state.items[itemId].tags.push(tagId);
};

export const removeTagFromItem: Action<{ itemId: ID; tagId: ID }> = (
  { state },
  { itemId, tagId }
) => {
  const index = state.items[itemId].tags.indexOf(tagId);
  if (index < 0) return;
  state.items[itemId].tags.splice(index, 1);
};

export const removeTagFromAllItems: Action<ID> = (
  { state, actions },
  tagId
) => {
  Object.values(state.items).forEach(item =>
    actions.removeTagFromItem({ itemId: item.id, tagId })
  );
};
