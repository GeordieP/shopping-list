import React from "react";
import {
  IonPage,
  IonModal,
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonList,
  IonItem,
  IonText,
  IonGrid,
  IonListHeader
} from "@ionic/react";

import { useOvermind } from "../overmind";

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

  const toggleModal = () => setModalOpen(!modalOpen);

  const testFunction = () => {
    const id = Date.now();
    actions.addItem({
      id,
      name: `item ${id}`,
      complete: false,
      listed: false,
      price: "0.00",
      tags: []
    });
  };

  const testFunction2 = (itemId: ID) => {
    const tagId = Date.now();
    actions.addTag({ itemId, tagId });
  };

  const testFunction3 = (itemId: ID) => {
    const item = state.items[itemId];
    const tagId = item.tags[0];
    actions.removeTagFromItem({ itemId, tagId });
  };

  const testFunction4 = (itemId: ID) => {
    const tagId = "fake";
    actions.removeTagFromItem({ itemId, tagId });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Main List</h1>

        <IonGrid>
          <IonButton onClick={testFunction}>New Item</IonButton>

          <IonList>
            <IonListHeader>Items</IonListHeader>
            {state.itemsList.map(i => (
              <IonItem key={i.id}>
                {i.name}
                <IonButton onClick={() => testFunction2(i.id)}>+</IonButton>
                <IonButton onClick={() => testFunction3(i.id)}>-</IonButton>
                <IonButton onClick={() => testFunction4(i.id)}>-</IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonGrid>

        <IonButton onClick={toggleModal}>Open Modal</IonButton>
        <IonModal isOpen={modalOpen}>
          <ListItemMenuModal close={() => setModalOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MainListPage;
