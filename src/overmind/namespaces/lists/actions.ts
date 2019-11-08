import { Action } from "overmind";

export const setAll: Action<{ [key in string]: List }> = ({ state }, lists) => {
  state.lists.lists = lists;
};

export const add: Action<List> = ({ state }, list) => {
  const listId = list.id;

  if (state.lists.lists[listId] != null) {
    throw new Error(
      `Could not add list: List with id >${listId}< already exists`
    );
  }

  state.lists.lists[listId] = list;
};

export const remove: Action<string> = ({ state }, listId) => {
  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Could not remove list: List with id >${listId}< does not exist`
    );
  }

  delete state.lists.lists[listId];
};

export const update: Action<{ listId: string; newFields: Partial<List> }> = (
  { state },
  { listId, newFields }
) => {
  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Could not update list: List with id >${listId}< does not exist`
    );
  }

  state.lists.lists[listId] = {
    ...state.lists.lists[listId],
    ...newFields
  };
};
