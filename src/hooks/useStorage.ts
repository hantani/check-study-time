import { useEffect, useState } from "react";
import { Drivers, Storage } from "@ionic/storage";
import { getDate, getMonth } from "../utils/getDate";
import { getSaying } from "../utils/getSaying";
import { getYear } from "../utils/getDate";
import cordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const TODAY_KEY = "today";
const SAYING_KEY = "saying";
const TODAYSTUDYTIME_KEY = "todayStudyTime";
const TODAYSTUDYRECORD_KEY = "todayStudyRecord";
const TODAYGOALTIME_KEY = "todayGoalTime";
const STUDYTIMES_KEY = "studyTimes";
const MONTHLYDATA_KEY = "monthlyData";
const MONTHLYAVERAGE_KEY = "monthlyAverage";
const DAILYAVERAGE_KEY = "dailyAverage";
const COMPARISONTIME_KEY = "comparisonTime";

export interface studyRecord {
  subject: string;
  text: string;
  time: number;
}

export interface state {
  day: string;
  month: string;
  resultTime: number;
  warning: boolean;
  year: string;
}

interface dayObj {
  [day: string]: studyRecord[];
}

interface yearObj {
  [month: string]: dayObj;
}

export interface studyTimes {
  [year: string]: yearObj;
}

interface monthlyData {
  x: number;
  y: number;
}

