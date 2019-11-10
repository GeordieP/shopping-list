import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonBadge,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from "@ionic/react";
import { add } from "ionicons/icons";

// Overmind
import { useOvermind } from "../overmind";

// Hooks
import useAlert from "../hooks/useAlert";

// Components
import DeleteConfirmAlert from "../components/DeleteConfirmAlert";
import AppModal, { useModal, AppModalErrToast } from "../components/AppModal";
import MakeTag from "../components/MakeTag";
import EditTag from "../components/EditTag";

const ListTag: React.FC<ListTagProps> = ({
  tag,
  itemCount,
  onEdit,
  onDelete
}) => {
  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption color="primary" onClick={onEdit}>
          Edit Tag
        </IonItemOption>
      </IonItemOptions>

      <IonItem button detail={false}>
        <p>{tag.name}</p>
        <IonBadge slot="end">{itemCount}</IonBadge>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={onDelete}>
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

const Tags: React.FC = () => {
  const { state, actions } = useOvermind();
  const [selectedTag, setSelectedTag] = React.useState();

  const editTagModal = useModal();
  const createTagModal = useModal();
  const deleteTagConfirmAlert = useAlert();

  function onCreateTag(newTag: Tag) {
    actions.tags.add(newTag);
    createTagModal.hide();
  }

  function onEditTag(tag: Tag) {
    setSelectedTag(tag);
    editTagModal.show();
  }

  function onEditTagSave(tag: Tag) {
    editTagModal.hide();
    actions.tags.replace(tag);
    setSelectedTag(undefined);
  }

  function onTagDeleteClick(tag: Tag) {
    setSelectedTag(tag);
    deleteTagConfirmAlert.show();
  }

  function onDeleteTagCancelled() {
    deleteTagConfirmAlert.hide();
    setSelectedTag(undefined);
  }

  function onDeleteTagConfirmed() {
    deleteTagConfirmAlert.hide();
    actions.safeRemoveTag(selectedTag.id);
    setSelectedTag(undefined);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tags Overview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {state.tags.tagsList.map(t => {
            const itemCount = state.items.itemsList.filter(i =>
              i.tagIds.includes(t.id)
            ).length;

            const onEdit = () => onEditTag(t);
            const onDelete = () => onTagDeleteClick(t);

            return (
              <ListTag
                key={t.id}
                tag={t}
                itemCount={itemCount}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </IonList>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={createTagModal.show}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {editTagModal.isOpen && (
          <AppModal {...editTagModal}>
            <EditTag tag={selectedTag} saveTag={onEditTagSave} />
          </AppModal>
        )}

        {createTagModal.isOpen && (
          <AppModal {...createTagModal}>
            <MakeTag saveTag={onCreateTag} />

            {createTagModal.error && (
              <AppModalErrToast
                onDidDismiss={createTagModal.clearError}
                message={createTagModal.error}
              />
            )}
          </AppModal>
        )}

        {deleteTagConfirmAlert.isOpen && (
          <DeleteConfirmAlert
            {...deleteTagConfirmAlert}
            onDelete={onDeleteTagConfirmed}
            onCancel={onDeleteTagCancelled}
            onDidDismiss={onDeleteTagCancelled}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tags;

// Types

interface ListTagProps {
  tag: Tag;
  itemCount: number;
  onEdit: () => void;
  onDelete: () => void;
}
