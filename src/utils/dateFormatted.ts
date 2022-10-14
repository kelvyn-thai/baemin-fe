import dayjs from "dayjs";

export const dateFormatted = (date: string) =>
  dayjs(date).format("DD/MM/YYYY-hh:mm a");
