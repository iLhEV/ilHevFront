import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import "@/plugins/toast";

const base = axios.create({
  baseURL: "http://localho.st:3040",
});

Vue.prototype.$http = base;
Vue.$http = base;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
