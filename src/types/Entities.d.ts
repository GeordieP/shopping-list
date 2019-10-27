type ID = string | number;

/* Base */
interface Action {
  NO_SAVE?: boolean;
  [key: string]: any;
}

/* Tag */

interface Tag {
  id: ID;
  name: string;
  items: Item[];
  color: string;
}

interface TagsAction extends Action {
  type: TagsActionTypes;
}

type TagsState = Tag[];
