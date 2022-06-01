import { lang } from "@/settings/lang";

export default {
  token(val) {
    return (val && val.length === 30) || lang.TOKEN_IS_INVALID;
  },
};
