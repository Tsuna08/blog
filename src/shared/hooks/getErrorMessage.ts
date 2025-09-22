import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
): string => {
  if (!error) return "";

  if ("status" in error) {
    return `Ошибка ${error.status}: ${JSON.stringify(error.data)}`;
  }

  return error.message || "Неизвестная ошибка";
};
