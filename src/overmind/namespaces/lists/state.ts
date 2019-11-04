export type State = {
  lists: { [key in string]: List };
};

const state: State = {
  lists: {
    MAIN: {
      id: "MAIN",
      name: "Main"
    }
  }
};

export default state;
