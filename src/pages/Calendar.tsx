import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import StudyRecord from "../components/StudyRecord";
import { getDay, getMonth, getYear } from "../utils/getDate";

export interface date {
  year: string;
  month: string;
  day: string;
}

const Calendar: React.FC = () => {
  const dateRef = useRef<any>();
  const isMounted = useRef(false);
  const [date, setDate] = useState<date>();
  const { studyTimes } = useStorage();
  const onChange = () => {
    console.log("working");
  };
  useEffect(() => {
    if (dateRef.current.value === undefined) {
      const newObj = {
        year: getYear(),
        month: getMonth(),
        day: getDay(),
      };
      setDate(newObj);
    }
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="custom-date-wrapper">
          <IonDatetime
            presentation="date"
            ref={dateRef}
            onIonChange={onChange}
          ></IonDatetime>
        </div>
        <StudyRecord date={date} studyTimes={studyTimes} />
      </IonContent>
    </>
  );
};

export default Calendar;
