import { showLang } from "@/settings/lang";
import { MAX_MEETING_PRICE } from "@/settings/prices";

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
    if (typeof val !== "number") {
      return showLang("errors.notNumber");
    }
    if (val > MAX_MEETING_PRICE) {
      return showLang("errors.meetingPriceTooBig");
    }
    return true;
  },
  currency(val) {
    if (!val) {
      return showLang("errors.inputRequired");
    }
    return true;
  },
  dayOfWeek(val) {
    if (val === "") {
      return showLang("errors.dayOfWeedRequired");
    }
    return true;
  },
  hour(val) {
    if (!val) {
      return showLang("errors.hourRequired");
    }
    return true;
  },
  minute(val) {
    if (!val) {
      return showLang("errors.minuteRequired");
    }
    return true;
  },
};
