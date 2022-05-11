<template>
  <v-dialog
    v-model="dialog"
    @input="$emit('input', $event)"
    max-width="450"
    overlay-color="brown"
    overlay-opacity="0.99"
    persistent
  >
    <v-card v-if="article">
      <v-card-title>
        {{ $lang.TITLE_DELETE_ARTICLE }}
      </v-card-title>
      <v-card-text>
        <div class="highlighted-black">
          Are you sure you want to delete article with id = {{ article.id }}?
        </div>
        <v-expansion-panels v-model="showText" class="mt-5" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>Article text</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-html="article.text" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pr-6 pb-4">
        <v-btn depressed small class="mr-5" @click="close">{{
          $lang.BUTTON_CLOSE
        }}</v-btn>
        <v-btn @click="deleteArticle" color="error" depressed small>{{
          $lang.BUTTON_DELETE
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Lang from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";

export default {
  name: "DeleteDelete",
  data() {
    return {
      dialog: false,
      showText: [0],
    };
  },
  model: {
    prop: "article",
  },
  props: {
    article: Object,
  },
  watch: {
    article(newVal) {
      if (newVal) {
        this.dialog = true;
      }
    },
  },
  methods: {
    close() {
      this.$emit("input", null);
      this.dialog = false;
    },
    async deleteArticle() {
      const res = await apiRequest({
        path: `${API_ROUTES.ARTICLE}/${this.article.id}`,
        method: "delete",
      });
      if (res.data?.success) {
        this.$emit("updateList");
        this.$toast.success(Lang.ARTICLE_DELETE_SUCCESS);
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.highlighted-black {
  color: black;
}
</style>
