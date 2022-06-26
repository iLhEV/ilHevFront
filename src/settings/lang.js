import { langButtons } from "@/settings/lang/langButtons";
import { langAlerts } from "@/settings/lang/langAlerts";
import { langTitles } from "@/settings/lang/langTitles";
import { langErrors } from "@/settings/lang/langErrors";
import { langMenus } from "@/settings/lang/langMenus";

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
  const [group, object, name, subName] = address.split(".");
  let translation = "";
  if (
    translations[group] &&
    translations[group][object] &&
    translations[group][object][name] &&
    translations[group][object][name][subName] &&
    translations[group][object][name][subName][lang]
  ) {
    translation = translations[group][object][name][subName][lang];
  } else if (
    translations[group] &&
    translations[group][object] &&
    translations[group][object][name] &&
    translations[group][object][name][lang]
  ) {
    translation = translations[group][object][name][lang];
  } else if (
    translations[group] &&
    translations[group][object] &&
    translations[group][object][lang]
  ) {
    translation = translations[group][object][lang];
  } else if (translation[group] && translation[group][lang]) {
    translation = translation[group][lang];
  }

  if (!translation) {
    console.error("Error: translation not found", address);
    return "translation_not_found";
  } else {
    return translation;
  }
};
