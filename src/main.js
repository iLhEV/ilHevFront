import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lang from "@/settings/lang";
import "@/plugins/toastification";
import "@/assets/scss/toasts.scss";

Vue.prototype.$lang = lang;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
