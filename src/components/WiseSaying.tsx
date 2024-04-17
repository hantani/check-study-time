import React, { useEffect, useState } from "react";
import { getDate } from "../utils/getDate";
import { useStorage } from "../hooks/useStorage";
import "./WiseSaying.css";

const WiseSaying: React.FC = () => {
  const { saying } = useStorage();

  return (
    <>
      <p className="custom-heading">오늘의 명언</p>
      <p className="custom-saying">{saying}</p>
    </>
  );
};

export default WiseSaying;
