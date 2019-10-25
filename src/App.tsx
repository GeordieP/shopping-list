import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  getPlatforms,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { apps, flash, send } from "ionicons/icons";

// context
import { ItemsContextProvider, TagsContextProvider } from "./context/context";

import MainListPage from "./pages/MainListPage";
import ItemsListPage from "./pages/ItemsListPage";
import TagsListPage from "./pages/TagsListPage";
import SettingsPage from "./pages/SettingsPage";
import Tab2 from "./pages/Tab2";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/dark.css";

const App: React.FC = () => {
  console.log("platforms", getPlatforms());
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tags" component={TagsListPage} />
            <Route exact path="/items" component={ItemsListPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route path="/" exact component={MainListPage} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="mainTab" href="/">
              <IonIcon icon={flash} />
              <IonLabel>List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="itemsTab" href="/items">
              <IonIcon icon={apps} />
              <IonLabel>Items</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tagsTab" href="/tags">
              <IonIcon icon={send} />
              <IonLabel>settings</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settingsTab" href="/settings">
              <IonIcon icon={send} />
              <IonLabel>settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default (props: any) => (
  <ItemsContextProvider>
    <TagsContextProvider>
      <App {...props} />
    </TagsContextProvider>
  </ItemsContextProvider>
);
