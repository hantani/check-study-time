import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonDatetime,
  IonTextarea,
  IonButton,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Note.css";
import { getDate } from "../utils/getDate";
import { useCallback, useState, useRef } from "react";

const Note: React.FC = () => {
  const startTimeRef = useRef<any>();
  const [currentDate, setCurrentDate] = useState(getDate());
  const [subject, setSubject] = useState();
  const [textarea, setTextarea] = useState();
  const [startTime, setStartTime] = useState();
  const onSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };
  const onTextareaChange = (e: any) => {
    setTextarea(e.target.value);
  };
  const onStartTime = (e: any) => {
    setStartTime(e.target.value);
  };
  const onAdd = () => {
    console.dir(startTimeRef.current);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput
              label="오늘 날짜"
              value={currentDate}
              readonly={true}
            ></IonInput>
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
          <IonItem>
            <IonLabel>시작 시간</IonLabel>
            <IonDatetime
              presentation="time"
              onIonChange={onStartTime}
              ref={startTimeRef}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>종료 시간</IonLabel>
            <IonDatetime presentation="time"></IonDatetime>
          </IonItem>
          <div className="custom-btn-wrapper">
            <IonButton color="primary" onClick={onAdd}>
              추가하기
            </IonButton>
          </div>
        </IonList>
      </IonContent>
    </>
  );
};

export default Note;
