import React from "react";
import {
  IonPage,
  IonModal,
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonText,
  IonCard,
  IonList,
  IonItem
} from "@ionic/react";

import { useOvermind } from "../overmind";

const LIST_KEY = "MAIN";

interface ListItemMenuModalProps {
  close: () => void;
}

const ListItemMenuModal: React.FC<ListItemMenuModalProps> = props => {
  return (
    <React.Fragment>
      <IonText color="dark">
        <h1>I'm the modal content</h1>
      </IonText>
      <IonButton onClick={props.close}>Close</IonButton>
    </React.Fragment>
  );
};

const MainListPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { state, actions } = useOvermind();

  const items = state.items.itemsList
    .filter(i => i.listStates[LIST_KEY] != null)
    .map(i => ({ ...i, complete: i.listStates[LIST_KEY].complete }));

  function setItemCompleteState(itemId: string, completeState: boolean) {
    actions.items.setCompleteState({
      itemId,
      listId: LIST_KEY,
      complete: completeState
    });
  }

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Main List</h1>

        <IonCard>
          <IonList>
            {items.map(x => {
              return (
                <IonItem
                  key={x.id}
                  onClick={() => setItemCompleteState(x.id, !x.complete)}
                >
                  {x.id}: {x.name} complete: {x.complete.toString()}
                </IonItem>
              );
            })}
          </IonList>
        </IonCard>

        <IonButton onClick={toggleModal}>Open Modal</IonButton>
        <IonModal isOpen={modalOpen}>
          <ListItemMenuModal close={() => setModalOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MainListPage;
