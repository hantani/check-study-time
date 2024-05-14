import React, { useEffect, useRef, useState, memo } from "react";
import {
  IonInput,
  IonItem,
  IonButton,
  IonProgressBar,
  IonText,
} from "@ionic/react";

const TodayStudyTime = memo(
  ({
    todayStudyTime,
    todayGoalTime,
    addTodayGoalTime,
  }: {
    todayStudyTime: number;
    todayGoalTime: number;
    addTodayGoalTime: (time: number) => {};
  }) => {
    const [progress, setProgress] = useState<number>();
    const goalTimeRef = useRef<any>();

    const onAdd = () => {
      const inputValue = parseInt(goalTimeRef.current.value);
      if (inputValue) {
        addTodayGoalTime(inputValue);
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
            placeholder="숫자로 적어주세요"
            type="number"
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
        {todayGoalTime === null ? (
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
        {todayGoalTime && todayStudyTime >= todayGoalTime && (
          <div className="custom-celebrate-wrapper">
            <IonText color="secondary" className="custom-celebrate">
              축하드립니다! 오늘 목표 공부시간을 달성하였습니다!
            </IonText>
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
  }
);

export default TodayStudyTime;
