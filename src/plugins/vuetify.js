import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        overlay: "#f9fbe7",
        chocolate: "#8d6e63",
      },
    },
  },
});
