import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { getDate } from "../utils/getDate";
import { getSaying } from "../utils/getSaying";

const TODAY_KEY = "today";
const SAYING_KEY = "saying";
const TODAYSTUDYTIME_KEY = "todayStudyTime";

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [day, setDay] = useState();
  const [saying, setSaying] = useState();
  const [todayStudyTime, setTodayStudyTime] = useState();

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
      if (!storedTodayStudyTime) {
        await store.set(TODAYSTUDYTIME_KEY, 0);
        storedTodayStudyTime = await store.get(TODAYSTUDYTIME_KEY);
      }
      console.log(storedTodayStudyTime);
      setTodayStudyTime(storedTodayStudyTime);
    };
    initStorage();
  }, []);

  const addTodayStudyTime = async (time: any) => {
    setTodayStudyTime((prevState) => prevState + time);
    const storedTodayStudyTime = await store?.get(TODAYSTUDYTIME_KEY);
    await store?.set(TODAYSTUDYTIME_KEY, storedTodayStudyTime + time);
  };

  return {
    store,
    day,
    saying,
    todayStudyTime,
    addTodayStudyTime,
  };
};
