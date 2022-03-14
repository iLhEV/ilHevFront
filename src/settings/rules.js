import Lang from "@/settings/lang";

export default {
  passPhrase(val) {
    return val && val.length === 30 || Lang.PASSPHRASE_IS_INVALID;
  }
}