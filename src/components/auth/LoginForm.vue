<template>
  <v-form
    v-model="valid"
    ref="loginForm"
    class="pa-0 rounded-0"
    lazy-validation
    @submit.p.prevent
  >
    <v-card-text class="pt-2">
      <ol class="pt-0">
        <li>
          Authorize with our
          <a :href="authorizeBotLink" target="_blank"
            >Authorization Telegram Bot</a
          >
          by sending <b>/login</b> command.
          <div class="ibv-small-caption mt-2">
            See instructions how to add authorization bot on the
            <a @click="true">registration</a> page.
          </div>
        </li>
        <li class="mt-4">
          Enter the received passphrase.
          <v-btn
            v-if="!showEnterPassphrase"
            @click="enterPassphrase"
            class="mt-2 mb-1 d-block"
            color="blue lighten-3"
            small
            depressed
          >
            Enter passphrase
          </v-btn>
          <v-text-field
            v-model="passPhrase"
            maxlength="30"
            :rules="[rules.passPhrase]"
            label="Passphrase"
            class="pt-4 mt-0 mr-10"
            :class="showEnterPassphrase ? '' : 'd-none'"
            single-line
            required
          ></v-text-field>
        </li>
      </ol>
    </v-card-text>
    <v-card-actions class="justify-end pb-5">
      <v-btn
        @click="closeDialog"
        class="mr-5"
        color="gray"
        width="100"
        depressed
        small
      >
        {{ $lang.BUTTON_CLOSE }}
      </v-btn>
      <v-btn
        :disabled="!valid || !showEnterPassphrase"
        color="success"
        class="mr-4"
        @click="checkPassphrase"
        width="100"
        depressed
        small
      >
        {{ $lang.BUTTON_LOGIN }}
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import RULES from "@/settings/rules";
import apiRoutes from "@/settings/apiRoutes";
import Lang from "@/settings/lang";
import routes from "@/settings/routes";

const INITIAL_TIMER_COUNT = 30;

export default {
  name: "LoginForm",
  data() {
    return {
      valid: true,
      passPhrase: "",
      showEnterPassphrase: false,
      rules: RULES,
      isPassphraseSending: false,
      timerCount: null,
    };
  },
  beforeCreate() {
    this.timerCount = INITIAL_TIMER_COUNT;
  },
  computed: {
    authorizeBotLink() {
      return process.env.VUE_APP_AUTHORIZE_BOT_LINK;
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    async enterPassphrase() {
      this.showEnterPassphrase = true;
    },
    async checkPassphrase() {
      if (!this.$refs.loginForm.validate()) return;
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
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
@import "~/src/assets/scss/texts.scss";
</style>
