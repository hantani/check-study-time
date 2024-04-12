export const getDate = () => {
  const today = new Date();
  let month: number | string = today.getMonth() + 1;
  const year = today.getFullYear();
  let date: number | string = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (date < 10) {
    date = "0" + date;
  }

  return `${year}-${month}-${date}`;
};
