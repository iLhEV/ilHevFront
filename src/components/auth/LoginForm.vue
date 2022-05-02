<template>
  <v-form
    v-model="valid"
    ref="loginForm"
    class="pa-0 rounded-0"
    lazy-validation
    @submit.p.prevent
  >
    <v-card-text class="pt-0">
      <v-switch
        v-model="showInstructions"
        label="Show authorization instructions"
        class="mt-0"
      />
      <ol v-if="showInstructions" class="pt-0 mb-5">
        <li>
          Authorize with our
          <a :href="authorizeBotLink" target="_blank"
            >AuthorizationTelegramBot</a
          >
          by sending <b>/login</b> command.
          <div class="ibv-small-caption mt-2">
            See instructions how to add authorization bot on the
            <a @click="$emit('openRegistration')">registration</a> page.
          </div>
        </li>
        <li class="mt-4">Enter the received passphrase.</li>
      </ol>
      <v-btn
        v-if="!showEnterPassphrase"
        @click="enterPassphrase"
        class="mt-0 mb-1 d-block"
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
        label="Enter authorization passphrase"
        class="pt-0 mt-0 passphrase-input"
        :class="showEnterPassphrase ? '' : 'd-none'"
        single-line
        required
      ></v-text-field>
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

export default {
  name: "LoginForm",
  data() {
    return {
      valid: true,
      passPhrase: "",
      showEnterPassphrase: false,
      rules: RULES,
      isPassphraseSending: false,
      showInstructions: false,
    };
  },
  computed: {
    authorizeBotLink() {
      return process.env.VUE_APP_AUTHORIZE_BOT_LINK;
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

<style lang="scss" scoped>
@import "../../assets/scss/texts.scss";
::v-deep {
  .v-input--switch .v-label {
    font-size: 0.9em;
  }
}
.passphrase-input {
  max-width: 300px;
}
</style>
