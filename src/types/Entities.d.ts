type ID = string | number;

/* Item */

interface Item {
  id: ID;
  name: string;
  price: string;
  tags: Tag[];
  completed: boolean;
  listed: boolean;
}

interface ItemsAction {
  type: ItemsActionTypes;
  [key: string]: any;
}

type ItemsState = Item[];

/* Tag */

interface Tag {
  id: ID;
  name: string;
  items: Item[];
  color: string;
}

interface TagsAction {
  type: TagsActionTypes;
  [key: string]: any;
}

type TagsState = Tag[];
