import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import lang from "@/settings/lang";
import "@/plugins/toast";

const axiosApi = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

const token = localStorage.getItem("token");
console.log("axios", token);
axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Vue.prototype.$http = axiosApi;
Vue.prototype.$lang = lang;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
