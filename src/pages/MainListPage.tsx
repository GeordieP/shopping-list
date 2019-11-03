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

import id from "app/id";

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

  // const testFunction = () => {
  //   const id = Date.now().toString();

  //   actions.items.add({
  //     id,
  //     name: `item ${id}`,
  //     complete: false,
  //     listed: false,
  //     price: "0.00",
  //     tags: []
  //   });
  // };

  // const testFunction2 = (itemId: string) => {
  //   const tagId = Date.now().toString();
  //   actions.items.addTag({ itemId, tagId });
  // };

  // const testFunction3 = (itemId: string) => {
  //   const item = state.items.items[itemId];
  //   const tagId = item.tags[0];
  //   actions.items.removeTag({ itemId, tagId });
  // };

  // const testFunction4 = (itemId: string) => {
  //   const tagId = "fake";
  //   actions.items.removeTag({ itemId, tagId });
  // };

  // const testFunction5 = (itemId: string) => {
  //   // add item to a list
  //   const listKey = "MAIN";
  //   actions.itemList.addItem({ listKey, itemId });
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab One</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
      {/* <IonContent>
        <h1>Raw List</h1>

        <IonGrid>
          <IonButton onClick={testFunction}>New Item</IonButton>

          <IonList>
            <IonListHeader>Items</IonListHeader>
            {state.items.itemsList.map(i => (
              <IonItem key={i.id}>
                {i.name}
                <IonButton onClick={() => testFunction5(i.id)}>+List</IonButton>

                {i.tags.map(t => (
                  <IonText>{t},</IonText>
                ))}
              </IonItem>
            ))}
          </IonList>
        </IonGrid>

        <h1>Computed Main List</h1>

        <IonGrid>
          <IonButton onClick={testFunction}>New Item</IonButton>

          <IonList>
            <IonListHeader>MAIN list items</IonListHeader>
            {state.itemList.resolveList("MAIN").map(i => (
              <IonItem key={i.id}>
                {i.name}
                <IonButton onClick={() => testFunction2(i.id)}>+</IonButton>
                <IonButton onClick={() => testFunction5(i.id)}>+List</IonButton>

                {i.tags.map(t => (
                  <IonText>{t},</IonText>
                ))}
              </IonItem>
            ))}
          </IonList>
        </IonGrid>

        <IonButton onClick={toggleModal}>Open Modal</IonButton>
        <IonModal isOpen={modalOpen}>
          <ListItemMenuModal close={() => setModalOpen(false)} />
        </IonModal>
      </IonContent> */}
    </IonPage>
  );
};

export default MainListPage;
