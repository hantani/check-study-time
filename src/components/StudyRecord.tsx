import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardContent,
} from "@ionic/react";
import { studyRecord } from "../hooks/useStorage";
import { date } from "../pages/Calendar";

const StudyRecord = ({
  date,
  studyTimes,
}: {
  date: date | undefined;
  studyTimes: object | undefined;
}): JSX.Element => {
  return (
    <>
      {date && (
        <p className="custom-heading">
          {date.year}년 {date.month}월 {date.day}일의 기록
        </p>
      )}
    </>
  );
};

export default StudyRecord;
