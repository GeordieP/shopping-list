import { Action } from "overmind";

export const setAll: Action<{ [key in string]: Item }> = ({ state }, items) => {
  state.items.items = items;
};

export const add: Action<Item> = ({ state }, item) => {
  if (state.items.items[item.id] != null) {
    throw new Error(
      `Could not add item: Item with id >${item.id}< already exists`
    );
  }

  state.items.items[item.id] = item;
};

export const remove: Action<string> = ({ state }, itemId) => {
  if (state.items.items[itemId] == null) {
    throw new Error(
      `Could not remove item: Item with id >${itemId}< doesn't exist`
    );
  }

  delete state.items.items[itemId];
};

export const update: Action<{
  itemId: string;
  itemFields: Partial<Item>;
}> = ({ state }, { itemId, itemFields }) => {
  if (state.items.items[itemId] == null) {
    throw new Error(
      `Could not update item: Item with id >${itemId}< doesn't exist`
    );
  }

  state.items.items[itemId] = { ...state.items.items[itemId], ...itemFields };
};

export const addTag: Action<{ itemId: string; tagId: string }> = (
  { state },
  { itemId, tagId }
) => {
  const item = state.items.items[itemId];

  if (item.tagIds.indexOf(tagId) > -1) return;

  item.tagIds.push(tagId);
};

export const removeTag: Action<{ itemId: string; tagId: string }> = (
  { state },
  { itemId, tagId }
) => {
  const item = state.items.items[itemId];

  const index = state.items.items[itemId].tagIds.indexOf(tagId);
  if (index < 0) return;

  item.tagIds.splice(index, 1);
};

export const removeTagFromAll: Action<string> = ({ state, actions }, tagId) => {
  state.items.itemsList.forEach(item => {
    actions.items.removeTag({ itemId: item.id, tagId });
  });
};
