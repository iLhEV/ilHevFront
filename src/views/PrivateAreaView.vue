<template>
  <div>
    <v-card outlined>
      <v-card-text
        class="text-right d-flex justify-space-between navigation-area"
      >
        <a @click="goToPublicArea" class="ilhev-button">Public area</a>
        <a @click="goToArticlesPrivate" class="ilhev-button">Articles</a>
        <a @click="goToMeetingsPrivate" class="ilhev-button">Meetings</a>
        <a @click="logout" class="ilhev-button">Logout</a>
      </v-card-text>
    </v-card>
    <ArticleList v-if="tab === privateTabs.articles" />
    <MeetingsPrivate v-if="tab === privateTabs.meetings" />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import { toastSuccess } from "@/helpers/toasts";
import { lang } from "@/settings/lang";
import { privateDefaultTab, privateTabs } from "@/settings/tabs";
import MeetingsPrivate from "@/components/articles/MeetingsPrivate";
export default {
  name: "PrivateAreaView",
  components: { MeetingsPrivate, ArticleList },
  data() {
    return {
      privateTabs,
      tab: privateDefaultTab,
      ROUTES,
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
  mounted() {},
  methods: {
    goToPublicArea() {
      this.$router.push(ROUTES.HOME);
    },
    goToMeetingsPrivate() {
      if (this.$route.fullPath !== ROUTES.PRIVATE_MEETINGS) {
        this.$router.push(ROUTES.PRIVATE_MEETINGS);
      }
    },
    goToArticlesPrivate() {
      if (this.$route.fullPath !== ROUTES.PRIVATE_ARTICLES) {
        this.$router.push(ROUTES.PRIVATE_ARTICLES);
      }
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
</style>
