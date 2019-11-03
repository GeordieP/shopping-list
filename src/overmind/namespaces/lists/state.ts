export type State = {
  lists: { [key in string]: EntityStateList<EntityState> };
};

const state: State = {
  lists: {}
};

export default state;
