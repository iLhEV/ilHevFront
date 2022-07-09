<template>
  <v-app>
    <v-main class="main-area">
      <div class="px-2">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
.v-main {
  background: #efebe9;
}
</style>
