import { makeId } from "app/id";

export function makeItem(
  name: string,
  price: string = "",
  tags: string[] = []
): Item {
  const id = makeId(name);

  return {
    id,
    name,
    price,
    tagIds: tags,
    listStates: {}
  };
}

export function makeItemState(complete = false): ItemState {
  return {
    complete
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

export function makeList(name: string): List {
  const id = makeId(name);

  return {
    id,
    name
  };
}
