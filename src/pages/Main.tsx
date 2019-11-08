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
import { useOvermind } from "../overmind";

// Components
import ListItem from "../components/ListItem";

const DEFAULT_LIST_ID = "MAIN";

const Main: React.FC<MatchProps> = ({ match }) => {
  const { state, actions } = useOvermind();

  const listId = match.params.listId || DEFAULT_LIST_ID;

  const items = state.items.itemsList
    .filter(i => listId in i.listStates)
    .map(i => ({ ...i, complete: i.listStates[listId].complete }));

  const setItemComplete = (itemId: string) => (complete: boolean) => {
    actions.items.setCompleteState({ itemId, listId, complete });
  };

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
          {items.map(item => (
            <ListItem {...item} setCompleteState={setItemComplete(item.id)} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Main;

// Types
type MatchProps = RouteComponentProps<{ listId: string }>;
