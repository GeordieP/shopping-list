import { OnInitialize } from "overmind";
import storage from "app/storage";

enum StorageMembers {
  Items = "ITEMS",
  Tags = "TAGS",
  Lists = "LISTS"
}

type ItemCollection = { [key in string]: Item };
type TagCollection = { [key in string]: Tag };
type ListCollection = { [key in string]: List };

const onInitialize: OnInitialize = async ({ state, actions }, overmind) => {
  state.appLoading = true;

  // Pull previous state from storage

  const storedData = await storage.keysvalues();

  if (storedData.keysvalues != null && storedData.keysvalues.length > 0) {
    for (let i = 0; i < storedData.keysvalues.length; i++) {
      const pair: { key: string; value: string } = storedData.keysvalues[i];

      switch (pair.key) {
        case StorageMembers.Items:
          const items = JSON.parse(pair.value) as ItemCollection;
          actions.items.setAll(items);
          break;

        case StorageMembers.Tags:
          const tags = JSON.parse(pair.value) as TagCollection;
          actions.tags.setAll(tags);
          break;

        case StorageMembers.Lists:
          const lists = JSON.parse(pair.value) as ListCollection;
          actions.lists.setAll(lists);
          break;
      }
    }
  }

  // Reactions to save state to storage

  overmind.reaction(
    ({ items }) => items.items,
    async items => {
      await storage.set({
        key: StorageMembers.Items,
        value: JSON.stringify(items)
      });
    },
    { nested: true }
  );

  overmind.reaction(
    ({ tags }) => tags.tags,
    async tags => {
      await storage.set({
        key: StorageMembers.Tags,
        value: JSON.stringify(tags)
      });
    },
    { nested: true }
  );

  overmind.reaction(
    ({ lists }) => lists.lists,
    async lists => {
      await storage.set({
        key: StorageMembers.Lists,
        value: JSON.stringify(lists)
      });
    },
    { nested: true }
  );

  state.appLoading = false;
};

export default onInitialize;
