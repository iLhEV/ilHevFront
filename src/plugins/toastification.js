import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "bottom-right",
  timeout: 2200,
  transition: "Vue-Toastification__fade",
  hideProgressBar: true,
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  icon: false,
  maxToasts: 5,
  newestOnTop: false,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.content === toast.content).length !== 0) {
      return false;
    }
    return toast;
  },
};

Vue.use(Toast, toastOptions);
