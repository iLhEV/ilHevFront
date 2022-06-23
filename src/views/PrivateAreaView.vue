<template>
  <div>
    <v-card outlined>
      <v-card-text
        class="text-right d-flex justify-space-between navigation-area"
      >
        <a @click="goToPublicArea" class="ilhev-button">Public area</a>
        <RouterLink :to="PRIVATE_ROUTES.ARTICLES" class="ilhev-button"
          >Articles</RouterLink
        >
        <RouterLink :to="PRIVATE_ROUTES.MEETINGS" class="ilhev-button"
          >Встречи</RouterLink
        >
        <RouterLink :to="PRIVATE_ROUTES.CUSTOMERS" class="ilhev-button"
          >Клиенты</RouterLink
        >
        <a @click="logout" class="ilhev-button">Logout</a>
      </v-card-text>
    </v-card>
    <ArticleList v-if="tab === privateTabs.articles" />
    <MeetingsPrivate v-if="tab === privateTabs.meetings" />
    <CustomersPrivate v-if="tab === privateTabs.customers" />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { PRIVATE_ROUTES, ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import { toastSuccess } from "@/helpers/toasts";
import { lang } from "@/settings/lang";
import { privateDefaultTab, privateTabs } from "@/settings/tabs";
import MeetingsPrivate from "@/components/articles/MeetingsPrivate";
import CustomersPrivate from "@/components/customers/CustomersPrivate";
export default {
  name: "PrivateAreaView",
  components: { CustomersPrivate, MeetingsPrivate, ArticleList },
  data() {
    return {
      privateTabs,
      tab: privateDefaultTab,
      PRIVATE_ROUTES,
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
      toastSuccess(lang.RESULT_LOGOUT_SUCCESS);
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
