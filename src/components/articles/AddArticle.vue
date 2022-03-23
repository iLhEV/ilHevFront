<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="750"
    overlay-color="brown"
    overlay-opacity="0.99"
    persistent
  >
    <v-card class="pb-3 pr-2">
      <v-card-title> Add article </v-card-title>
      <v-card-text>
        <v-form>
          <v-textarea rows="10" class="pt-0" />
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn depressed small class="mr-5" @click="close">Close</v-btn>
        <v-btn depressed small>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddArticle",
  props: {
    value: Boolean,
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped></style>
