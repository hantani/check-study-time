import React, { memo } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { studyRecord } from "../hooks/useStorage";
import { readerOutline } from "ionicons/icons";

const TodayStudyRecord = memo(
  ({ todayStudyRecord }: { todayStudyRecord: studyRecord[] }): JSX.Element => {
    return (
      <div className="custom-today-study-record">
        <p className="custom-heading">오늘의 공부기록</p>
        <ul>
          {todayStudyRecord.length !== 0 ? (
            todayStudyRecord.map((record, key) => (
              <li key={key}>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>
                      {record.subject && `${record.subject}-`}
                      <IonText color="secondary">{record.time}hr</IonText>
                    </IonCardTitle>
                  </IonCardHeader>
                  {record.text && (
                    <IonCardContent>{record.text}</IonCardContent>
                  )}
                </IonCard>
              </li>
            ))
          ) : (
            <div className="custom-no-record">
              <IonIcon icon={readerOutline}></IonIcon>
              <p className="custom-text">기록이 없습니다</p>
            </div>
          )}
        </ul>
      </div>
    );
  }
);

export default TodayStudyRecord;
