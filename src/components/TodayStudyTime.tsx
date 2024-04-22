import React, { useRef, useState } from "react";
import { useStorage } from "../hooks/useStorage";
import "./TodayStudyTime.css";
import { IonInput, IonItem, IonButton, IonProgressBar } from "@ionic/react";

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

  console.log(progress);

  const goalTimeInput = (e: any) => {
    setInput(parseInt(e.target.value));
  };

  const calculateRate = (goalTime: number) => {
    const rate = todayStudyTime / goalTime;
    setProgress(rate);
  };

  const onAdd = () => {
    if (input) {
      addTodayGoalTime(input);
      calculateRate(input);
      setInput(0);
      goalTimeRef.current.value = "";
    }
  };

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
        <div className="custom-btn-wrapper">
          <IonButton color="primary" onClick={onAdd}>
            추가하기
          </IonButton>
        </div>
      ) : (
        <div className="custom-btn-wrapper">
          <IonButton color="primary" onClick={onAdd}>
            수정하기
          </IonButton>
        </div>
      )}
      {progress && (
        <>
          <IonProgressBar value={progress} />
          <p>{`${todayStudyTime} / ${todayGoalTime}`}</p>
        </>
      )}
    </div>
  );
};

export default TodayStudyTime;
