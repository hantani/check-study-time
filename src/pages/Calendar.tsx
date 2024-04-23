import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef } from "react";
import TodayStudyRecord from "../components/TodayStudyRecord";

const testArr = [
  {
    subject: "test",
    text: "test",
    time: 3,
  },
];

const Calendar: React.FC = () => {
  const dateRef = useRef<any>();
  const onChange = () => {};
  useEffect(() => {
    console.dir(dateRef.current);
    console.log(dateRef.current.value);
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
        <TodayStudyRecord todayStudyRecord={testArr} />
      </IonContent>
    </>
  );
};

export default Calendar;
