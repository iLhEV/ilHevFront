import { langButtons } from "@/settings/lang/langButtons";
import { langAlerts } from "@/settings/lang/langAlerts";
import { langTitles } from "@/settings/lang/langTitles";
import { langErrors } from "@/settings/lang/langErrors";
import { langMenus } from "@/settings/lang/langMenus";

export const lang = {
  TOKEN_IS_INVALID: "Token is invalid.",
  RESULT_LOGIN_SUCCESS: "You were logged in.",
  RESULT_LOGOUT_SUCCESS: "You were logged out.",
  ARTICLE_CREATE_SUCCESS: "The article was created.",
  ARTICLE_UPDATE_SUCCESS: "The article was saved.",
  ARTICLE_DELETE_SUCCESS: "The article was deleted.",
  ARTICLES_LIST_UPDATED: "Articles were updated.",
  CUSTOMER_CREATE_SUCCESS: "Информация о клиенте успешно добавлена.",
  CUSTOMER_UPDATE_SUCCESS: "Информация о клиенте успешно сохранена.",
  CUSTOMER_DELETE_SUCCESS: "Информация о клиенте успешно удалена.",
  CUSTOMER_LIST_UPDATED: "Список клиентов успешно обновлён.",
  UNKNOWN_ERROR: "Unknown error.",
  GET_DATA_ERROR: "Error get data.",
  TITLE_ARTICLES: "Articles.",
  TITLE_MEETINGS: "Встречи.",
  TITLE_CUSTOMERS: "Клиенты.",
  TITLE_LOGIN: "Login.",
  TITLE_REGISTER: "Register.",
  INFO_NO_ARTICLES: "No articles yet.",
  INFO_NO_CUSTOMERS: "Список клиентов пуст.",
  TITLE_ADD_ARTICLE: "Add article.",
  TITLE_EDIT_ARTICLE: "Edit article.",
  TITLE_DELETE_ARTICLE: "Delete article.",
  TITLE_ADD_MEETING: "Запланировать встречу.",
  TITLE_EDIT_MEETING: "Редактировать встречу.",
  TITLE_ADD_CUSTOMER: "Добавить клиента.",
  TITLE_EDIT_CUSTOMER: "Редактировать клиента.",
  TITLE_DELETE_CUSTOMER: "Удалить информацию о клиенте.",
  TITLE_DELETE_MEETING: "Удалить встречу.",
  BUTTON_CLOSE: "Close",
  BUTTON_SAVE: "Save",
  BUTTON_DELETE: "Delete",
  BUTTON_LOGIN: "Login",
  BUTTON_REGISTER: "Register",
  BUTTON_ENTER_REGISTRATION_CODE: "Enter registration code",
};

const translations = {
  alerts: langAlerts,
  buttons: langButtons,
  titles: langTitles,
  errors: langErrors,
  menus: langMenus,
};

export const showLang = (address) => {
  let lang = window.localStorage.getItem("lang");
  if (!lang) {
    lang = "en";
  }
  const [group, object, name, subname] = address.split(".");
  let translation = "";
  if (
    translations[group] &&
    translations[group][object] &&
    translations[group][object][name] &&
    translations[group][object][name][subname]
  ) {
    translation = translations[group][object][name][subname][lang];
  } else if (group && object && name) {
    translation = translations[group][object][name][lang];
  } else if (group && object) {
    translation = translations[group][object][lang];
  } else {
    translation = translation[group][lang];
  }

  if (!translation) {
    return "translation_not_found";
  } else {
    return translation;
  }
};

console.log(showLang("errors.unknown"));
