<template>
  <div>
    <v-card-text class="pt-2 pr-7 pb-0">
      <v-list class="pt-0">
        <ol>
          <li>
            Add our
            <a :href="authorizeBotLink" target="_blank"
              >Authorize My Site Bot</a
            >
            to your Telegram.
            <div class="custom-caption">
              If you are asked, approve confirmation to open your Telegram.
            </div>
          </li>
          <li>Click <b>"Start"</b> in the opened chat.</li>
        </ol>
        <div class="pl-2 pt-1">
          <b>Note:</b> To login in the future just send <b>/login</b> command to
          the bot and you will get the login passphrase.
        </div>
      </v-list>
    </v-card-text>
    <v-card-actions class="justify-end pb-5 pr-5">
      <v-btn @click="backToLogin" color="green lighten-2" small depressed>
        Done. Login
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
.v-list li {
  padding-bottom: 10px;
}
.custom-caption {
  font-size: 0.95em;
  font-style: italic;
}
</style>
