import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useStorage } from "../hooks/useStorage";

const style = {
  data: {
    stroke: "#3dc2ff",
  },
};

const My: React.FC = () => {
  const { monthlyData, studyTimes } = useStorage();

  useEffect(() => {}, [studyTimes]);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="custom-year-bar">
          <p className="custom-heading">2024년 월별 공부기록</p>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
            <VictoryAxis dependentAxis />
            <VictoryLine style={style} data={monthlyData} />
          </VictoryChart>
        </div>
        <div className="custom-year-bar">
          <p className="custom-heading">2024년 4월 기록</p>
        </div>
      </IonContent>
    </>
  );
};

export default My;
