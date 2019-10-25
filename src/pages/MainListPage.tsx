import React from "react";
import { Router, Route, Link } from "react-router-dom";
import {
  IonPage,
  IonModal,
  IonButton,
  IonContent,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/react";

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

        <IonButton onClick={toggleModal}>Open Modal</IonButton>
        <IonModal isOpen={modalOpen}>
          <ListItemMenuModal close={() => setModalOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default MainListPage;
