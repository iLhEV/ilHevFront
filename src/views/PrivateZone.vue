<template>
  <div>
    <v-card outlined>
      <v-card-text class="text-right">
        <a @click="logout">Logout</a>
      </v-card-text>
    </v-card>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { ROUTES } from "@/settings/routes";
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
    logout() {
      localStorage.removeItem("token");
      this.$router.push(ROUTES.HOME);
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
</style>
