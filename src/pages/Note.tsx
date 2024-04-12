import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Note.css";
import { getDate } from "../utils/getDate";
import { useState } from "react";

const Note: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="main-note">
          <h1></h1>
        </div>
      </IonContent>
    </>
  );
};

export default Note;
