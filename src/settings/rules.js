import Lang from "@/settings/lang";

export default {
  token(val) {
    return (val && val.length === 30) || Lang.TOKEN_IS_INVALID;
  },
};
