import { showLang } from "@/settings/lang";

export default {
  token(val) {
    return (val && val.length === 30) || showLang("errors.invalidToken");
  },
};
