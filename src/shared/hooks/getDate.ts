const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const getDate = (date: string | undefined | Date): string =>
  new Date(String(date)).toLocaleDateString("ru-RU", options).replace(/\.|[гГ]/g, "");
