<template>
  <v-list>
    <template v-if="articles.length">
      <v-list-item v-for="item in articles" :key="item.id">
        <v-list-item-avatar>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-html="item.text" />
        <v-list-item-action class="d-inline-block">
          <!--          <v-btn @click="editArticle(item)" icon>-->
          <!--            <v-icon size="20">mdi-pencil</v-icon>-->
          <!--          </v-btn>-->
          <!--          <v-btn @click="deleteArticle(item)" icon>-->
          <!--            <v-icon size="20">mdi-delete</v-icon>-->
          <!--          </v-btn>-->
        </v-list-item-action>
      </v-list-item>
    </template>
    <div v-else class="pt-3">
      {{ showLang("errors.noArticles") }}
    </div>
  </v-list>
</template>

<script>
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError } from "@/helpers/toasts";
import { lang, showLang } from "@/settings/lang";

export default {
  name: "ArticlesTab",
  data() {
    return {
      articles: [],
      lang,
      showLang,
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      const res = await apiRequest({ path: API_ROUTES.ARTICLES });
      if (res.success) {
        this.articles = res.data;
      } else {
        toastError(lang.GET_DATA_ERROR);
      }
    },
  },
};
</script>

<style scoped></style>
