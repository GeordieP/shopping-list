import { Action } from "overmind";

export const add: Action<Item> = ({ state }, item) => {
  state.items.items[item.id] = item;
};

export const remove: Action<string> = ({ state }, itemId) => {
  delete state.items.items[itemId];
};

export const updateItem: Action<{
  itemId: string;
  newFields: Partial<Item>;
}> = ({ state }, { itemId, newFields }) => {
  state.items.items[itemId] = { ...state.items.items[itemId], ...newFields };
};

export const complete: Action<string> = ({ state }, itemId) => {
  state.items.items[itemId].complete = true;
};

export const uncomplete: Action<string> = ({ state }, itemId) => {
  state.items.items[itemId].complete = false;
};

export const listify: Action<string> = ({ state }, itemId) => {
  state.items.items[itemId].listed = true;
};

export const unlistify: Action<string> = ({ state }, itemId) => {
  state.items.items[itemId].listed = false;
};

export const addTag: Action<{ itemId: string; tagId: string }> = (
  { state },
  { itemId, tagId }
) => {
  state.items.items[itemId].tags.push(tagId);
};

export const removeTag: Action<{ itemId: string; tagId: string }> = (
  { state },
  { itemId, tagId }
) => {
  const index = state.items.items[itemId].tags.indexOf(tagId);
  if (index < 0) return;
  state.items.items[itemId].tags.splice(index, 1);
};

export const removeTagFromAll: Action<string> = ({ state, actions }, tagId) => {
  state.items.itemsList.forEach(item => {
    actions.items.removeTag({ itemId: item.id, tagId });
  });
};
