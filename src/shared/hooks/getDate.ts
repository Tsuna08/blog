import { Timestamp } from "firebase/firestore";

const getFormatDate = (
  date: string | undefined | Date,
  options: Intl.DateTimeFormatOptions,
): string => new Date(String(date)).toLocaleDateString("ru-RU", options).replace(/\.|[гГ]/g, ".");

export const getShortDate = (date: string | undefined | Date): string =>
  getFormatDate(date, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

export const getShortDateTime = (date: string | undefined | Date): string =>
  getFormatDate(date, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const convertFromTimestamp = (date: Timestamp): string =>
  getFormatDate(date.toDate(), {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
