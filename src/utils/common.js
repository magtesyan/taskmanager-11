import {WEEKDAYS_COUNT} from "../const.js";
import moment from "moment";

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

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const calcTaskDetails = (task, options) => {
  const {dueDate, description, color, isArchive, isFavorite} = task;
  const {isDateShowing, activeRepeatingDays, currentDescription, isRepeatingTask, externalData} = options;
  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());

  const dateShowing = isDateShowing ? isDateShowing : !!dueDate;
  const date = (dateShowing && dueDate) ? formatDate(dueDate) : ``;
  const time = (dateShowing && dueDate) ? formatTime(dueDate) : ``;

  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {date, time, repeatClass, deadlineClass, isDateShowing, isRepeatingTask, description, color, isArchive, isFavorite, activeRepeatingDays, currentDescription, externalData};
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

export {getRandomArrayItem, getRandomDate, formatTime, calcTaskDetails, isRepeating, isOverdueDate, isOneDay};
