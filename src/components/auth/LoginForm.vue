<template>
  <v-form
    v-model="valid"
    ref="loginForm"
    class="pa-0 rounded-0"
    lazy-validation
  >
    <v-card-text>
      <v-btn
        @click="sendPassphrase"
        class="mt-1"
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
        label="Enter passphrase"
        class="pt-0 mt-0"
        :class="isPassphraseSent ? '' : 'd-none'"
        single-line
        required
      ></v-text-field>
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
        @click="close"
        class="mr-5"
        color="gray"
        width="100"
        depressed
        small
        >Close
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
        Login
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
      isPassphraseSent: false,
      rules: RULES,
      isPassphraseSending: false,
    };
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
          // TODO Possibly, I need to enable this toast in future
          this.$toast.success(Lang.LOGIN_SUCCESSFULLY);
          await this.$router.push(routes.CABINET);
          return;
        }
      } catch (e) {
        // This planned to be empty
      }
      this.$toast.error(Lang.PASSPHRASE_IS_INVALID);
    },
    close() {
      this.$emit("onFormClose");
    },
  },
};
</script>

<style scoped></style>
