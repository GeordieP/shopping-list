import { Derive } from "overmind";

export type State = {
  items: { [id: string]: Item };
  tags: { [id: string]: Tag };
  itemsList: Derive<State, Item[]>;
  tagsList: Derive<State, Tag[]>;
};

const state: State = {
  items: {},
  tags: {},
  itemsList: state => Object.values(state.items),
  tagsList: state => Object.values(state.tags)
};

export default state;
