import React from "react";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react";

const EditItem: React.FC<EditItemProps> = ({ item, saveItem }) => {
  // TODO ...
  const [itemDraft, setItemDraft] = React.useState();
  if (item == null) return null;

  return (
    <IonGrid>
      <IonCol>
        <IonRow>
          <IonCol>
            <h1>Edit Item</h1>
          </IonCol>
          <IonCol>
            <IonButton onClick={() => saveItem(itemDraft)}>Save</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>Name: {item.name}</IonRow>
        <IonRow>Price: {item.price}</IonRow>
      </IonCol>
    </IonGrid>
  );
};

export default EditItem;

// Types

interface EditItemProps {
  item?: Item;
  saveItem: (item: Item) => void;
}
