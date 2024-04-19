import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { getDate } from "../utils/getDate";
import { getSaying } from "../utils/getSaying";

const TODAY_KEY = "today";
const SAYING_KEY = "saying";
const TODAYSTUDYTIME_KEY = "todayStudyTime";
const TODAYSTUDYRECORD_KEY = "todayStudyRecord";

interface studyRecord {
  subject: string;
  text: string;
  time: number;
}

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [day, setDay] = useState();
  const [saying, setSaying] = useState();
  const [todayStudyTime, setTodayStudyTime] = useState(0);
  const [todayStudyRecord, setTodayStudyRecord] = useState<studyRecord[]>([]);

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
    if (info.time > 0) {
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
  };
};
