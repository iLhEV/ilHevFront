<template>
  <v-dialog v-model="isShow" max-width="800">
    <v-card>
      <v-card-title>
        Add article
      </v-card-title>
      <v-card-text>
        <v-form>
          Add article form
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddArticle",
  props: {
    show: Boolean,
  },
  data() {
    return {
      isShow: false,
    }
  },
  watch: {
    show() {
      this.isShow = this.show;
    },
    isShow(newVal) {

      !newVal && this.$emit('onClose');
    }
  }
}
</script>

<style scoped>

</style>