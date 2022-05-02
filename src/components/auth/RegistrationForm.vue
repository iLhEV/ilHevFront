<template>
  <div>
    <v-card-text class="pt-2 pr-7 pb-0">
      <v-form v-model="valid" ref="regForm">
        <v-list class="pt-0">
          <ol>
            <li>
              Add our
              <a :href="authorizeBotLink" target="_blank"> Telegram Bot</a>
              to your Telegram.
            </li>
            <li>
              Approve confirmation to open your Telegram. <br />Click
              <b>"Start"</b> in the opened chat.
            </li>
          </ol>
          <div class="pl-2 pt-1">
            <b>Note:</b> To login in the future just send <b>/login</b> command
            to the bot and you will get the login passphrase.
          </div>
        </v-list>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end pb-5 pr-5">
      <v-btn to="/login" color="green lighten-2" small depressed>
        Done. Login
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import apiRoutes from "@/settings/apiRoutes";
import Lang from "@/settings/lang";
import routes from "@/settings/routes";

export default {
  name: "RegistrationForm",
  data() {
    return {
      valid: true,
      regCode: "",
    };
  },
  computed: {
    authorizeBotLink() {
      return process.env.VUE_APP_AUTHORIZE_BOT_LINK;
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    async checkRegCode() {
      // TODO Implement sending reg code for the new bot users.
      // TODO Implement checking this code with one from the form above.
      if (!this.$refs.regForm.validate()) return;
      try {
        const res = await this.$http.get(
          `${apiRoutes.CHECK_PASSPHRASE}/${this.passPhrase}`
        );
        if (res.data?.success) {
          this.$toast.success(Lang.LOGIN_SUCCESSFULLY);
          await this.$router.push(routes.CABINET);
          return;
        }
      } catch (e) {
        // This planned to be empty
      }
      this.$toast.error(Lang.PASSPHRASE_IS_INVALID);
    },
  },
};
</script>

<style scoped>
.v-list li {
  padding-bottom: 7px;
}
</style>
