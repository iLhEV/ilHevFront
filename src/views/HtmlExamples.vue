<template>
  <div class="pa-10">
    <div class="menu-container">
      <router-link :to="ROUTES.HOME">Домой</router-link>
      <router-link :to="ROUTES.ARTICLES" class="pl-5">Статьи</router-link>
    </div>
    <div class="examples-area">
      <v-row class="row-wrapper">
        <v-col class="cell-wrapper">
          <div class="example-container example-1">
            <div class="description">
              <h2>
                #1 - центровка по горизонтали<br />
                и вертикали одновременно
              </h2>
              <div class="example-css-properties">
                display: flex;<br />
                justify-content: center;<br />
                align-items: center;.
              </div>
              <div class="example-description">
                <div>
                  <span class="css-property">display: flex</span> делает блок
                  <span class="term">flex-контейнером</span>.<br />
                  Все блоки внутри
                  <span class="term">flex-контейнера</span> ведут себя, как
                  <span class="term">flex-блоки</span>.
                  <span class="css-property">justify-content: center</span>
                  центрует блоки внутри контейнера по-горизонтали.
                  <span class="css-property">align-items</span> центрует блоки
                  внутри контейнера по-вертикали.
                </div>
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="cell-wrapper">
          <div class="example-container example-2">
            <h2>#2 - центровка только по-горизонтали</h2>
            <div class="example-css-properties">
              display: flex;<br />
              justify-content: center;
            </div>
            <div class="example-description">
              <div>
                <span class="css-property">justify-content: center</span>
                центрует блоки внутри контейнера по-горизонтали.
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="cell-wrapper">
          <div class="example-container example-3">
            <h2>#3 - центровка только по-вертикали</h2>
            <div class="example-css-properties">
              display: flex;<br />
              align-items: center;
            </div>
            <div class="example-description">
              <div>
                <span class="css-property">align-items: center</span>
                центрует блоки внутри контейнера по-вертикали.
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="row-wrapper">
        <v-col class="cell-wrapper">
          <div class="example-container example-4">
            <div class="description">
              <h2>#4 - второй способ центровки по-горизонтали<br /></h2>
              <div class="example-css-properties">
                display: flex;<br />
                align-items: center;<br />
                flex-direction: culumn;
              </div>
              <div class="example-description">
                <div>
                  По-горизонтали блоки можно центровать и с помощью
                  <span class="css-property">align-items: center;</span>
                  Для этого достаточно изменить направление выравнивания
                  свойством
                  <span class="css-property">flex-direction: column;</span>
                </div>
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="cell-wrapper">
          <div class="example-container example-5">
            <div class="description">
              <h2>#5 - второй способ центровки по-вертикали<br /></h2>
              <div class="example-css-properties">
                display: flex;<br />
                justify-content: center;<br />
                flex-direction: culumn;
              </div>
              <div class="example-description">
                <div>
                  И, наоборот, по-вертикали блоки можно центровать и с помощью
                  <span class="css-property">justify-content: center</span>
                  Для этого достаточно также, как и в примере #4 изменить
                  направление выравнивания свойством
                  <span class="css-property">flex-direction: column</span>
                </div>
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="cell-wrapper">
          <div class="example-container example-6">
            <div class="description">
              <h2>
                #6 - второй метод центровки по-горизонтали и вертикали<br />
              </h2>
              <div class="example-css-properties">
                display: flex;<br />
                align-items: center;<br />
                justify-content: center;<br />
                flex-direction: culumn;
              </div>
              <div class="example-description">
                <div>
                  И, наконец, по-вертикали и горизонтали одновременно блоки
                  можно отцентровать, как и в примере #1 с помощью использования
                  обоих свойств
                  <span class="css-property">justify-content: center</span>,
                  <span class="css-property">align-items: center</span>, но с
                  добавлением
                  <span class="css-property">flex-direction: column</span> -
                  результат от этого не изменится.
                </div>
              </div>
            </div>
            <div class="example-body">
              <div class="level-1">
                <div class="level-2"></div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
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
.menu-container {
}
.examples-area {
  padding-top: 30px;
}
h2 {
  font-size: 15px;
  min-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
hr {
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
.example-4 {
  .level-1 {
    display: flex;
    flex-direction: column;
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
.example-5 {
  .level-1 {
    display: flex;
    flex-direction: column;
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
.example-6 {
  .level-1 {
    display: flex;
    flex-direction: column;
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
.cell-wrapper {
  border-bottom: 1px solid #a1887f;
}
.cell-wrapper {
  border-right: 1px solid #a1887f;
}
.cell-wrapper:first-child {
  border-left: 1px solid #a1887f;
}
.row-wrapper:first-child .cell-wrapper {
  border-top: 1px solid #a1887f;
}
.example-body {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ddd;
  padding-top: 30px;
  padding-bottom: 20px;
}
.example-css-properties {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 130px;
}
.example-description {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
  min-height: 160px;
}
.css-property {
  font-weight: 500;
  font-size: 0.95em;
  font-style: italic;
  padding-right: 2px;
}
.term {
  font-style: italic;
  padding-right: 2px;
  font-size: 0.95em;
}
</style>
