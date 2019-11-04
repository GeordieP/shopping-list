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

import { makeList } from "../entities";

import { useOvermind } from "../overmind";

const ListManagePage: React.FC = () => {
  const { state, actions } = useOvermind();
  const [inputState, setInputState] = React.useState("");
  const [selectedList, setSelectedList] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<Item[]>([]);

  React.useEffect(() => {
    const items: Item[] = state.items.itemsList.filter(
      item => item.listStates[selectedList] != null
    );
    setFilteredItems(items);
  }, [selectedList]);

  const onInputChange = (e: any) => {
    setInputState(e.target.value);
  };

  function createList() {
    if (inputState.length === 0) return;
    const newList = makeList(inputState);
    setInputState("");
    actions.lists.add(newList);
  }

  function setItemCompleteState(itemId: string, completeState: boolean) {
    actions.items.setCompleteState({
      itemId,
      listId: selectedList,
      complete: completeState
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
            {Object.entries(state.lists.lists).map(([key, list]) => {
              return (
                <IonItem key={key} onClick={() => setSelectedList(key)}>
                  {key}: {list.name}
                </IonItem>
              );
            })}
            {/* {state.lists.listIds.map(x => (
                <IonItem key={x.id} onClick={() => setSelectedList(x.id)}>
                {x.id}: {x.name}
                </IonItem>
                ))} */}
          </IonList>
        </IonCard>

        <IonCard>
          <h2>Selected List ({selectedList || "None"})</h2>
          <IonList>
            {filteredItems.map(x => {
              const complete = x.listStates[selectedList].complete;
              return (
                <IonItem
                  key={x.id}
                  onClick={() => setItemCompleteState(x.id, !complete)}
                >
                  {x.id}: {x.name} complete: {complete.toString()}
                </IonItem>
              );
            })}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ListManagePage;
