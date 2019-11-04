import React from "react";
import {
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonText,
  IonListHeader
} from "@ionic/react";
import { useOvermind } from "../overmind";

import { makeItem } from "../entities";

const ItemsListPage: React.FC = () => {
  const { state, actions } = useOvermind();

  function newItem() {
    const newItem = makeItem(`item ${state.items.itemsList.length}`);
    actions.items.add(newItem);
  }

  function addItemToList(itemId: string) {
    const listId = "MAIN";
    actions.items.addToList({ itemId, listId });
  }

  return (
    <IonContent>
      <h1>All Items</h1>
      <IonButton onClick={newItem}>New Item</IonButton>
      <IonList>
        <IonListHeader>Items</IonListHeader>
        {state.items.itemsList.map(i => (
          <IonItem key={i.id}>
            {i.name}
            <IonButton onClick={() => addItemToList(i.id)}>+List</IonButton>

            <IonText>Tag IDs:</IonText>
            {i.tagIds.map(t => (
              <IonText>{t},</IonText>
            ))}
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default ItemsListPage;
