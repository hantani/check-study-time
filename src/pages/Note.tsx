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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import "./Note.css";
import { useState, useRef, useReducer, useEffect } from "react";
import WiseSaying from "../components/WiseSaying";
import { reducer, initialDateObj } from "../reducer/dateReducer";
import { useStorage } from "../hooks/useStorage";
import TodayStudyRecord from "../components/TodayStudyRecord";
import TodayStudyTime from "../components/TodayStudyTime";

const Note: React.FC = () => {
  const [subject, setSubject] = useState();
  const [textarea, setTextarea] = useState();
  const startDateRef = useRef<any>();
  const endDateRef = useRef<any>();
  const subjectRef = useRef<any>();
  const textAreaRef = useRef<any>();
  const [state, dispatch] = useReducer(reducer, initialDateObj);
  const {
    todayStudyTime,
    addTodayStudyTime,
    todayStudyRecord,
    addTodayStudyRecord,
    todayGoalTime,
    addTodayGoalTime,
  } = useStorage();
  const isMounted = useRef(false);

  const onSubjectChange = (e: any) => {
    setSubject(e.target.value);
  };
  const onTextareaChange = (e: any) => {
    setTextarea(e.target.value);
  };
  const onAdd = () => {
    if (
      startDateRef.current.value === undefined &&
      endDateRef.current.value === undefined
    ) {
      const defaultParts = startDateRef.current.defaultParts;
      dispatch({ type: "BOTH_DEFAULT", defaultParts });
    }
    if (
      startDateRef.current.value === undefined &&
      endDateRef.current.value !== undefined
    ) {
      const defaultParts = startDateRef.current.defaultParts;
      const endDateValue = endDateRef.current.value;
      dispatch({ type: "STARTDATE_DEFAULT", defaultParts, endDateValue });
    }
    if (
      startDateRef.current.value !== undefined &&
      endDateRef.current.value === undefined
    ) {
      const defaultParts = endDateRef.current.defaultParts;
      const startDateValue = startDateRef.current.value;
      dispatch({ type: "ENDDATE_DEFAULT", defaultParts, startDateValue });
    }
    if (
      startDateRef.current.value !== undefined &&
      endDateRef.current.value !== undefined
    ) {
      const startDateValue = startDateRef.current.value;
      const endDateValue = endDateRef.current.value;
      dispatch({ type: "BOTH_VALUE", startDateValue, endDateValue });
    }
  };
  useEffect(() => {
    if (isMounted.current) {
      addTodayStudyTime(state.resultTime);
      const newStudyRecord = {
        subject: subjectRef.current.value,
        text: textAreaRef.current.value,
        time: state.resultTime,
      };
      subjectRef.current.value = "";
      textAreaRef.current.value = "";
      addTodayStudyRecord(newStudyRecord);
    } else {
      isMounted.current = true;
    }
  }, [state]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <WiseSaying></WiseSaying>
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
        {state.warning === true && (
          <p className="custom-warning">
            시간 입력이 잘못되었습니다 다시 입력해주세요
          </p>
        )}
        <div className="custom-btn-wrapper">
          <IonButton color="primary" onClick={onAdd}>
            추가하기
          </IonButton>
        </div>
        <TodayStudyRecord todayStudyRecord={todayStudyRecord} />
        <TodayStudyTime
          todayStudyTime={todayStudyTime}
          todayGoalTime={todayGoalTime}
          addTodayGoalTime={addTodayGoalTime}
        />
      </IonContent>
    </>
  );
};

export default Note;
