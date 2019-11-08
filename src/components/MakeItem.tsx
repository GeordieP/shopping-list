import React from "react";
import {
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonContent
} from "@ionic/react";

import { makeItem } from "../entities";
import useInput from "../hooks/useInput";

const MakeItem: React.FC<MakeItemProps> = ({ saveItem }) => {
  const nameInput = useInput();
  const priceInput = useInput("0.00");

  function onSubmit() {
    const newItem = makeItem(nameInput.value, priceInput.value);
    saveItem(newItem);
  }

  return (
    <IonContent>
      <IonItem>
        <h1>New Item</h1>
        <h2>SAV DEL</h2>
      </IonItem>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput {...nameInput} />
      </IonItem>

      <IonItem>
        <IonLabel>Price</IonLabel>
        <IonInput {...priceInput} clearOnEdit />
      </IonItem>

      <IonItem>
        <IonButton expand="block" onClick={onSubmit}>
          Save
        </IonButton>
      </IonItem>
    </IonContent>
  );
};

export default MakeItem;

// Types

interface MakeItemProps {
  saveItem: (item: Item) => void;
}
