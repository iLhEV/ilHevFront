import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import lang from "@/settings/lang";
import "@/plugins/toast";

const base = axios.create({
  baseURL: "http://localho.st:3040",
  // baseURL: "https://ilya-bear-app.herokuapp.com",
});

Vue.prototype.$http = base;
Vue.prototype.$lang = lang;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
