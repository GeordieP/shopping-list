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
import useFilters from "../../hooks/useFilters";

// Components
import { CompletedItemsList, PendingItemsList } from "./ItemsList";
import ConfirmAlert from "../../components/ConfirmAlert";
import FilterSearch from "../../components/FilterSearch";
import FilterTags from "../../components/FilterTags";

const DEFAULT_LIST_ID = "MAIN";

const Main: React.FC<MatchProps> = ({ match }) => {
  const { state, actions } = useOvermind();
  const clearListConfirmAlert = useAlert();

  const listId = match.params.listId || DEFAULT_LIST_ID;

  const itemInListFilter = {
    itemInMainList: (item: Item) => listId in item.listStates
  };
  const { applyFilters, ...filterControls } = useFilters<Item>(
    itemInListFilter
  );

  // prettier-ignore
  const items: CompletableItem[] = applyFilters(state.items.itemsList)
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
        <FilterSearch {...filterControls} />
        <FilterTags tags={state.tags.tagsList} {...filterControls} />

        <h1>Shopping List</h1>
        <IonList>
          <PendingItemsList
            items={items}
            setItemComplete={setItemComplete}
            removeItemFromList={removeItemFromList}
          />
        </IonList>

        <h1>Completed Items</h1>
        <IonList>
          <CompletedItemsList
            items={items}
            setItemComplete={setItemComplete}
            removeItemFromList={removeItemFromList}
          />
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
export type CompletableItem = Item & { complete: boolean };
