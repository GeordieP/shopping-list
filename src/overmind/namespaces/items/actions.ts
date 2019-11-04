import { Action } from "overmind";
import { makeItemState } from "../../../entities";

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

export const addToList: Action<{ itemId: string; listId: string }> = (
  { state },
  { itemId, listId }
) => {
  if (state.items.items[itemId] == null) {
    throw new Error(
      `Couldn't add item to list: Item with ID >${itemId}< does not exist`
    );
  }

  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Couldn't add item to list: List with ID >${listId}< does not exist`
    );
  }

  const itemState = makeItemState();
  state.items.items[itemId].listStates[listId] = itemState;
};

export const removeFromList: Action<{ itemId: string; listId: string }> = (
  { state },
  { itemId, listId }
) => {
  if (state.items.items[itemId] == null) {
    throw new Error(
      `Couldn't remove item from list: Item with ID >${itemId}< does not exist`
    );
  }

  const item = state.items.items[itemId];

  // TODO: is this check good or should we silently fail?
  if (item.listStates[listId] == null) {
    throw new Error(
      `Couldn't remove item from list: Item >${itemId}< doesn't contain a reference to list with ID >${listId}<`
    );
  }

  delete item.listStates[listId];
};

export const removeAllFromList: Action<string> = (
  { state, actions },
  listId
) => {
  state.items.itemsList.forEach(item => {
    actions.items.removeFromList({ itemId: item.id, listId });
  });
};

export const setCompleteState: Action<{
  itemId: string;
  listId: string;
  complete: boolean;
}> = ({ state }, { itemId, listId, complete }) => {
  if (state.items.items[itemId] == null) {
    throw new Error(
      `Couldn't set item as complete: Item with ID >${itemId}< does not exist`
    );
  }

  const item = state.items.items[itemId];

  if (item.listStates[listId] == null) {
    throw new Error(
      `Couldn't set item as complete: Item >${itemId}< doesn't contain a reference to list with ID >${listId}<`
    );
  }

  item.listStates[listId].complete = complete;
};
