import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  pencilOutline,
  calendarClearOutline,
  personOutline,
} from "ionicons/icons";
import Note from "./pages/Note";

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
import Calendar from "./pages/Calendar";
import My from "./pages/My";

setupIonicReact();

const App: React.FC = () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/note" />
        <Route path="/note" component={Note} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/my" component={My} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="note" href="/note">
          <IonIcon icon={pencilOutline} />
          <IonLabel>Note</IonLabel>
        </IonTabButton>
        <IonTabButton tab="calendar" href="/calendar">
          <IonIcon icon={calendarClearOutline} />
          <IonLabel>Calendar</IonLabel>
        </IonTabButton>
        <IonTabButton tab="my" href="/my">
          <IonIcon icon={personOutline} />
          <IonLabel>My</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
);

export default App;
