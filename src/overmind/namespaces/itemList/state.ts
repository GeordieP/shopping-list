import { Derive } from "overmind";

export type State = {
  lists: { [id: string]: EntityList<Item> };
  favListIds: string[];
};

const state: State = {
  lists: {},
  favListIds: []
};

export default state;
