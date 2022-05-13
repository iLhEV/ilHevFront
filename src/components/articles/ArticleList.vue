<template>
  <v-card width="600" class="cabinet-page mx-auto" min-height="700">
    <v-card-title> {{ $lang.TITLE_ARTICLES }} </v-card-title>
    <v-card-text>
      <v-btn @click="addArticle" small depressed>Add article</v-btn>
      <v-btn small depressed class="ml-5" @click="updateListManually"
        ><v-icon small>mdi-cached</v-icon></v-btn
      >
      <v-list>
        <template v-if="articles.length">
          <v-list-item v-for="item in articles" :key="item.id">
            <v-list-item-avatar>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-html="item.text" />
            <v-list-item-action class="d-inline-block">
              <v-btn @click="editArticle(item)" icon>
                <v-icon size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteArticle(item)" icon>
                <v-icon size="20">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <div v-else class="pt-3">
          {{ $lang.INFO_NO_ARTICLES }}
        </div>
      </v-list>
    </v-card-text>
    <ArticleCard
      v-model="articleDialog"
      :id.sync="editId"
      @updateList="updateList"
    />
    <ArticleDelete v-model="articleDelete" @updateList="updateList" />
  </v-card>
</template>

<script>
import ArticleCard from "@/components/articles/ArticleCard";
import ArticleDelete from "@/components/articles/ArticleDelete";
import Lang from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";

export default {
  name: "ArticleList",
  components: { ArticleCard, ArticleDelete },
  data() {
    return {
      articleDialog: false,
      articles: [],
      editId: null,
      articleDelete: null,
    };
  },
  async mounted() {
    await this.getArticles();
  },
  methods: {
    addArticle() {
      this.articleDialog = true;
    },
    async getArticles() {
      const res = await apiRequest({ path: API_ROUTES.ARTICLES });
      if (res.success) {
        this.articles = res.data;
      } else {
        toastError(Lang.GET_DATA_ERROR);
      }
    },
    updateList() {
      this.getArticles();
    },
    updateListManually() {
      this.updateList();
      toastSuccess(Lang.ARTICLES_LIST_UPDATED);
    },
    async editArticle(item) {
      this.editId = item.id;
    },
    async deleteArticle(item) {
      this.articleDelete = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
.v-list-item {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}
.v-list-item:first-child {
  border-top: 1px dashed #ddd;
  margin-top: 20px;
}
.v-list-item:last-child {
  border-bottom: 1px dashed #ddd;
  margin-top: 20px;
}
</style>
