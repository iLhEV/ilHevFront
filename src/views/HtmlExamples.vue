<template>
  <div class="pa-10">
    <router-link :to="ROUTES.HOME">Домой</router-link>
    <router-link :to="ROUTES.ARTICLES" class="pl-5">Статьи</router-link>
    <v-divider class="my-3" style="border-color: #ccc" />
    <v-row>
      <v-col class="example-1 example">
        <div class="description">
          <h2>#1 - выравнивание по горизонтали и вертикали одновременно</h2>
          <v-divider />
          достигается за счёт назначения родительскому контейнеру трёх
          css-свойств:<br />
          display: flex;<br />
          justify-content: center;<br />
          align-items: center;.
          <v-divider />
          Первое свойство делает контейнер flex-контейнером. Второе
          устанавливает выравнивание по-горизонтали. Третье - по-вертикали.
          <v-divider />
        </div>
        <div class="example-body">
          <div class="level-1">
            <div class="level-2"></div>
          </div>
        </div>
      </v-col>
      <v-col class="example-2 example">
        <h2>#2 - выравнивание только по горизонтали</h2>
        <v-divider />
        Используется два css-свойства:<br />
        display: flex;<br />
        justify-content: center;
        <v-divider />
        Второе свойство устанавливает выравнивание по-горизонтали.
        <v-divider />
        <div class="example-body">
          <div class="level-1">
            <div class="level-2"></div>
          </div>
        </div>
      </v-col>
      <v-col class="example-3 example">
        <h2>#3 - выравнивание только по вертикали</h2>
        <v-divider />
        Используется два css-свойства:<br />
        display: flex;<br />
        align-items: center;
        <v-divider />
        Второе свойство устанавливает выравнивание по-вертикали.
        <v-divider />
        <div class="example-body">
          <div class="level-1">
            <div class="level-2"></div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ROUTES } from "@/settings/routes";

export default {
  name: "HtmlExamples",
  data() {
    return {
      ROUTES,
    };
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 15px;
}
.row hr {
  margin-top: 5px;
  margin-bottom: 5px;
}
.example-1 {
  .level-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 250px;
    height: 250px;
    background: rebeccapurple;
  }

  .level-2 {
    width: 150px;
    height: 150px;
    background: #a1887f;
  }
}
.example {
  border-left: 1px solid #ccc;
}
.example-body {
  margin-top: 15px;
}
.example-2 {
  .level-1 {
    display: flex;
    justify-content: center;
    width: 250px;
    height: 250px;
    background: rebeccapurple;
  }

  .level-2 {
    width: 150px;
    height: 150px;
    background: #a1887f;
  }
}
.example-3 {
  .level-1 {
    display: flex;
    align-items: center;
    width: 250px;
    height: 250px;
    background: rebeccapurple;
  }

  .level-2 {
    width: 150px;
    height: 150px;
    background: #a1887f;
  }
}
</style>
