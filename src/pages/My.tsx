import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { useStorage } from "../hooks/useStorage";
import { getMonth, getYear } from "../utils/getDate";

const style = {
  data: {
    stroke: "#3dc2ff",
  },
};

const comparisonComponent = (time: number) => {
  if (time > 0) {
    return <p>저번달 보다 {time}시간 공부 더 하셨어요</p>;
  } else if (time < 0) {
    const convertedTime = Math.abs(time);
    return <p>저번달 보다 {convertedTime}시간 공부 덜 하셨어요</p>;
  }
};

const My: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(getYear);
  const [currentMonth, setCurrentMonth] = useState(getMonth);
  const { dailyAverage, monthlyData, monthlyAverage, comparisonTime } =
    useStorage();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="custom-year-bar">
          <p className="custom-heading">{currentYear}년 월별 공부기록</p>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
            <VictoryAxis dependentAxis />
            <VictoryLine style={style} data={monthlyData} />
          </VictoryChart>
          <div className="custom-average">
            <p>
              <span className="custom-title">월별 평균 공부시간:</span>
              <span>{monthlyAverage}</span>
            </p>
            <p>
              <span className="custom-title">
                {currentMonth}월달 일별 평균 공부시간:
              </span>
              <span>{dailyAverage}</span>
            </p>
            {comparisonTime !== 0 && comparisonComponent(comparisonTime)}
          </div>
        </div>
      </IonContent>
    </>
  );
};

export default My;
