import { makeId } from "app/id";

export function makeItem(name: string, price: string = ""): Item {
  const id = makeId(name);

  return {
    id,
    name,
    price,
    tagIds: []
  };
}

export function makeTag(name: string, color: string = ""): Tag {
  const id = makeId(name);

  return {
    id,
    name,
    color
  };
}

export function makeEntityStateList<TEntityState extends EntityState>(
  name: string
): EntityStateList<TEntityState> {
  const id = makeId(name);

  return {
    id,
    name,
    entries: {}
  };
}
