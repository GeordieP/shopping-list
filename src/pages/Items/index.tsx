import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList
} from "@ionic/react";
import { add } from "ionicons/icons";

// Overmind
import { useOvermind } from "../../overmind";

// Hooks
import useAlert from "../../hooks/useAlert";

// Components
import DeleteConfirmAlert from "../../components/DeleteConfirmAlert";
import AppModal, {
  useModal,
  AppModalErrToast
} from "../../components/AppModal";
import EditItem from "../../components/EditItem";
import MakeItem from "../../components/MakeItem";
import ListItem from "./ListItem";

const Items: React.FC = () => {
  const { state, actions } = useOvermind();
  const [selectedItem, setSelectedItem] = React.useState();

  const editItemModal = useModal();
  const createItemModal = useModal();
  const deleteItemConfirmAlert = useAlert();

  function onCreateItem(newItem: Item) {
    actions.items.add(newItem);
    createItemModal.hide();
  }

  function onEditItem(item: Item) {
    setSelectedItem(item);
    editItemModal.show();
  }

  function onEditItemSave(item: Item) {
    editItemModal.hide();
    actions.items.replace(item);
    setSelectedItem(undefined);
  }

  function onItemDeleteClick(item: Item) {
    setSelectedItem(item);
    deleteItemConfirmAlert.show();
  }

  function onDeleteItemCancelled() {
    deleteItemConfirmAlert.hide();
    setSelectedItem(undefined);
  }

  function onDeleteItemConfirmed() {
    deleteItemConfirmAlert.hide();
    actions.items.remove(selectedItem.id);
    setSelectedItem(undefined);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Items Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Items</h1>

        <IonList>
          {state.items.itemsList.map(i => {
            const tags = i.tagIds.map(tId => state.tags.tags[tId]);
            const onEdit = () => onEditItem(i);
            const onDelete = () => onItemDeleteClick(i);

            return (
              <ListItem
                key={i.id}
                item={i}
                tags={tags}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </IonList>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={createItemModal.show}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {editItemModal.isOpen && (
          <AppModal {...editItemModal}>
            <EditItem
              item={selectedItem}
              saveItem={onEditItemSave}
              tags={state.tags.tagsList}
            />
          </AppModal>
        )}

        {createItemModal.isOpen && (
          <AppModal {...createItemModal}>
            <MakeItem saveItem={onCreateItem} />

            {createItemModal.error && (
              <AppModalErrToast
                onDidDismiss={createItemModal.clearError}
                message={createItemModal.error}
              />
            )}
          </AppModal>
        )}

        {deleteItemConfirmAlert.isOpen && (
          <DeleteConfirmAlert
            {...deleteItemConfirmAlert}
            onDelete={onDeleteItemConfirmed}
            onCancel={onDeleteItemCancelled}
            onDidDismiss={onDeleteItemCancelled}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Items;
