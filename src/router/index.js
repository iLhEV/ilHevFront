import Vue from "vue";
import VueRouter from "vue-router";
import PublicAreaView from "@/views/PublicAreaView";
import { ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.HOME,
    name: "home",
    component: PublicAreaView,
  },
  {
    path: ROUTES.WORK_PLACES,
    name: "workPlaces",
    component: PublicAreaView,
  },
  {
    path: ROUTES.ARTICLES,
    name: "articles",
    component: PublicAreaView,
  },
  {
    path: ROUTES.PRIVATE_ZONE,
    name: "privateArea",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PrivateAreaView.vue"),
    meta: { requireAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
  if (
    to.meta?.requireAuth &&
    !localStorage.getItem(LOCAL_STORAGE_TOKEN_FIELD)
  ) {
    return next(ROUTES.HOME);
  }
  return next();
});

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || "iL'hEV - JS, Vue, React";
  });
});

export default router;
