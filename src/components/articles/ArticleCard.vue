<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="750"
    overlay-color="brown"
    overlay-opacity="0.99"
    persistent
  >
    <v-card class="pb-3">
      <v-card-title> Add article </v-card-title>
      <v-card-text class="pt-2">
        <v-form>
          <VueEditor v-model.trim="text" />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pr-6">
        <v-btn depressed small class="mr-5" @click="close">Close</v-btn>
        <v-btn @click="save" depressed small>Save</v-btn>
      </v-card-actions>
    </v-card>
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
  },
  data() {
    return {
      text: "",
    };
  },
  watch: {},
  methods: {
    close() {
      this.$emit("input", false);
    },
    async save() {
      try {
        const res = await this.$http.post(`${apiRoutes.ARTICLE}`, {
          text: this.text,
        });
        if (res.data?.success) {
          // TODO Possibly, I need to enable this toast in future
          this.$toast.success(Lang.ARTICLE_CREATE_SUCCESS);
          this.$emit("input", false);
          return;
        }
      } catch (e) {
        this.$toast.error(Lang.UNKNOWN_ERROR);
      }
    },
  },
};
</script>

<style scoped></style>
