import React from "react";
import "./TodayStudyRecord.css";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
} from "@ionic/react";
import { studyRecord } from "../hooks/useStorage";
import { useStorage } from "../hooks/useStorage";

const TodayStudyRecord = ({
  todayStudyRecord,
}: {
  todayStudyRecord: studyRecord[];
}): JSX.Element => {
  // const { todayStudyRecord } = useStorage();

  return (
    <div className="custom-today-study-record">
      <p className="custom-heading">오늘의 공부기록</p>
      <ul>
        {todayStudyRecord.map((record, key) => (
          <li key={key}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  {record.subject && `${record.subject}-`}
                  <IonText color="secondary">{record.time}hr</IonText>
                </IonCardTitle>
              </IonCardHeader>
              {record.text && <IonCardContent>{record.text}</IonCardContent>}
            </IonCard>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayStudyRecord;
