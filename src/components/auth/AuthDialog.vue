<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="450"
    v-model="showDialog"
    overlay-color="brown"
    overlay-opacity="0.95"
    persistent
  >
    <v-card>
      <v-card-title class="pb-3 d-block">
        <div>
          {{ mode === modes.login ? $lang.TITLE_LOGIN : "" }}
          {{ mode === modes.registration ? $lang.TITLE_REGISTER : "" }}
        </div>
        <div class="register-link">
          or&nbsp;
          <a v-if="mode === modes.login" @click="openRegistration">
            {{ $lang.TITLE_REGISTER.toLowerCase() }}
          </a>
          <a v-if="mode === modes.registration" @click="openLogin">
            {{ $lang.TITLE_LOGIN.toLowerCase() }}
          </a>
        </div>
      </v-card-title>
      <div class="pl-2">
        <LoginForm v-if="mode === modes.login" @closeDialog="closeDialog" />
        <RegistrationForm
          v-if="mode === modes.registration"
          @backToLogin="openLogin"
          @closeDialog="closeDialog"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import LoginForm from "@/components/auth/LoginForm";
import RegistrationForm from "@/components/auth/RegistrationForm";

const MODES = { login: "login", registration: "registration" };

export default {
  name: "AuthDialog",
  components: { LoginForm, RegistrationForm },
  props: {
    show: Boolean,
  },
  data() {
    return {
      showDialog: false,
      modes: MODES,
      mode: MODES.login,
    };
  },
  mounted() {},
  computed: {},
  watch: {
    show(val) {
      this.showDialog = val;
    },
  },
  methods: {
    openRegistration() {
      this.mode = MODES.registration;
    },
    openLogin() {
      this.mode = MODES.login;
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.register-link {
  line-height: 10px;
  font-size: 12px !important;
}
</style>
