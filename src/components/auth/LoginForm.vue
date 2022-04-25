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
        <li>Send passphrase to our authorize bot.</li>
        <li>Enter the received passphrase.</li>
      </ol>
      <v-btn
        @click="sendPassphrase"
        class="mt-4 mb-1"
        :class="isPassphraseSent || isPassphraseSending ? 'd-none' : ''"
        color="primary"
        small
        depressed
      >
        Send passphrase
      </v-btn>
      <v-text-field
        v-model="passPhrase"
        maxlength="30"
        :rules="[rules.passPhrase]"
        label="Enter received passphrase"
        class="pt-4 mt-0"
        :class="isPassphraseSent ? '' : 'd-none'"
        single-line
        required
      ></v-text-field>
      <div v-if="isPassphraseSent" class="resend-passphrase">
        <span v-if="timerCount > 0">Resend in {{ timerCount }} seconds</span>
        <a v-if="timerCount < 1" @click="resendPassphrase">Resend passphrase</a>
      </div>
      <v-progress-circular
        color="primary"
        size="26"
        class="mt-1"
        :class="isPassphraseSending ? '' : 'd-none'"
        indeterminate
      ></v-progress-circular>
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
        :disabled="!valid || !isPassphraseSent"
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
      isPassphraseSent: false,
      rules: RULES,
      isPassphraseSending: false,
      timerCount: null,
    };
  },
  beforeCreate() {
    this.timerCount = INITIAL_TIMER_COUNT;
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
    async sendPassphrase() {
      try {
        this.isPassphraseSending = true;
        const res = await this.$http.get(apiRoutes.CREATE_PASSPHRASE);
        if (res.data?.success) {
          this.isPassphraseSent = true;
          this.isPassphraseSending = false;
          this.$toast.success(Lang.PASSPHRASE_WAS_SENT_SUCCESSFULLY);
          this.timerCount = INITIAL_TIMER_COUNT;
          return;
        }
      } catch (e) {
        // This planned to be empty
      }
      this.isPassphraseSending = false;
      this.$toast.error(Lang.ERROR_WHEN_TRY_TO_SEND_PASSPHRASE);
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
    async resendPassphrase() {
      console.log("resend");
      await this.sendPassphrase();
    },
  },
};
</script>

<style scoped>
.resend-passphrase {
  font-size: 12px;
}
</style>
