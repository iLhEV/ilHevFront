import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import lang from "@/settings/lang";
import "@/plugins/toast";

const base = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

Vue.prototype.$http = base;
Vue.prototype.$lang = lang;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
