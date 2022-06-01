<template>
  <div>
    <v-card outlined>
      <v-card-text
        class="text-right d-flex justify-space-between navigation-area"
      >
        <a @click="goToPublicArea" class="ilhev-button">Public area</a>
        <a @click="logout" class="ilhev-button">Logout</a>
      </v-card-text>
    </v-card>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import { toastSuccess } from "@/helpers/toasts";
import { lang } from "@/settings/lang";
export default {
  name: "PrivateZone",
  components: { ArticleList },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["token"]),
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
</style>
