<template>
  <div>
    <v-card outlined>
      <v-card-text
        class="text-right d-flex justify-space-between navigation-area"
      >
        <a @click="goToPublicArea" class="ilhev-button font-weight-bold">{{
          showLang("menus._private.top.publicArea")
        }}</a>
        <RouterLink :to="PRIVATE_ROUTES.ARTICLES" class="ilhev-button">{{
          showLang("menus._private.top.articles")
        }}</RouterLink>
        <RouterLink :to="PRIVATE_ROUTES.MEETINGS" class="ilhev-button">{{
          showLang("menus._private.top.meetings")
        }}</RouterLink>
        <RouterLink :to="PRIVATE_ROUTES.CUSTOMERS" class="ilhev-button">{{
          showLang("menus._private.top.customers")
        }}</RouterLink>
        <a @click="logout" class="ilhev-button font-weight-bold">{{
          showLang("menus._private.top.logout")
        }}</a>
      </v-card-text>
    </v-card>
    <ArticleList v-if="tab === privateTabs.articles" />
    <MeetingsPrivate v-if="tab === privateTabs.meetings" />
    <Customers v-if="tab === privateTabs.customers" />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { PRIVATE_ROUTES, ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import { toastSuccess } from "@/helpers/toasts";
import { showLang } from "@/settings/lang";
import { privateDefaultTab, privateTabs } from "@/settings/tabs";
import MeetingsPrivate from "@/components/articles/MeetingsPrivate";
import Customers from "@/components/customers/Customers";
export default {
  name: "PrivateAreaView",
  components: { Customers, MeetingsPrivate, ArticleList },
  data() {
    return {
      privateTabs,
      tab: privateDefaultTab,
      PRIVATE_ROUTES,
      showLang,
    };
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  watch: {
    $route(to) {
      this.tab = to.name;
    },
  },
  beforeMount() {
    const currentRouteName = this.$router.currentRoute.name;
    if (
      Object.keys(this.privateTabs).find(
        (el) => this.privateTabs[el] === currentRouteName
      )
    ) {
      this.tab = currentRouteName;
    }
  },
  mounted() {},
  methods: {
    goToPublicArea() {
      this.$router.push(ROUTES.HOME);
    },
    logout() {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_FIELD);
      this.$router.push(ROUTES.HOME);
      toastSuccess(showLang("alerts.auth.logoutSuccess"));
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
.navigation-area {
  min-height: 55px;
}
a {
  text-decoration: none !important;
}
</style>
