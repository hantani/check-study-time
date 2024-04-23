import React, { useEffect, useRef, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import {
  IonInput,
  IonItem,
  IonButton,
  IonProgressBar,
  IonText,
} from "@ionic/react";

const TodayStudyTime = ({
  todayStudyTime,
  todayGoalTime,
  addTodayGoalTime,
}: {
  todayStudyTime: number;
  todayGoalTime: number;
  addTodayGoalTime: (time: number) => {};
}) => {
  const [input, setInput] = useState<number>();
  const [progress, setProgress] = useState<number>();
  const goalTimeRef = useRef<any>();

  const goalTimeInput = (e: any) => {
    setInput(parseInt(e.target.value));
  };

  const onAdd = () => {
    if (input) {
      addTodayGoalTime(input);
      setInput(0);
      goalTimeRef.current.value = "";
    }
  };

  useEffect(() => {
    const rate = todayStudyTime / todayGoalTime;
    setProgress(rate);
  }, [todayStudyTime, todayGoalTime]);

  return (
    <div className="custom-today-study-time">
      <p className="custom-heading">오늘의 공부시간</p>
      <IonItem>
        <IonInput
          label="목표 공부시간"
          placeholder="목표 공부시간"
          type="number"
          onIonInput={goalTimeInput}
          ref={goalTimeRef}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="오늘 공부시간"
          readonly={true}
          value={todayStudyTime}
        ></IonInput>
      </IonItem>
      {todayGoalTime === 0 ? (
        <div className="custom-btn-wrapper type-02">
          <IonButton color="primary" onClick={onAdd}>
            추가하기
          </IonButton>
        </div>
      ) : (
        <div className="custom-btn-wrapper type-02">
          <IonButton color="primary" onClick={onAdd}>
            수정하기
          </IonButton>
        </div>
      )}
      {todayGoalTime && (
        <div className="custom-progress-wrapper">
          <IonProgressBar value={progress} />
          <div className="custom-progress-desc">
            <IonText>{todayStudyTime}</IonText>
            <IonText className="custom-interval">/</IonText>
            <IonText color="secondary">{todayGoalTime}</IonText>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayStudyTime;
