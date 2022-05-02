<template>
  <div>
    <v-card-text class="pt-2 pr-7 pb-0">
      <v-list class="pt-0">
        <ol>
          <li>
            Add our
            <a :href="authorizeBotLink" target="_blank"
              >Authorization Telegram Bot</a
            >
            to your telegram application.
            <div class="ibv-small-caption mt-2">
              If you are asked, approve confirmation to open your Telegram
              app/desktop.
            </div>
          </li>
          <li class="mt-4">Click <b>"Start"</b> in the opened chat.</li>
        </ol>
        <div class="pl-2 mt-2">
          <b>Note:</b> To get login passphrase in the future just send
          <b>/login</b> command.
        </div>
      </v-list>
    </v-card-text>
    <v-card-actions class="justify-end pb-5 pr-5">
      <v-btn @click="backToLogin" color="green lighten-2" small depressed>
        Done, Login
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  data() {
    return {
      valid: true,
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
    backToLogin() {
      this.$emit("backToLogin");
    },
  },
};
</script>
<style scoped>
@import "~/src/assets/scss/texts.scss";
</style>
