import {
  IonList,
  IonItem,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonLabel,
} from "@ionic/react";
import React, { useRef } from "react";

const Form = () => {
  const startDateRef = useRef(null);

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
      </IonList>
    </>
  );
};

export default Form;
