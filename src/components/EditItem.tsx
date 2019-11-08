import React from "react";
import {
  IonContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonInput,
  IonLabel
} from "@ionic/react";

import useInput from "../hooks/useInput";

const EditItem: React.FC<EditItemProps> = ({ item, saveItem }) => {
  const nameInput = useInput(item.name);
  const priceInput = useInput(item.price);

  function onSubmit() {
    saveItem({
      ...item,
      name: nameInput.value,
      price: priceInput.value
    });
  }

  return (
    <IonContent>
      <h1>Edit Item</h1>

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

export default EditItem;

// Types

interface EditItemProps {
  item: Item;
  saveItem: (item: Item) => void;
}
