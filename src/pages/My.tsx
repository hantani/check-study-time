import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useStorage } from "../hooks/useStorage";
import { studyTimes } from "../hooks/useStorage";
import { getYear } from "../utils/getDate";

const initialData = [
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
  { x: 5, y: 0 },
  { x: 6, y: 0 },
  { x: 7, y: 0 },
  { x: 8, y: 0 },
  { x: 9, y: 0 },
  { x: 10, y: 0 },
  { x: 11, y: 0 },
  { x: 12, y: 0 },
];

const style = {
  data: {
    stroke: "#3dc2ff",
  },
};

const calculateData = (studyTimes: studyTimes) => {
  const currentYear = getYear();

  for (const month in studyTimes[currentYear]) {
    const index = parseInt(month) - 1;
    let sum = 0;
    for (const day in studyTimes[currentYear][month]) {
      const dayArr = studyTimes[currentYear][month][day];
      dayArr.map((record) => {
        sum += record.time;
      });
    }
    initialData[index].y = sum;
  }
};

const My: React.FC = () => {
  const [data, setData] = useState(initialData);
  const { studyTimes } = useStorage();

  useEffect(() => {
    calculateData(studyTimes);
  }, []);

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
            <VictoryLine style={style} data={data} />
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
