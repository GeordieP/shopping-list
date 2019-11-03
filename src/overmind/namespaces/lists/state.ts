import { Derive } from "overmind";

export type State = {
  lists: { [key in string]: EntityStateList<EntityState> };
  listIds: Derive<State, { id: string; name: string }[]>;
};

const state: State = {
  lists: {
    MAIN: {
      id: "MAIN",
      name: "MAIN",
      entries: {} as { [key in string]: ItemState }
    }
  },
  listIds: ({ lists }) =>
    Object.values(lists).map(({ id, name }) => ({ id, name }))
};

export default state;
