import React from "react";
import { Redirect, Route } from "react-router-dom";
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
import { apps, flash, send, settings } from "ionicons/icons";

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

/* Overmind */
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
import { config, options } from "./overmind";

/* Pages */
import Main from "./pages/Main";
import Items from "./pages/Items";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/mainlist" component={Main} />
            <Route exact path="/items" component={Items} />
            <Route exact path="/tags" component={Tags} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/" render={() => <Redirect to="mainlist" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="mainlist" href="/mainlist">
              <IonIcon icon={flash} />
              <IonLabel>Main</IonLabel>
            </IonTabButton>
            <IonTabButton tab="items" href="/items">
              <IonIcon icon={apps} />
              <IonLabel>Items</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tags" href="/tags">
              <IonIcon icon={send} />
              <IonLabel>Tags</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
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
