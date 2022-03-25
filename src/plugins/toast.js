import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "top-center",
  timeout: 1650,
};

Vue.use(Toast, toastOptions);
