<template>
  <v-card width="750" class="articles-list mx-auto" min-height="700">
    <v-card-title>{{ lang.TITLE_MEETINGS }} </v-card-title>
    <v-card-text>
      <v-btn @click="addMeeting" small depressed color="#C5E1A5" class="px-4"
        >Создать</v-btn
      >
      <v-btn
        small
        depressed
        color="#EFEBE9"
        class="ml-5 px-0"
        @click="updateListManually"
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
          {{ lang.INFO_NO_ARTICLES }}
        </div>
      </v-list>
    </v-card-text>
    <MeetingCard
      v-model="meetingDialog"
      :id.sync="editId"
      @updateList="updateList"
    />
    <ArticleDelete v-model="articleDelete" @updateList="updateList" />
  </v-card>
</template>

<script>
import ArticleDelete from "@/components/articles/ArticleDelete";
import { lang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
import MeetingCard from "@/components/meetings/MeetingCard";

export default {
  name: "MeetingsPrivate",
  components: { MeetingCard, ArticleDelete },
  data() {
    return {
      meetingDialog: false,
      articles: [],
      editId: null,
      articleDelete: null,
      lang,
    };
  },
  async mounted() {
    await this.getArticles();
  },
  methods: {
    addMeeting() {
      this.meetingDialog = true;
    },
    async getArticles() {
      const res = await apiRequest({ path: API_ROUTES.ARTICLES });
      if (res.success) {
        this.articles = res.data;
      } else {
        toastError(lang.GET_DATA_ERROR);
      }
    },
    updateList() {
      this.getArticles();
    },
    updateListManually() {
      this.updateList();
      toastSuccess(lang.ARTICLES_LIST_UPDATED);
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
.articles-list {
  margin-top: 70px;
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
