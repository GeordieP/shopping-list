import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useOvermind } from "../../overmind";

// Components
import ListItem from "./ListItem";

const DEFAULT_LIST_ID = "MAIN";

const Main: React.FC<MatchProps> = ({ match }) => {
  const { state, actions } = useOvermind();

  const listId = match.params.listId || DEFAULT_LIST_ID;

  const items = state.items.itemsList
    .filter(i => listId in i.listStates)
    .map(i => ({ ...i, complete: i.listStates[listId].complete }));

  function setItemComplete(itemId: string, complete: boolean) {
    actions.items.setCompleteState({ itemId, listId, complete });
  }

  function removeItemFromList(itemId: string) {
    actions.items.removeFromList({ listId, itemId });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Main Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Main Page</p>

        <IonList>
          {items.map(item => {
            const toggleComplete = () =>
              setItemComplete(item.id, !item.complete);
            const removeFromList = () => removeItemFromList(item.id);

            return (
              <ListItem
                key={item.id}
                toggleComplete={toggleComplete}
                removeFromList={removeFromList}
                {...item}
              />
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Main;

// Types
type MatchProps = RouteComponentProps<{ listId: string }>;
