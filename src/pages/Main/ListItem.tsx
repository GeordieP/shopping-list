import React from "react";

import { IonText, IonCheckbox, IonGrid, IonCol, IonRow } from "@ionic/react";

const ListItem: React.FC<ListItemProps> = props => {
  function toggleComplete() {
    props.setCompleteState(!props.complete);
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonCheckbox
            color="primary"
            checked={props.complete}
            onChange={toggleComplete}
          />
          <IonText color="primary">
            <h1>{props.name}</h1>
          </IonText>
        </IonCol>
        <IonCol>${props.price}</IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ListItem;

// Types

interface ListItemProps {
  name: string;
  price: string;
  complete: boolean;
  setCompleteState: (complete: boolean) => void;
}
