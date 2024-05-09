import {
  IonList,
  IonItem,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonLabel,
  IonInput,
  IonTextarea,
  IonText,
  IonButton,
} from "@ionic/react";
import React, { useState } from "react";

const Form = ({
  startDateRef,
  endDateRef,
  subjectRef,
  textAreaRef,
  warning,
  onAdd,
}: {
  startDateRef: any;
  endDateRef: any;
  subjectRef: any;
  textAreaRef: any;
  warning: any;
  onAdd: any;
}) => {
  const [subject, setSubject] = useState();
  const [textarea, setTextarea] = useState();
  const onSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };
  const onTextareaChange = (e: any) => {
    setTextarea(e.target.value);
  };

  return (
    <>
      <p className="custom-heading">공부시간 기록</p>
      <IonList>
        <IonItem>
          <IonLabel>시작 시간</IonLabel>
          <IonDatetimeButton
            datetime="start-date"
            className="start-date"
          ></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="start-date" ref={startDateRef}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel>종료 시간</IonLabel>
          <IonDatetimeButton
            datetime="end-date"
            className="end-date"
          ></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="end-date" ref={endDateRef}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonInput
            label="공부한 과목"
            placeholder="공부한 과목"
            onIonInput={onSubjectChange}
            ref={subjectRef}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonTextarea
            label="공부한 내용"
            placeholder="공부한 내용"
            onIonInput={onTextareaChange}
            className="custom-text-area"
            ref={textAreaRef}
          ></IonTextarea>
        </IonItem>
      </IonList>
      {warning === true && (
        <div className="custom-danger-wrapper">
          <IonText color="danger">
            시간 입력이 잘못되었습니다 다시 입력해주세요
          </IonText>
        </div>
      )}
      <div className="custom-btn-wrapper">
        <IonButton color="primary" onClick={onAdd}>
          추가하기
        </IonButton>
      </div>
    </>
  );
};

export default Form;
