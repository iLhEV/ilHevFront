import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "bottom-center",
  timeout: 5000,
  transition: "Vue-Toastification__fade",
  hideProgressBar: true,
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  icon: false,
  maxToasts: 3,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      return false;
    }
    return toast;
  },
};

Vue.use(Toast, toastOptions);
