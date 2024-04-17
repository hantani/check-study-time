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

interface initialDateObj {
  ampm: string;
  day: number;
  hour: number;
  minute: number;
  month: number;
  year: number;
}

const initialDateObj = {
  ampm: "",
  day: 0,
  hour: 0,
  minute: 0,
  month: 0,
  year: 0,
};

const calculateTime = (startDate: initialDateObj, endDate: initialDateObj) => {
  console.log(startDate, endDate);
};

const Note: React.FC = () => {
  const [subject, setSubject] = useState();
  const [textarea, setTextarea] = useState();
  const [startDate, setStartDate] = useState<initialDateObj>(initialDateObj);
  const [endDate, setEndDate] = useState<initialDateObj>(initialDateObj);
  const startDateRef = useRef<any>();
  const endDateRef = useRef<any>();

  const onSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };
  const onTextareaChange = (e: any) => {
    setTextarea(e.target.value);
  };
  const onAdd = () => {
    if (startDateRef.current.value === undefined) {
      const defaultParts = startDateRef.current.defaultParts;
      setStartDate({
        ampm: defaultParts.ampm,
        day: defaultParts.day,
        hour: defaultParts.hour,
        minute: defaultParts.minute,
        month: defaultParts.month,
        year: defaultParts.year,
      });
    }
    // if (endDateRef.current.value === undefined) {
    //   const defaultParts = endDateRef.current.defaultParts;
    //   setEndDate({
    //     ampm: defaultParts.ampm,
    //     day: defaultParts.day,
    //     hour: defaultParts.hour,
    //     minute: defaultParts.minute,
    //     month: defaultParts.month,
    //     year: defaultParts.year,
    //   });
    // }
    // calculateTime(startDate, endDate);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <WiseSaying></WiseSaying>
        <p className="custom-heading">공부시간 노트</p>
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
