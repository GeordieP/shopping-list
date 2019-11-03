export type State = {
  tags: { [key in string]: Tag };
};

const state: State = {
  tags: {}
};

export default state;
