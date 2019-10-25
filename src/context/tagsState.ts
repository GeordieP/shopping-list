import produce from "immer";

import storage from "./storage";

export const initialState = [];

export const actions = {
  addTag: (tag: Tag) => ({
    type: TagsActionTypes.AddTag,
    tag
  }),

  removeTag: (id: string) => ({
    type: TagsActionTypes.RemoveTag,
    id
  }),

  updateTag: (id: string, newFields: Partial<Tag>) => ({
    type: TagsActionTypes.UpdateTag,
    id,
    newFields
  }),

  addItemToTag: (id: string, itemID: string) => ({
    type: TagsActionTypes.AddItemToTag,
    id,
    itemID
  }),

  removeItemFromTag: (id: string, itemID: string) => ({
    type: TagsActionTypes.RemoveItemFromTag,
    id,
    itemID
  }),

  removeItemFromAllTags: (itemID: string) => ({
    type: TagsActionTypes.RemoveItemFromAllTags,
    itemID
  })
};

export const reducer: React.Reducer<TagsState, TagsAction> = (
  state,
  action
) => {
  switch (action.type) {
    case TagsActionTypes.AddTag:
      const foundIndex = state.findIndex(t => t.id === action.tag.id);
      if (foundIndex !== -1) {
        console.error("Tag", action.tag.name, "already exists; skipping");
        return state;
      }
      return produce(state, draft => {
        draft.push(action.tag);
      });

    case TagsActionTypes.RemoveTag:
      return produce(state, draft => {
        const index = draft.findIndex(t => t.id === action.id);
        // TODO: handle index -1
        draft.splice(index, 1);
      });

    case TagsActionTypes.UpdateTag:
      return produce(state, draft => {
        const index = draft.findIndex(t => t.id === action.id);

        draft[index] = {
          ...draft[index],
          ...action.newFields
        };
      });

    case TagsActionTypes.AddItemToTag:
      return produce(state, draft => {
        const index = draft.findIndex(t => t.id === action.id);
        draft[index].items.push(action.itemID);
      });

    case TagsActionTypes.RemoveItemFromTag:
      return produce(state, draft => {
        const index = draft.findIndex(t => t.id === action.id);
        const tag = draft[index];
        const itemIndex = tag.items.findIndex(i => i.id === action.itemID);

        tag.items.splice(itemIndex, 1);
      });

    case TagsActionTypes.RemoveItemFromAllTags:
      return produce(state, draft => {
        draft.forEach(tag => {
          const indexOfItem = tag.items.indexOf(action.itemID);
          if (indexOfItem !== -1) {
            tag.items.splice(indexOfItem, 1);
          }
        });
      });

    default:
      return state;
  }
};

// Types

enum TagsActionTypes {
  AddTag,
  RemoveTag,
  UpdateTag,
  AddItemToTag,
  RemoveItemFromTag,
  RemoveItemFromAllTags
}
