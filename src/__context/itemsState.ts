/*
import produce from "immer";

import storage from "./storage";

export const initialState = [];

export const actions = {
  addItem: (item: Item) => ({
    type: ItemsActionTypes.AddItem,
    item
  }),

  removeItem: (id: string) => ({
    type: ItemsActionTypes.RemoveItem,
    id
  }),

  updateItem: (id: string, newFields: Partial<Item>) => ({
    type: ItemsActionTypes.UpdateItem,
    id,
    newFields
  }),

  completeItem: (id: string) => ({
    type: ItemsActionTypes.UpdateItem,
    id,
    newFields: { completed: true }
  }),

  uncompleteItem: (id: string) => ({
    type: ItemsActionTypes.UpdateItem,
    id,
    newFields: { completed: false }
  }),

  listifyItem: (id: string) => ({
    type: ItemsActionTypes.UpdateItem,
    id,
    newFields: { listed: true }
  }),

  unlistifyItem: (id: string) => ({
    type: ItemsActionTypes.UpdateItem,
    id,
    newFields: { listed: false }
  }),

  addTag: (id: string, tagID: string) => ({
    type: ItemsActionTypes.AddTag,
    id,
    tagID
  }),

  removeTag: (id: string, tagID: string) => ({
    type: ItemsActionTypes.RemoveTag,
    id,
    tagID
  }),

  removeTagFromAll: (tagID: string) => ({
    type: ItemsActionTypes.RemoveTagFromAll,
    tagID
  })
};

export const reducer: React.Reducer<ItemsState, ItemsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case ItemsActionTypes.AddItem:
      const foundIndex = state.findIndex(i => i.id === action.item.id);
      if (foundIndex !== -1) {
        console.error("Item", action.item.name, "already exists; skipping");
        return state;
      }

      return produce(state, draft => {
        draft.push(action.item);
      });

    case ItemsActionTypes.RemoveItem:
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.id);
        // TODO: handle index -1
        draft.splice(index, 1);
      });

    case ItemsActionTypes.UpdateItem:
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.id);

        draft[index] = {
          ...draft[index],
          ...action.newFields
        };
      });

    case ItemsActionTypes.AddTag:
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.id);
        draft[index].tags.push(action.tagID);
      });

    case ItemsActionTypes.RemoveTag:
      return produce(state, draft => {
        const index = draft.findIndex(i => i.id === action.id);
        const item = draft[index];
        const tagIndex = item.tags.findIndex(t => t.id === action.tagID);

        item.tags.splice(tagIndex, 1);
      });

    // remove a given tag ID from every item
    case ItemsActionTypes.RemoveTagFromAll:
      return produce(state, draft => {
        draft.forEach(item => {
          const indexOfTag = item.tags.indexOf(action.tagID);
          if (indexOfTag !== -1) {
            item.tags.splice(indexOfTag, 1);
          }
        });
      });

    default:
      return state;
  }
};

// Types

enum ItemsActionTypes {
  AddItem,
  RemoveItem,
  UpdateItem,
  CompleteItem,
  UncompleteItem,
  ListifyItem,
  UnlistifyItem,
  AddTag,
  RemoveTag,
  RemoveTagFromAll
}

*/

export default {};
