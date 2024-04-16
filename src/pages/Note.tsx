import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonDatetime,
  IonTextarea,
  IonButton,
  IonDatetimeButton,
  IonModal,
} from "@ionic/react";
import "./Note.css";
import { useCallback, useState, useRef } from "react";
import WiseSaying from "../components/WiseSaying";

const Note: React.FC = () => {
  const [subject, setSubject] = useState();
  const [textarea, setTextarea] = useState();
  const onSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };
  const onTextareaChange = (e: any) => {
    setTextarea(e.target.value);
  };
  const onAdd = useCallback(() => {}, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <WiseSaying></WiseSaying>
        <IonList>
          <IonItem>
            <IonLabel>시작 시간</IonLabel>
            <IonDatetimeButton
              datetime="start-date"
              className="start-date"
            ></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="start-date"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel>종료 시간</IonLabel>
            <IonDatetimeButton
              datetime="end-date"
              className="end-date"
            ></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="end-date"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonInput
              label="공부한 과목"
              placeholder="공부한 과목"
              onIonInput={onSubjectChange}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonTextarea
              label="공부한 내용"
              placeholder="공부한 내용"
              onIonInput={onTextareaChange}
              className="custom-text-area"
            ></IonTextarea>
          </IonItem>
        </IonList>
        <div className="custom-btn-wrapper">
          <IonButton color="primary" onClick={onAdd}>
            추가하기
          </IonButton>
        </div>
      </IonContent>
    </>
  );
};

export default Note;
