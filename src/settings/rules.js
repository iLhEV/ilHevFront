import { showLang } from "@/settings/lang";

export const RULES = {
  token(val) {
    return (val && val.length === 30) || showLang("errors.invalidToken");
  },
  name(val) {
    if (!val) {
      return showLang("errors.inputRequired");
    }
    if (val.length > 100) {
      return showLang("errors.inputTooLong");
    }
    return true;
  },
  price(val) {
    if (!val) {
      return showLang("errors.inputRequired");
    }
    if (val.length > 4) {
      return showLang("errors.inputTooLong");
    }
    return true;
  },
  currency(val) {
    if (!val) {
      return showLang("errors.inputRequired");
    }
    return true;
  },
};
