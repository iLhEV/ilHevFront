<template>
  <v-dialog
    max-width="490"
    v-model="showDialog"
    overlay-color="var(--v-overlay-base)"
    overlay-opacity="0.3"
    persistent
  >
    <v-card>
      <v-card-title class="pb-3 d-block">
        <div>
          {{ mode === modes.login ? "Log-in" : "" }}
          {{ mode === modes.registration ? showLang("titles.register") : "" }}
        </div>
        <div class="register-link">
          or&nbsp;
          <a v-if="mode === modes.login" @click="openRegistration">
            {{ showLang("titles.register").toLowerCase() }}
          </a>
          <a v-if="mode === modes.registration" @click="openLogin">
            {{ showLang("titles.login").toLowerCase() }}
          </a>
        </div>
      </v-card-title>
      <div class="pl-2">
        <LoginForm
          v-if="mode === modes.login"
          @closeDialog="closeDialog"
          @openRegistration="openRegistration"
        />
        <RegistrationForm
          v-if="mode === modes.registration"
          @openLogin="openLogin"
          @closeDialog="closeDialog"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import LoginForm from "@/components/auth/LoginForm";
import RegistrationForm from "@/components/auth/RegistrationForm";
import { showLang } from "@/settings/lang";

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
      showLang,
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
