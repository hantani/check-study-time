export const initialDateObj = {
  day: "",
  month: "",
  year: "",
  resultTime: 0,
  warning: false,
};

export const stringToObj = (dateString: string) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(5, 7);
  const day = dateString.substring(8, 10);
  const hour = dateString.substring(11, 13);
  const minute = dateString.substring(14, 16);

  return {
    day,
    hour,
    minute,
    month,
    year,
  };
};

const calulateTime = (startDate: any, endDate: any) => {
  const startDateObj = new Date(
    `${startDate.year}/${startDate.month}/${startDate.day} ${startDate.hour}:${startDate.minute}:00`
  );
  const endDateObj = new Date(
    `${endDate.year}/${endDate.month}/${endDate.day} ${endDate.hour}:${endDate.minute}:00`
  );
  const diff = endDateObj.getTime() - startDateObj.getTime();
  let diffMinute = Math.ceil(diff / (60 * 1000)) / 60;
  if (diffMinute <= 0) {
    return false;
  }
  return parseFloat(diffMinute.toFixed(1));
};

export const reducer = (state: any, action: any) => {
  let startDate;
  let endDate;
  let resultTime;
  switch (action.type) {
    case "BOTH_DEFAULT":
      return {
        ...state,
        day: action.defaultParts.day,
        month: action.defaultParts.month,
        year: action.defaultParts.year,
        warning: true,
      };
    case "STARTDATE_DEFAULT":
      startDate = {
        day: action.defaultParts.day,
        hour: action.defaultParts.hour,
        minute: action.defaultParts.minute,
        month: action.defaultParts.month,
        year: action.defaultParts.year,
      };
      endDate = stringToObj(action.endDateValue);
      resultTime = calulateTime(startDate, endDate);
      if (!resultTime) {
        return {
          day: "",
          month: "",
          year: "",
          resultTime: 0,
          warning: true,
        };
      }
      return {
        day: endDate.day,
        month: endDate.month,
        year: endDate.year,
        resultTime,
        warning: false,
      };
    case "ENDDATE_DEFAULT":
      endDate = {
        day: action.defaultParts.day,
        hour: action.defaultParts.hour,
        minute: action.defaultParts.minute,
        month: action.defaultParts.month,
        year: action.defaultParts.year,
      };
      startDate = stringToObj(action.startDateValue);
      resultTime = calulateTime(startDate, endDate);
      if (!resultTime) {
        return {
          day: "",
          month: "",
          year: "",
          resultTime: 0,
          warning: true,
        };
      }
      return {
        day: endDate.day,
        month: endDate.month,
        year: endDate.year,
        resultTime,
        warning: false,
      };
    case "BOTH_VALUE":
      startDate = stringToObj(action.startDateValue);
      endDate = stringToObj(action.endDateValue);
      resultTime = calulateTime(startDate, endDate);
      if (!resultTime) {
        return {
          day: "",
          month: "",
          year: "",
          resultTime: 0,
          warning: true,
        };
      }
      return {
        day: endDate.day,
        month: endDate.month,
        year: endDate.year,
        resultTime,
        warning: false,
      };
    default:
      return state;
  }
};
