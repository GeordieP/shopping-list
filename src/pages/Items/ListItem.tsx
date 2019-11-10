import React from "react";
import {
  IonChip,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";

const ListItem: React.FC<ListItemProps> = ({
  item,
  tags,
  onAddToList,
  onEdit,
  onDelete
}) => {
  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={onEdit}>
          Edit Item
        </IonItemOption>
      </IonItemOptions>

      <IonItem button detail={false} onClick={onAddToList}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h1>{item.name}</h1>
            <p>{item.price}</p>
          </div>
          <div>
            {/* TODO: use tag color */}
            {tags.map(t => (
              <IonChip key={t.id} outline color="primary">
                {t.name}
              </IonChip>
            ))}
          </div>
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ListItem;

// Types

interface ListItemProps {
  item: Item;
  tags: Tag[];
  onAddToList: () => void;
  onEdit: () => void;
  onDelete: () => void;
}