const initialMonthlyData = [
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

const calculateDailyAverage = (studyTimes: studyTimes) => {
  const currentYear = getYear();
  const currentMonth = getMonth();
  const dailyTimes: number[] = [];
  let average = 0;
  let dailySum = 0;

  for (const day in studyTimes[currentYear][currentMonth]) {
    let sum = 0;
    const dayArr = studyTimes[currentYear][currentMonth][day];
    dayArr.map((record) => {
      sum += record.time;
    });
    dailyTimes.push(sum);
  }

  dailyTimes.map((elem) => {
    dailySum += elem;
  });
  average = dailySum / dailyTimes.length;
  average = parseFloat(average.toFixed(1));

  return average;
};

const calculateMonthlyData = (studyTimes: studyTimes) => {
  const currentYear = getYear();
  const newData = initialMonthlyData;

  for (const month in studyTimes[currentYear]) {
    const index = parseInt(month) - 1;
    let sum = 0;
    for (const day in studyTimes[currentYear][month]) {
      const dayArr = studyTimes[currentYear][month][day];
      dayArr.map((record) => {
        sum += record.time;
      });
    }
    newData[index].y = sum;
  }

  return newData;
};

const calculateMonthlyAverage = (newData: monthlyData[]) => {
  const montlyTimes: number[] = [];
  let sum = 0;
  let average = 0;

  newData.map((elem) => {
    if (elem.y > 0) {
      montlyTimes.push(elem.y);
    }
  });

  montlyTimes.map((elem) => {
    sum += elem;
  });
  average = sum / montlyTimes.length;
  average = parseFloat(average.toFixed(1));

  return average;
};

const calculateComparison = (newData: monthlyData[]) => {
  const currentMonth = getMonth();
  const index = parseInt(currentMonth) - 1;

  if (currentMonth === "01") {
    return;
  }
  const comparisonTime = newData[index].y - newData[index - 1].y;

  return comparisonTime;
};

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [day, setDay] = useState();
  const [saying, setSaying] = useState();
  const [todayStudyTime, setTodayStudyTime] = useState(0);
  const [todayGoalTime, setTodayGoalTime] = useState(0);
  const [todayStudyRecord, setTodayStudyRecord] = useState<studyRecord[]>([]);
  const [studyTimes, setStudyTimes] = useState<studyTimes>({});
  const [monthlyData, setMonthlyData] =
    useState<monthlyData[]>(initialMonthlyData);
  const [monthlyAverage, setMonthlyAverage] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);
  const [comparisonTime, setComparisonTime] = useState(0);

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: "check-study-time-db",
        driverOrder: [
          cordovaSQLiteDriver._driver,
          Drivers.IndexedDB,
          Drivers.LocalStorage,
          // CordovaSQLiteDriver._driver,
          // Drivers.IndexedDB,
          // Drivers.LocalStorage,
        ],
      });
      await newStore.defineDriver(cordovaSQLiteDriver);

      const store = await newStore.create();
      setStore(store);

      let dayChanged = false;
      const todayDate = getDate();
      let storedToday = await store.get(TODAY_KEY);
      if (!storedToday) {
        await store.set(TODAY_KEY, todayDate);
        storedToday = await store.get(TODAY_KEY);
      }
      if (todayDate !== storedToday) {
        await store.set(TODAY_KEY, todayDate);
        storedToday = await store.get(TODAY_KEY);
        dayChanged = true;
      }
      setDay(storedToday);

      let wiseSaying = getSaying(null);
      let storedSaying = await store.get(SAYING_KEY);
      if (!storedSaying) {
        await store.set(SAYING_KEY, wiseSaying);
        storedSaying = await store.get(SAYING_KEY);
      }
      if (dayChanged) {
        wiseSaying = getSaying(storedSaying);
        await store.set(SAYING_KEY, wiseSaying);
        storedSaying = await store.get(SAYING_KEY);
      }
      setSaying(storedSaying);

      let storedTodayStudyTime = await store.get(TODAYSTUDYTIME_KEY);
      if (!storedTodayStudyTime || dayChanged) {
        await store.set(TODAYSTUDYTIME_KEY, 0);
        storedTodayStudyTime = await store.get(TODAYSTUDYTIME_KEY);
      }
      setTodayStudyTime(storedTodayStudyTime);

      let storedTodayStudyRecord = await store.get(TODAYSTUDYRECORD_KEY);
      if (!storedTodayStudyRecord || dayChanged) {
        await store.set(TODAYSTUDYRECORD_KEY, JSON.stringify([]));
        storedTodayStudyRecord = await store.get(TODAYSTUDYRECORD_KEY);
      }
      storedTodayStudyRecord = JSON.parse(storedTodayStudyRecord);
      setTodayStudyRecord(storedTodayStudyRecord);

      let storedTodayGoalTime = await store.get(TODAYGOALTIME_KEY);
      if (!storedTodayGoalTime || dayChanged) {
        await store.set(TODAYGOALTIME_KEY, null);
        storedTodayGoalTime = await store.get(TODAYGOALTIME_KEY);
      }
      setTodayGoalTime(storedTodayGoalTime);

      let storedStudyTimes = await store.get(STUDYTIMES_KEY);
      if (!storedStudyTimes) {
        await store.set(STUDYTIMES_KEY, JSON.stringify({}));
        storedStudyTimes = await store.get(STUDYTIMES_KEY);
      }
      storedStudyTimes = JSON.parse(storedStudyTimes);
      setStudyTimes(storedStudyTimes);

      let storedMonthlyData = await store.get(MONTHLYDATA_KEY);
      if (!storedMonthlyData) {
        await store.set(MONTHLYDATA_KEY, JSON.stringify(initialMonthlyData));
        storedMonthlyData = await store.get(MONTHLYDATA_KEY);
      }
      storedMonthlyData = JSON.parse(storedMonthlyData);
      setMonthlyData(storedMonthlyData);

      let storedMonthlyAverage = await store.get(MONTHLYAVERAGE_KEY);
      if (!storedMonthlyAverage) {
        await store.set(MONTHLYAVERAGE_KEY, 0);
        storedMonthlyAverage = await store.get(MONTHLYAVERAGE_KEY);
      }
      setMonthlyAverage(storedMonthlyAverage);

      let storedDailyAverage = await store.get(DAILYAVERAGE_KEY);
      if (!storedDailyAverage) {
        await store.set(DAILYAVERAGE_KEY, 0);
        storedDailyAverage = await store.get(DAILYAVERAGE_KEY);
      }
      setDailyAverage(storedDailyAverage);

      let storedComparisonTime = await store.get(COMPARISONTIME_KEY);
      if (!storedComparisonTime) {
        await store.set(COMPARISONTIME_KEY, 0);
        storedComparisonTime = await store.get(COMPARISONTIME_KEY);
      }
      setComparisonTime(storedComparisonTime);
    };

    initStorage();
  }, []);

  const addTodayStudyTime = async (time: number) => {
    setTodayStudyTime((prevState) => {
      return prevState + time;
    });
    let storedTodayStudyTime = await store?.get(TODAYSTUDYTIME_KEY);
    storedTodayStudyTime = parseFloat(storedTodayStudyTime);
    await store?.set(TODAYSTUDYTIME_KEY, storedTodayStudyTime + time);
  };

  const addTodayStudyRecord = async (info: studyRecord) => {
    setTodayStudyRecord((prevState) => [...prevState, info]);
    let storedTodayStudyRecord = await store?.get(TODAYSTUDYRECORD_KEY);
    if (storedTodayStudyRecord && storedTodayStudyRecord !== undefined) {
      storedTodayStudyRecord = JSON.parse(storedTodayStudyRecord);
      storedTodayStudyRecord.push(info);
      await store?.set(
        TODAYSTUDYRECORD_KEY,
        JSON.stringify(storedTodayStudyRecord)
      );
    }
  };

  const addTodayGoalTime = async (time: number) => {
    setTodayGoalTime(time);
    await store?.set(TODAYGOALTIME_KEY, time);
  };

  const addStudyTimes = async (state: state, newStudyRecord: any) => {
    let storedStudyTimes = await store?.get(STUDYTIMES_KEY);
    storedStudyTimes = JSON.parse(storedStudyTimes);

    let newObj;
    let newMonthlyData;
    let newMonthlyAverage;
    let newDailyAverage;
    let newComparisonTime;
    const yearObj = storedStudyTimes[state.year];
    if (!yearObj) {
      newObj = {
        ...storedStudyTimes,
        [state.year]: {
          [state.month]: {
            [state.day]: [newStudyRecord],
          },
        },
      };
      storedStudyTimes = newObj;
      setStudyTimes(storedStudyTimes);
      await store?.set(STUDYTIMES_KEY, JSON.stringify(storedStudyTimes));
      newMonthlyData = calculateMonthlyData(newObj);
      setMonthlyData(newMonthlyData);
      await store?.set(MONTHLYDATA_KEY, JSON.stringify(newMonthlyData));
      newMonthlyAverage = calculateMonthlyAverage(newMonthlyData);
      setMonthlyAverage(newMonthlyAverage);
      await store?.set(MONTHLYAVERAGE_KEY, newMonthlyAverage);
      newDailyAverage = calculateDailyAverage(newObj);
      setDailyAverage(newDailyAverage);
      await store?.set(DAILYAVERAGE_KEY, newDailyAverage);
      newComparisonTime = calculateComparison(newMonthlyData);
      if (newComparisonTime) {
        setComparisonTime(newComparisonTime);
        await store?.set(COMPARISONTIME_KEY, newComparisonTime);
      }
      return;
    }

    const monthObj = storedStudyTimes[state.year][state.month];
    if (!monthObj) {
      newObj = {
        ...storedStudyTimes,
        [state.year]: {
          ...storedStudyTimes[state.year],
          [state.month]: {
            [state.day]: [newStudyRecord],
          },
        },
      };
      storedStudyTimes = newObj;
      setStudyTimes(storedStudyTimes);
      await store?.set(STUDYTIMES_KEY, JSON.stringify(storedStudyTimes));
      newMonthlyData = calculateMonthlyData(newObj);
      setMonthlyData(newMonthlyData);
      await store?.set(MONTHLYDATA_KEY, JSON.stringify(newMonthlyData));
      newMonthlyAverage = calculateMonthlyAverage(newMonthlyData);
      setMonthlyAverage(newMonthlyAverage);
      await store?.set(MONTHLYAVERAGE_KEY, newMonthlyAverage);
      calculateDailyAverage(newObj);
      newDailyAverage = calculateDailyAverage(newObj);
      setDailyAverage(newDailyAverage);
      await store?.set(DAILYAVERAGE_KEY, newDailyAverage);
      newComparisonTime = calculateComparison(newMonthlyData);
      if (newComparisonTime) {
        setComparisonTime(newComparisonTime);
        await store?.set(COMPARISONTIME_KEY, newComparisonTime);
      }
      return;
    }

    const dayObj = storedStudyTimes[state.year][state.month][state.day];
    if (!dayObj) {
      newObj = {
        ...storedStudyTimes,
        [state.year]: {
          ...storedStudyTimes[state.year],
          [state.month]: {
            ...storedStudyTimes[state.year][state.month],
            [state.day]: [newStudyRecord],
          },
        },
      };
      storedStudyTimes = newObj;
      setStudyTimes(storedStudyTimes);
      await store?.set(STUDYTIMES_KEY, JSON.stringify(storedStudyTimes));
      newMonthlyData = calculateMonthlyData(newObj);
      setMonthlyData(newMonthlyData);
      await store?.set(MONTHLYDATA_KEY, JSON.stringify(newMonthlyData));
      newMonthlyAverage = calculateMonthlyAverage(newMonthlyData);
      setMonthlyAverage(newMonthlyAverage);
      await store?.set(MONTHLYAVERAGE_KEY, newMonthlyAverage);
      calculateDailyAverage(newObj);
      newDailyAverage = calculateDailyAverage(newObj);
      setDailyAverage(newDailyAverage);
      await store?.set(DAILYAVERAGE_KEY, newDailyAverage);
      newComparisonTime = calculateComparison(newMonthlyData);
      if (newComparisonTime) {
        setComparisonTime(newComparisonTime);
        await store?.set(COMPARISONTIME_KEY, newComparisonTime);
      }
      return;
    }

    newObj = {
      ...storedStudyTimes,
      [state.year]: {
        ...storedStudyTimes[state.year],
        [state.month]: {
          ...storedStudyTimes[state.year][state.month],
          [state.day]: [
            ...storedStudyTimes[state.year][state.month][state.day],
            newStudyRecord,
          ],
        },
      },
    };
    storedStudyTimes = newObj;
    setStudyTimes(storedStudyTimes);
    await store?.set(STUDYTIMES_KEY, JSON.stringify(storedStudyTimes));
    newMonthlyData = calculateMonthlyData(newObj);
    setMonthlyData(newMonthlyData);
    await store?.set(MONTHLYDATA_KEY, JSON.stringify(newMonthlyData));
    newMonthlyAverage = calculateMonthlyAverage(newMonthlyData);
    setMonthlyAverage(newMonthlyAverage);
    await store?.set(MONTHLYAVERAGE_KEY, newMonthlyAverage);
    calculateDailyAverage(newObj);
    newDailyAverage = calculateDailyAverage(newObj);
    setDailyAverage(newDailyAverage);
    await store?.set(DAILYAVERAGE_KEY, newDailyAverage);
    newComparisonTime = calculateComparison(newMonthlyData);
    if (newComparisonTime) {
      setComparisonTime(newComparisonTime);
      await store?.set(COMPARISONTIME_KEY, newComparisonTime);
    }
  };

  return {
    store,
    day,
    saying,
    todayStudyTime,
    addTodayStudyTime,
    todayStudyRecord,
    addTodayStudyRecord,
    todayGoalTime,
    addTodayGoalTime,
    studyTimes,
    addStudyTimes,
    monthlyData,
    monthlyAverage,
    dailyAverage,
    comparisonTime,
  };
};
