declare interface ItemState {
  complete: boolean;
}

type ListState = {
  [key in string]: ItemState;
};

declare interface Item {
  id: string;
  name: string;
  price: string;
  tagIds: string[];
  listStates: ListState;
}
