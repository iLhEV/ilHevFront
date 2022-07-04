<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="750"
    overlay-color="var(--v-overlay-base)"
    overlay-opacity="0.3"
    persistent
  >
    <v-form ref="form">
      <v-card class="pb-3">
        <v-card-title>
          {{
            id
              ? showLang("titles.articles.edit")
              : showLang("titles.articles.add")
          }}
        </v-card-title>
        <v-card-text class="pt-2">
          <v-form>
            <VueEditor v-model.trim="text" />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pr-6">
          <v-btn depressed small class="mr-5" @click="close">
            {{ showLang("buttons.close") }}
          </v-btn>
          <v-btn @click="save" color="primary" depressed small>{{
            showLang("buttons.save")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
export default {
  name: "ArticleCard",
  components: { VueEditor },
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      showLang,
      text: "",
    };
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getArticle(newVal);
        this.$emit("input", true);
      }
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.clean();
      this.$emit("update:id", null);
    },
    async save() {
      const res = await apiRequest({
        path: API_ROUTES.ARTICLE,
        method: "post",
        data: {
          id: this.id,
          text: this.text,
        },
      });
      if (res.success) {
        this.$emit("updateList");
        toastSuccess(
          this.id
            ? showLang("alerts.articles.editSuccess")
            : showLang("alerts.articles.addSuccess")
        );
        this.close();
      }
    },
    clean() {
      this.text = "";
    },
    async getArticle() {
      const res = await apiRequest({
        path: `${API_ROUTES.ARTICLE}/${this.id}`,
      });
      if (res.success) {
        this.text = res.data.text;
      } else {
        toastError(showLang("errors.unknown"));
      }
    },
  },
};
</script>

<style>
/*noinspection CssUnusedSymbol*/
.ql-syntax {
  background: lightslategray;
  padding: 15px 0 20px 15px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
