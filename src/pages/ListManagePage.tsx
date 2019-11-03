import React from "react";
import {
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonButton,
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem
} from "@ionic/react";
import { json, action } from "overmind";

import { useOvermind } from "../overmind";
import { makeEntityStateList } from "../entities";

const Item: React.FC<{
  itemId: string;
  complete: boolean;
  setComplete: (complete: boolean) => void;
}> = ({ itemId, complete, setComplete }) => {
  const { state } = useOvermind();
  const item = state.items.items[itemId];

  return (
    <IonItem onClick={() => setComplete(!complete)}>
      name: {item.name}
      tags: {JSON.stringify(item.tagIds)}
      complete: {complete.toString()}
    </IonItem>
  );
};

const ItemsList: React.FC<{
  entries: { [key in string]: ItemState };
}> = ({ entries }) => {
  const { actions } = useOvermind();

  function setComplete(itemId: string, complete: boolean) {
    actions.lists.updateEntry({
      listId: "MAIN",
      entryId: itemId,
      entry: { complete }
    });
  }

  return (
    <IonList>
      {Object.keys(entries).map(itemId => {
        return (
          <Item
            itemId={itemId}
            complete={entries[itemId].complete}
            setComplete={comp => setComplete(itemId, comp)}
          />
        );
      })}
      {/* {items.map(x => (
        <IonItem key={x.id} onClick={() => setItemCompleteState(x.id, true)}>
          Name: {x.name} complete: {x.complete.toString()} tags: {x.tags}
        </IonItem>
      ))} */}
    </IonList>
  );
};

const ListManagePage: React.FC = () => {
  const { state, actions } = useOvermind();
  const [inputState, setInputState] = React.useState("");
  const [selectedList, setSelectedList] = React.useState("");
  const [items, setItems] = React.useState<any[]>([]);

  // const items = state.items.itemsList.filter(item => item.id in )

  // React.useEffect(() => {
  //   if (selectedList === "") return;

  //   const entries = state.lists.lists[selectedList].entries;

  //   const items = Object.keys(entries).map(itemKey => {
  //     return {
  //       ...entries[itemKey],
  //       ...state.items.items[itemKey]
  //     };
  //   });

  //   setItems(items);
  // }, [selectedList]);

  const onInputChange = (e: any) => {
    setInputState(e.target.value);
  };

  function createList() {
    if (inputState.length === 0) return;
    const newList = makeEntityStateList(inputState);
    setInputState("");
    actions.lists.add(newList);
  }

  function setItemCompleteState(itemId: string, completeState: boolean) {
    actions.lists.updateEntry({
      listId: "MAIN",
      entryId: itemId,
      entry: { complete: completeState }
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>List Management</h1>

        <IonCard>
          <h2>Create List</h2>
          <IonInput
            value={inputState}
            onInput={onInputChange}
            placeholder="Type a name here"
          />
          <IonButton onClick={createList}>Create New List</IonButton>
        </IonCard>

        <IonCard>
          <h2>List of Lists</h2>
          <IonList>
            {state.lists.listIds.map(x => (
              <IonItem key={x.id} onClick={() => setSelectedList(x.id)}>
                {x.id}: {x.name}
              </IonItem>
            ))}
          </IonList>
        </IonCard>

        <IonCard>
          <h2>Selected List ({selectedList || "None"})</h2>
          {selectedList !== "" && (
            <ItemsList
              entries={
                state.lists.lists[selectedList].entries as {
                  [key in string]: ItemState;
                }
              }
            />
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ListManagePage;
