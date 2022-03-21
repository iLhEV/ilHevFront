<template>
  <v-card width="600" class="cabinet-page mx-auto" min-height="700">
    <v-card-title>
      Cabinet
    </v-card-title>
    <v-card-text>
      <v-btn @click="addArticle" @onClose="onCloseAddArticle" small depressed>Add article</v-btn>
      <AddArticle :show="showAddArticle"/>
    </v-card-text>
  </v-card>
</template>

<script>
import AddArticle from "@/components/articles/AddArticle";
export default {
  name: "CabinetPage",
  components: {AddArticle},
  data() {
    return {
      showAddArticle: false,
    }
  },
  methods: {
    addArticle() {
      this.showAddArticle = true;
    },
    onCloseAddArticle() {
      this.showAddArticle = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
</style>