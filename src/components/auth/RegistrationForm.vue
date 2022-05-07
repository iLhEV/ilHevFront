<template>
  <div>
    <v-card-text class="pt-2 pr-7 pb-0">
      <v-list class="pt-0">
        <ol>
          <li>
            Open
            <a :href="authorizeBotLink" target="_blank">AuthorizeTelegramBot</a>
            in your telegram application.
            <div class="ibv-small-caption mt-2">
              Approve confirmation to open your Telegram app/desktop if you were
              asked.
            </div>
          </li>
          <li class="mt-4">
            Click <b>"Start"</b> button in the opened chat to join the bot.
          </li>
        </ol>
        <div class="pl-2 mt-2">
          <b>Note:</b> To get one-time login token in the future just send
          <b>/login</b> command to the bot.
        </div>
      </v-list>
    </v-card-text>
    <v-card-actions class="justify-end pb-5 pr-5">
      <v-btn
        @click="closeDialog"
        class="mr-5"
        color="gray"
        width="140"
        depressed
        small
      >
        Close window
      </v-btn>
      <v-btn
        @click="backToLogin"
        color="green lighten-4"
        class="ibv-dimmed"
        width="140"
        small
        depressed
      >
        Back to login
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
      setTimeout(() => {
        this.$emit("openLogin");
      }, 500);
    },
    backToLogin() {
      this.$emit("openLogin");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/texts.scss";
</style>
