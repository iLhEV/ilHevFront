<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="800"
    overlay-color="brown"
    overlay-opacity="0.95"
  >
    <v-card>
      <v-card-title> Add article </v-card-title>
      <v-card-text>
        <v-form> Add article form </v-form>
      </v-card-text>
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
  watch: {
    myValue(newVal) {
      this.$emit("update", newVal);
    },
  },
  methods: {},
};
</script>

<style scoped></style>
