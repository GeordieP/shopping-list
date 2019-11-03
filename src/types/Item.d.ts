declare interface Item {
  id: string;
  name: string;
  price: string;
  tagIds: string[];
}

declare interface ItemState extends EntityState {
  complete: boolean;
}
