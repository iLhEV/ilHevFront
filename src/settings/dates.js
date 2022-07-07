export const daysOfWeek = [
  { name: 1, rusName: "Пн" },
  { name: 2, rusName: "Вт" },
  { name: 3, rusName: "Ср" },
  { name: 4, rusName: "Чт" },
  { name: 5, rusName: "Пт" },
  { name: 6, rusName: "Сб" },
  { name: 0, rusName: "Вс" },
];

export const meetingHours = [
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];

export const meetingMinutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

export const periodVariants = [{ value: 7, text: "Ближайшие 7 дней" }];

export const defaultPeriodVariant = periodVariants.find((el) => el.value === 7);
