import React from "react";

import {
  IonCheckbox,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";

const ListItem: React.FC<ListItemProps> = props => {
  return (
    <IonItemSliding>
      <IonItem button detail={false} onClick={props.toggleComplete}>
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
            <h1>
              <IonCheckbox color="primary" checked={props.complete} />
              {props.name}
            </h1>
            <p>{props.price}</p>
          </div>
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={props.removeFromList}>
          Remove
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ListItem;

// Types

interface ListItemProps {
  name: string;
  price: string;
  complete: boolean;
  toggleComplete: () => void;
  removeFromList: () => void;
}
