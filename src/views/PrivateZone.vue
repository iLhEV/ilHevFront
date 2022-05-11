<template>
  <div>
    <div>{{ this.token }}</div>
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
export default {
  name: "PrivateZone",
  components: { ArticleList },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
</style>
