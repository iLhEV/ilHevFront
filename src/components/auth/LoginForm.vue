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
        :label="
          showInstructions
            ? 'Authorization instructions are shown'
            : 'Authorization instructions are hidden'
        "
        class="mt-0"
      />
      <ol v-if="showInstructions" class="pt-0 mb-5">
        <li>
          Send <b>/login</b> command to
          <a :href="authorizeBotLink" target="_blank">AuthorizeTelegramBot</a>.
          <div class="ibv-small-caption mt-2">
            See instructions how to add authorization bot on the
            <a @click="$emit('openRegistration')">registration</a> page.
          </div>
        </li>
        <li class="mt-4">Enter the received authorization passphrase.</li>
      </ol>
      <v-btn
        v-if="!showEnterPassphrase"
        @click="enterPassphrase"
        class="mt-0 mb-1 d-block"
        color="blue lighten-3"
        small
        depressed
      >
        I'm ready to enter passphrase
      </v-btn>
      <v-text-field
        v-model="passPhrase"
        maxlength="30"
        :rules="[rules.passPhrase]"
        label="Authorization passphrase"
        class="pt-0 mt-0 passphrase-input"
        :class="showEnterPassphrase ? '' : 'd-none'"
        @input="startInput = true"
        single-line
        required
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="justify-end pb-5">
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
        :disabled="!valid || !startInput"
        color="green lighten-4"
        class="mr-4 ibv-dimmed"
        @click="checkPassphrase"
        width="140"
        depressed
        small
      >
        Authorize me
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
      startInput: false,
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
      setTimeout(() => {
        this.showEnterPassphrase = false;
        this.showInstructions = false;
        this.passPhrase = "";
        this.$refs.loginForm.resetValidation();
      }, 500);
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
