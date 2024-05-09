import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import WiseSaying from "../components/WiseSaying";
import { useStorage } from "../hooks/useStorage";
import TodayStudyRecord from "../components/TodayStudyRecord";
import TodayStudyTime from "../components/TodayStudyTime";
import Form from "../components/Form";
import React, { useRef, useReducer, useEffect } from "react";
import { reducer, initialDateObj } from "../reducer/dateReducer";

const Note: React.FC = () => {
  const {
    todayStudyTime,
    todayStudyRecord,
    todayGoalTime,
    addTodayGoalTime,
    addTodayStudyTime,
    addTodayStudyRecord,
    addStudyTimes,
  } = useStorage();
  const isMounted = useRef(false);
  const startDateRef = useRef<any>();
  const endDateRef = useRef<any>();
  const subjectRef = useRef<any>();
  const textAreaRef = useRef<any>();
  const [state, dispatch] = useReducer(reducer, initialDateObj);

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
    if (isMounted.current && state.resultTime > 0) {
      const newStudyRecord = {
        subject: subjectRef.current.value,
        text: textAreaRef.current.value,
        time: state.resultTime,
      };
      subjectRef.current.value = "";
      textAreaRef.current.value = "";
      addTodayStudyTime(state.resultTime);
      addTodayStudyRecord(newStudyRecord);
      addStudyTimes(state, newStudyRecord);
      console.log(todayStudyTime, todayStudyRecord);
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
        <Form
          startDateRef={startDateRef}
          endDateRef={endDateRef}
          subjectRef={subjectRef}
          textAreaRef={textAreaRef}
          warning={state.warning}
          onAdd={onAdd}
        />
        <p className="custom-heading">공부시간 기록</p>
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
