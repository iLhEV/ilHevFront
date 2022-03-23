<template>
  <v-card width="600" class="cabinet-page mx-auto" min-height="700">
    <v-card-title> Cabinet </v-card-title>
    <v-card-text>
      <v-btn @click="addArticle" small depressed>Add article</v-btn>
      <AddArticle v-model="showAddArticle" />
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
      showAddArticle: false,
      myVal: "",
    };
  },
  methods: {
    addArticle() {
      this.showAddArticle = true;
    },
    onCloseAddArticle(newVal) {
      console.log("newVal", newVal);
      this.showAddArticle = newVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
</style>
