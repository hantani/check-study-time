import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
} from "@ionic/react";
import { studyRecord, studyTimes } from "../hooks/useStorage";
import { date } from "../pages/Calendar";

const StudyRecord = ({
  date,
  studyTimes,
}: {
  date: date;
  studyTimes: studyTimes;
}): JSX.Element => {
  const [studyRecord, setStudyRecord] = useState<studyRecord[]>([]);
  useEffect(() => {
    if (
      studyTimes[date.year] &&
      studyTimes[date.year][date.month] &&
      studyTimes[date.year][date.month][date.day]
    ) {
      setStudyRecord(studyTimes[date.year][date.month][date.day]);
    } else {
      setStudyRecord([]);
    }
  }, [date, studyTimes]);

  return (
    <div className="custom-today-study-record">
      {date && (
        <p className="custom-heading">
          {date.year}년 {date.month}월 {date.day}일의 기록
        </p>
      )}
      <ul>
        {studyRecord.length > 0 ? (
          studyRecord.map((record, key) => (
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
          ))
        ) : (
          <div className="custom-no-record">
            <p>기록이 없습니다</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default StudyRecord;
