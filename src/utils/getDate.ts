export const getDate = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();
  let month: number | string = today.getMonth() + 1;
  const year = today.getFullYear();
  let date: number | string = today.getDate();
  const day = days[today.getDay()];

  if (month < 10) {
    month = "0" + month;
  }

  if (date < 10) {
    date = "0" + date;
  }

  return `${year}-${month}-${date}`;
};
