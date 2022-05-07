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
        <li class="mt-4">Enter the received one-time authorization token.</li>
      </ol>
      <v-btn
        v-if="!showEnterToken"
        @click="enterToken"
        class="mt-0 mb-1 d-block"
        color="blue lighten-3"
        small
        depressed
      >
        I'm ready to enter one-time token
      </v-btn>
      <v-text-field
        v-model="token"
        maxlength="30"
        :rules="[rules.token]"
        label="Authorization one-time token"
        class="pt-0 mt-0 token-input"
        :class="showEnterToken ? '' : 'd-none'"
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
        @click="checkToken"
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
      token: "",
      showEnterToken: false,
      rules: RULES,
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
    async enterToken() {
      this.showEnterToken = true;
    },
    async checkToken() {
      if (!this.$refs.loginForm.validate()) return;
      try {
        const res = await this.$http.post(`${apiRoutes.AUTH}/${this.token}`);
        if (res.data?.success) {
          this.$toast.success(Lang.LOGIN_SUCCESSFULLY);
          await this.$router.push(routes.CABINET);
          return;
        }
      } catch (e) {
        // This planned to be empty
      }
      this.$toast.error(Lang.TOKEN_IS_INVALID);
    },
    closeDialog() {
      this.$emit("closeDialog");
      setTimeout(() => {
        this.showEnterToken = false;
        this.showInstructions = false;
        this.token = "";
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
.token-input {
  max-width: 300px;
}
</style>
