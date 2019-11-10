import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonList,
  IonIcon
} from "@ionic/react";
import { trash } from "ionicons/icons";

import { RouteComponentProps } from "react-router";
import { useOvermind } from "../../overmind";

// Hooks
import useAlert from "../../hooks/useAlert";

// Components
import ListItem from "./ListItem";
import ConfirmAlert from "../../components/ConfirmAlert";

const DEFAULT_LIST_ID = "MAIN";

const Main: React.FC<MatchProps> = ({ match }) => {
  const { state, actions } = useOvermind();

  const listId = match.params.listId || DEFAULT_LIST_ID;

  const clearListConfirmAlert = useAlert();

  const items = state.items.itemsList
    .filter(i => listId in i.listStates)
    .map(i => ({ ...i, complete: i.listStates[listId].complete }));

  function setItemComplete(itemId: string, complete: boolean) {
    actions.items.setCompleteState({ itemId, listId, complete });
  }

  function removeItemFromList(itemId: string) {
    actions.items.removeFromList({ listId, itemId });
  }

  function onClearListClick() {
    clearListConfirmAlert.show();
  }

  function onClearListConfirmed() {
    const listId = DEFAULT_LIST_ID;
    actions.items.removeAllFromList(listId);
  }

  function onClearListCancelled() {
    clearListConfirmAlert.hide();
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

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onClearListClick}>
            <IonIcon icon={trash} />
          </IonFabButton>
        </IonFab>

        {clearListConfirmAlert.isOpen && (
          <ConfirmAlert
            {...clearListConfirmAlert}
            onConfirm={onClearListConfirmed}
            onCancel={onClearListCancelled}
            onDidDismiss={onClearListCancelled}
            message="Are you sure you want to clear the list?"
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Main;

// Types
type MatchProps = RouteComponentProps<{ listId: string }>;
