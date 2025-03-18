export const getDate = (date: string | undefined | Date) =>
  new Date(String(date)).toLocaleDateString();
