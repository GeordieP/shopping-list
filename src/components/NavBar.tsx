import React from "react";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { apps, flash, send } from "ionicons/icons";

const NavBar: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="tab1" href="/tab1">
        <IonIcon icon={flash} />
        <IonLabel>Tab One</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab2" href="/tab2">
        <IonIcon icon={apps} />
        <IonLabel>Tab Two</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tab3">
        <IonIcon icon={send} />
        <IonLabel>Tab Three</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default NavBar;
