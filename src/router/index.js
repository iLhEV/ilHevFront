import Vue from "vue";
import VueRouter from "vue-router";
import PublicAreaView from "@/views/PublicAreaView";
import { PRIVATE_ROUTES, ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import PrivateAreaView from "@/views/PrivateAreaView";
import HtmlExamples from "@/views/HtmlExamples";

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
    path: PRIVATE_ROUTES.ARTICLES,
    name: "privateArticles",
    component: PrivateAreaView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: PRIVATE_ROUTES.MEETINGS,
    name: "privateMeetings",
    component: PrivateAreaView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: PRIVATE_ROUTES.CUSTOMERS,
    name: "privateCustomers",
    component: PrivateAreaView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: ROUTES.HTML_EXAMPLES,
    name: "htmlExamples",
    component: HtmlExamples,
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
