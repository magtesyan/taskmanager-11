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
  const {dueDate, description, color, isArchive, isFavorite, repeatingDays} = task;
  const {isDateShowing, activeRepeatingDays} = options;
  const isExpired = dueDate instanceof Date && dueDate < Date.now();

  const dateShowing = isDateShowing ? isDateShowing : !!dueDate;
  const date = (dateShowing && dueDate) ? formatDate(dueDate) : ``;
  const time = (dateShowing && dueDate) ? formatTime(dueDate) : ``;

  const repeatDays = activeRepeatingDays ? activeRepeatingDays : repeatingDays;
  const isRepeatingTask = Object.values(repeatDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {date, time, repeatClass, deadlineClass, isDateShowing, isRepeatingTask, description, color, isArchive, isFavorite, activeRepeatingDays};
};

export {getRandomArrayItem, getRandomDate, formatTime, calcTaskDetails};
