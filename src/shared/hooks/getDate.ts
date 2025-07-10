import { Timestamp } from "firebase/firestore";

const getFormatDate = (
  date: string | undefined | Date,
  options: Intl.DateTimeFormatOptions,
): string => new Date(String(date)).toLocaleDateString("ru-RU", options).replace(/\.|[гГ]/g, "");

export const getShortDate = (date: string | undefined | Date): string =>
  getFormatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const getDate = (date: Date | Timestamp): any => {
  console.log("date: ", date);
  new Date(String(date))
    .toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(/\.|[гГ]/g, "");
};
