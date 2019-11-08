import React from "react";
import { IonList, IonItem, IonText } from "@ionic/react";

const ItemList: React.FC<ItemListProps> = ({ items, ListItemComponent }) => {
  return (
    <IonList>
      {items.map(i => (
        <ListItemComponent item={i} />
      ))}
    </IonList>
  );
};

export default ItemList;

// Types

interface ItemListProps {
  items: Item[];
  // TODO: FC type here should say that the component should take at least an "item: Item" prop
  ListItemComponent: React.FC<any>;
}
