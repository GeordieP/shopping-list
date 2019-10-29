import { Action } from "overmind";

export const addItem: Action<{ listKey: string; itemId: string }> = (
  { state },
  { listKey, itemId }
) => {
  const list = state.itemList.lists[listKey].entityIds;
  list.push(itemId);
};

export const removeItem: Action<{ listKey: string; itemId: string }> = (
  { state },
  { listKey, itemId }
) => {
  const list = state.itemList.lists[listKey].entityIds;
  const index = list.indexOf(itemId);
  list.splice(index, 1);
};

export const clearList: Action<string> = ({ state }, listKey) => {
  state.itemList.lists[listKey].entityIds = [];
};

export const setListItems: Action<{ listKey: string; items: string[] }> = (
  { state },
  { listKey, items }
) => {
  state.itemList.lists[listKey].entityIds = items;
};

export const favList: Action<string> = ({ state }, listKey) => {
  state.itemList.favListIds.push(listKey);
};

export const unfavList: Action<string> = ({ state }, listKey) => {
  const index = state.itemList.favListIds.indexOf(listKey);
  state.itemList.favListIds.splice(index, 1);
};
