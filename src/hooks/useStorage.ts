import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { getDate } from "../utils/getDate";
import { returnSaying } from "../utils/sayings";

const TODAY_KEY = "today";
const SAYING_KEY = "saying";

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [storedDay, setStoredDay] = useState();
  const [saying, setSaying] = useState();

  useEffect(() => {
    const initStorage = async () => {
      const newStore = new Storage({
        name: "check-study-time-db",
      });
      const store = await newStore.create();
      setStore(store);

      let storedToday = await store.get(TODAY_KEY);
      if (!storedToday) {
        await store.set(TODAY_KEY, getDate());
        storedToday = await store.get(TODAY_KEY);
      }
      setStoredDay(storedToday);

      let storedSaying = await store.get(SAYING_KEY);
      if (!storedSaying) {
        await store.set(SAYING_KEY, returnSaying());
        storedSaying = await store.get(SAYING_KEY);
      }
      setSaying(storedSaying);
    };
    initStorage();
  }, []);

  const getSaying = async () => {};

  return {
    store,
    storedDay,
    getSaying,
  };
};
