import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { getDate } from "../utils/getDate";
import { getSaying } from "../utils/getSaying";
import { star } from "ionicons/icons";

const TODAY_KEY = "today";
const SAYING_KEY = "saying";
const TODAYSTUDYTIME_KEY = "todayStudyTime";
const TODAYSTUDYRECORD_KEY = "todayStudyRecord";
const TODAYGOALTIME_KEY = "todayGoalTime";
const STUDYTIMES_KEY = "studyTimes";

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

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [day, setDay] = useState();
  const [saying, setSaying] = useState();
  const [todayStudyTime, setTodayStudyTime] = useState(0);
  const [todayGoalTime, setTodayGoalTime] = useState(0);
  const [todayStudyRecord, setTodayStudyRecord] = useState<studyRecord[]>([]);
  const [studyTimes, setStudyTimes] = useState<studyTimes>({});

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: "check-study-time-db",
      });
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
      console.log(storedStudyTimes);
      setStudyTimes(storedStudyTimes);
      await store?.set(STUDYTIMES_KEY, JSON.stringify(storedStudyTimes));
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
  };
};
