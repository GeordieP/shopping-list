import { Action } from "overmind";

export const setAll: Action<
  { [key in string]: EntityStateList<EntityState> }
> = ({ state }, lists) => {
  state.lists.lists = lists;
};

export const add: Action<EntityStateList<EntityState>> = ({ state }, list) => {
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

export const addEntry: Action<{
  listId: string;
  entryId: string;
  entryState: EntityState;
}> = ({ state }, { listId, entryId, entryState }) => {
  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Could not add entry to list: List with id >${listId}< does not exist`
    );
  }

  const list = state.lists.lists[listId];

  if (list.entries[entryId] != null) {
    throw new Error(
      `Could not add entry to list: Entry with id >${entryId}< already exists in list >${listId}<. Call "updateEntry" action instead.`
    );
  }

  list.entries[entryId] = entryState;
};

export const removeEntry: Action<{ listId: string; entryId: string }> = (
  { state },
  { listId, entryId }
) => {
  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Could not remove entry from list: List with id >${listId}< does not exist`
    );
  }

  const list = state.lists.lists[listId];

  if (list.entries[entryId] == null) {
    throw new Error(
      `Could not remove entry from list: Entry with id >${entryId}< doesn't exist in list >${listId}<`
    );
  }

  delete list.entries[entryId];
};

export const updateEntry: Action<{
  listId: string;
  entryId: string;
  entry: Partial<EntityState>;
}> = ({ state }, { listId, entryId, entry }) => {
  if (state.lists.lists[listId] == null) {
    throw new Error(
      `Could not update entry in list: List with id >${listId}< does not exist`
    );
  }

  const list = state.lists.lists[listId];

  if (list.entries[entryId] == null) {
    throw new Error(
      `Could not update entry in list: Entry with id >${entryId}< doesn't exist in list >${listId}<`
    );
  }

  list.entries[entryId] = { ...list.entries[entryId], ...entry };
};

export const removeEntryFromAll: Action<string> = (
  { state, actions },
  entryId
) => {
  Object.values(state.lists.lists).forEach(list => {
    if (list.entries[entryId] == null) return;

    actions.lists.removeEntry({ listId: list.id, entryId });
  });
};
