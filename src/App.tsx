import React from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { apps, flash, send } from "ionicons/icons";

// overmind
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config, options } from "./overmind";

import MainListPage from "./pages/MainListPage";
import ItemsListPage from "./pages/ItemsListPage";
import TagsListPage from "./pages/TagsListPage";
import SettingsPage from "./pages/SettingsPage";

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
// import "./theme/dark.css";

const App: React.FC = () => {
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

const overmind = createOvermind(config, options);
export default (props: any) => (
  <Provider value={overmind}>
    <App {...props} />
  </Provider>
);
