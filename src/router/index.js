import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage";
import { ROUTES } from "@/settings/routes";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME,
    name: "home",
    component: HomePage,
  },
  {
    path: ROUTES.PRIVATE_ZONE,
    name: "privateZone",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PrivateZone.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || "ilHeV - JS, Vue, React";
  });
});

export default router;
