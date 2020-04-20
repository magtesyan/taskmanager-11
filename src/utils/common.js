import {WEEKDAYS_COUNT, MONTH_NAMES} from "../const.js";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, WEEKDAYS_COUNT);
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const calcTaskDetails = (task) => {
  const {dueDate, repeatingDays, description, color, isArchive, isFavorite} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {date, time, repeatClass, deadlineClass, isDateShowing, isRepeatingTask, description, color, isArchive, isFavorite, repeatingDays};
};

export {getRandomArrayItem, getRandomDate, formatTime, calcTaskDetails};
