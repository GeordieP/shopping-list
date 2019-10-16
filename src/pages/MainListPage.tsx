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
  IonLabel
} from "@ionic/react";

interface ListItemMenuModalProps {
  match: { params: { itemId: string } };
}

const ListItemMenuModal: React.FC<ListItemMenuModalProps> = props => {
  // const itemId = match.params.itemId || "no item id";
  const itemId = "no item id yet";

  console.log(props);

  return (
    <React.Fragment>
      <h1>I'm the modal content</h1>
      <h2>Item id is {itemId}</h2>
      <Link to="/">Close</Link>
    </React.Fragment>
  );
};

const ModalRouter: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <IonModal isOpen={isOpen}>
      <IonRouterOutlet>
        <Route path="/itemMenu/:itemId" component={ListItemMenuModal} />
        <Route path="" component={ListItemMenuModal} />
      </IonRouterOutlet>
    </IonModal>
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

        <IonButton href="/itemMenu/4" onClick={toggleModal}>
          Open Modal
        </IonButton>
        {/* 
        <Route path="/itemMenu/:itemId" component={MainListPage} /> */}
        <ModalRouter isOpen={modalOpen} />
      </IonContent>
    </IonPage>
  );
};

export default MainListPage;
