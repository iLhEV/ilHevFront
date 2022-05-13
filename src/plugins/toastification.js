import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "top-right",
  timeout: 1700,
  transition: "Vue-Toastification__fade",
  hideProgressBar: true,
  closeButton: false,
  closeOnClick: false,
  draggable: false,
  icon: false,
  maxToasts: 5,
  newestOnTop: false,
  filterToasts: (toasts) => {
    // Keep track of existing types
    // const texts = {};
    let lastText = null;
    return toasts.reduce((aggToasts, toast) => {
      if (!lastText) {
        lastText = toast.content;
        aggToasts.push(toast);
      }
      if (lastText && lastText !== toast.content) {
        lastText = toast.content;
        aggToasts.push(toast);
      }

      // console.log(toast);
      // // Check if type was not seen before
      // if (!texts[toast.content]) {
      //
      //   texts[toast.content] = true;
      // }
      return aggToasts;
    }, []);
  },
};

Vue.use(Toast, toastOptions);
