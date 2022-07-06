import { MAX_MEETING_PRICE } from "@/settings/prices";

export const langErrors = {
  unknown: {
    ru: "Неизвестная ошибка",
    en: "Unknown error",
  },
  getData: {
    ru: "Ошибка получения данных",
    en: "Error get data",
  },
  noArticles: {
    ru: "Список статей пуст",
    en: "Articles list is empty",
  },
  noMeetings: {
    ru: "Список встреч пуст",
    en: "Meetings list is empty",
  },
  noCustomers: {
    ru: "Список клиентов пуст",
    en: "Customers list is empty",
  },
  invalidToken: {
    ru: "Неправильный токен",
    en: "Token is invalid",
  },
  inputTooLong: {
    ru: "Слишком много символов",
    en: "Too many symbols",
  },
  meetingPriceTooBig: {
    ru: `Цена встречи не может быть больше ${MAX_MEETING_PRICE}`,
    en: `Price of meeting couldn't be more then ${MAX_MEETING_PRICE}`,
  },
  dayOfWeedRequired: {
    ru: "`День недели` обязателен к заполнению",
  },
  hourRequired: {
    ru: "`Час` обязателен к заполнению",
  },
  minuteRequired: {
    ru: "`Минута` обязательна к заполнению",
  },
  inputRequired: {
    ru: "Заполнение обязательно",
    en: "Input is required",
  },
  plsCheckFormInput: {
    ru: "Пожалуйста, проверьте поля формы",
    en: "Please, check form input",
  },
  notNumber: {
    ru: "Значение должно быть числом",
    en: "Value should be number",
  },
};
