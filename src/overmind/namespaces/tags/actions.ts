import { Action } from "overmind";

export const setAll: Action<{ [key in string]: Tag }> = ({ state }, tags) => {
  state.tags.tags = tags;
};

export const add: Action<Tag> = ({ state }, tag) => {
  const tagId = tag.id;

  if (state.tags.tags[tagId] != null) {
    throw new Error(`Could not add tag: Tag with id >${tagId}< already exists`);
  }

  state.tags.tags[tagId] = tag;
};

export const remove: Action<string> = ({ state }, tagId) => {
  if (state.tags.tags[tagId] == null) {
    throw new Error(
      `Could not remove tag: Tag with id >${tagId}< does not exist`
    );
  }

  delete state.tags.tags[tagId];
};

export const updateById: Action<{ tagId: string; tag: Partial<Tag> }> = (
  { state },
  { tagId, tag }
) => {
  if (state.tags.tags[tagId] == null) {
    throw new Error(
      `Could not update tag: Tag with id >${tagId}< does not exist`
    );
  }

  state.tags.tags[tagId] = { ...state.tags.tags[tagId], ...tag };
};

export const replace: Action<Tag> = ({ state }, tag) => {
  const tagId = tag.id;
  if (state.tags.tags[tagId] == null) {
    throw new Error(
      `Could not update tag: Tag with id >${tagId}< doesn't exist`
    );
  }

  state.tags.tags[tagId] = tag;
};
