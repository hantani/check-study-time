import { IonText } from "@ionic/react";
import React, { memo } from "react";

const WiseSaying = memo(({ saying }: { saying: string | undefined }) => {
  return (
    <>
      <p className="custom-heading">오늘의 명언</p>
      <p className="custom-saying">{saying}</p>
    </>
  );
});

export default WiseSaying;
