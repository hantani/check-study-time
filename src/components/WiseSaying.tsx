import React, { useEffect, useState } from "react";
import { getDate } from "../utils/getDate";
import { useStorage } from "../hooks/useStorage";

const WiseSaying: React.FC = () => {
  const { storedDay } = useStorage();
  const [today, setToday] = useState(getDate);
  //   useEffect(() => {
  //     setSaying(returnSaying);
  //   }, [storedDay !== today]);
  return (
    <>
      <p>오늘의 명언</p>
    </>
  );
};

export default WiseSaying;
