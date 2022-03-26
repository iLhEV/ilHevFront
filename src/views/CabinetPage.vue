<template>
  <v-card width="600" class="cabinet-page mx-auto" min-height="700">
    <v-card-title> Cabinet </v-card-title>
    <v-card-text>
      <v-btn @click="addArticle" small depressed>Add article</v-btn>
      <AddArticle v-model="articleDialog" />
    </v-card-text>
  </v-card>
</template>

<script>
import AddArticle from "@/components/articles/AddArticle";
export default {
  name: "CabinetPage",
  components: { AddArticle },
  data() {
    return {
      articleDialog: false,
      myVal: "",
    };
  },
  methods: {
    addArticle() {
      this.articleDialog = true;
    },
    onCloseAddArticle(newVal) {
      console.log("newVal", newVal);
      this.articleDialog = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
</style>
