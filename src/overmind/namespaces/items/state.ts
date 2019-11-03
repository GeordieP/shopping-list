import { Derive } from "overmind";

export type State = {
  items: { [id: string]: Item };
  itemsList: Derive<State, Item[]>;
};

const state: State = {
  items: {},
  itemsList: state => Object.values(state.items)
};

export default state;
