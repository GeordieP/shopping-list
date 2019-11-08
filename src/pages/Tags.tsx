import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Tags: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tags Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>Tags Page</p>
      </IonContent>
    </IonPage>
  );
};

export default Tags;
