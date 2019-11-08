import { Derive } from "overmind";

export type State = {
  tags: { [key in string]: Tag };
  tagsList: Derive<State, Tag[]>;
};

const state: State = {
  tags: {},
  tagsList: state => Object.values(state.tags)
};

export default state;
