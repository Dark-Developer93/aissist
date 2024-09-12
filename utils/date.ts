export const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const getStartOfDay = (date: Date = new Date()): number => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start.valueOf();
};

export const getEndOfDay = (date: Date = new Date()): number => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end.valueOf();
};
