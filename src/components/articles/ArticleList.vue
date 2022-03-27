<template>
  <v-card width="600" class="cabinet-page mx-auto" min-height="700">
    <v-card-title> {{ $lang.TITLE_ARTICLES }} </v-card-title>
    <v-card-text>
      <v-btn @click="addArticle" small depressed>Add article</v-btn>
      <v-btn small depressed class="ml-5" @click="update"
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
      :id.sync="operationId"
      @update="update"
    />
  </v-card>
</template>

<script>
import ArticleCard from "@/components/articles/ArticleCard";
import apiRoutes from "@/settings/apiRoutes";
import Lang from "@/settings/lang";
export default {
  name: "ArticleList",
  components: { ArticleCard },
  data() {
    return {
      articleDialog: false,
      articles: [],
      operationId: null,
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
      try {
        const res = await this.$http.get(`${apiRoutes.ARTICLES}`);
        if (res.data?.success) {
          this.articles = res.data.data;
        } else {
          this.$toast.error(Lang.UNKNOWN_ERROR);
        }
      } catch (e) {
        this.$toast.error(Lang.GET_DATA_ERROR);
      }
    },
    update() {
      this.getArticles();
    },
    async deleteArticle(item) {
      this.operationId = item.id;
    },
    async editArticle(item) {
      this.operationId = item.id;
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
