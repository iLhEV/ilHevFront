<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="750"
    overlay-color="brown"
    overlay-opacity="0.99"
    persistent
  >
    <v-form ref="form">
      <v-card class="pb-3">
        <v-card-title>
          {{ id ? $lang.TITLE_EDIT_ARTICLE : $lang.TITLE_ADD_ARTICLE }}
        </v-card-title>
        <v-card-text class="pt-2">
          <v-form>
            <VueEditor v-model.trim="text" />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pr-6">
          <v-btn depressed small class="mr-5" @click="close">
            {{ $lang.BUTTON_CLOSE }}
          </v-btn>
          <v-btn @click="save" color="primary" depressed small>{{
            $lang.BUTTON_SAVE
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
import apiRoutes from "@/settings/apiRoutes";
import Lang from "@/settings/lang";
export default {
  name: "AddArticle",
  components: { VueEditor },
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
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
      try {
        const res = await this.$http.post(`${apiRoutes.ARTICLE}`, {
          id: this.id,
          text: this.text,
        });
        if (res.data?.success) {
          this.$emit("updateList");
          this.$toast.success(
            this.id ? Lang.ARTICLE_UPDATE_SUCCESS : Lang.ARTICLE_CREATE_SUCCESS
          );
          this.close();
        }
      } catch (e) {
        this.$toast.error(Lang.UNKNOWN_ERROR);
      }
    },
    clean() {
      this.text = "";
    },
    async getArticle() {
      try {
        const res = await this.$http.get(`${apiRoutes.ARTICLE}/${this.id}`);
        if (res.data?.success) {
          this.text = res.data.data.text;
        } else {
          this.$toast.error(Lang.UNKNOWN_ERROR);
        }
      } catch (e) {
        this.$toast.error(Lang.GET_DATA_ERROR);
      }
    },
  },
};
</script>

<style>
.ql-syntax {
  background: lightslategray;
  padding: 15px 0 20px 15px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
