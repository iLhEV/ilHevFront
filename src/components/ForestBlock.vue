<template>
  <v-img
    src="@/assets/forest1.jpg"
    gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
  >
    <v-container class="picture-box">
      <span class="articles-element">
        <span
          :class="articlesLinkActive ? 'pencil-link' : 'pencil-link-active'"
        ></span>
        <RouterLink
          class="articles-element__body"
          @mouseover="articlesLinkActive = true"
          @mouseout="articlesLinkActive = false"
          :to="ROUTES.ARTICLES"
          text
          link
          >Articles</RouterLink
        >
      </span>
      <div class="stack-backend">Backend</div>
      <div class="stack-frontend">Frontend</div>
      <div class="languages-box">
        <div class="js">JS</div>
        <div class="vue">Vue.js</div>
        <div class="react">React</div>
        <div class="cross">+</div>
      </div>
    </v-container>
  </v-img>
</template>

<script>
import { ROUTES } from "@/settings/routes";

export default {
  name: "ForestBlock",
  data() {
    return {
      articlesLinkActive: false,
      ROUTES,
    };
  },
};
</script>

<style lang="scss" scoped>
.picture-box {
  position: relative;
}
.articles-element {
  position: absolute;
  right: 66px;
  top: 18px;
  user-select: none;
  &__body {
    padding-left: 8px;
    border-bottom: 1px dashed white !important;
    text-decoration: none;
  }
  &__body:hover {
    border-bottom: 0;
  }
}
.stack-frontend:hover,
.stack-backend:hover {
  cursor: default;
}
.stack-frontend {
  position: absolute;
  top: 30px;
  left: 189px;
  color: #ddd;
  font-size: 0.71em;
  line-height: 1.2em;
  border-bottom: 1px dashed #ddd;
}
.stack-backend {
  position: absolute;
  top: 35px;
  left: 22px;
  color: #ddd;
  font-size: 0.65em;
  line-height: 1.2em;
  border-bottom: 1px dashed #ddd;
}
.languages-box {
  position: absolute;
  top: 93px;
  @media (max-width: 400px) {
    top: 70px;
  }
  @media (max-width: 410px) {
    top: 77px;
  }
  left: 30px;
  color: #ccc !important;
  .js {
    font-size: 2em;
  }
  .vue {
    position: absolute;
    top: 23px;
    left: 51px;
    color: #ddd !important;
  }
  .react {
    position: absolute;
    top: 46px;
    left: 25px;
    color: #ddd !important;
    font-size: 0.84em;
  }
  .cross {
    position: absolute;
    top: 30px;
    left: 38px;
    font-size: 15px;
  }
}
.links-area {
  display: block;
  text-align: left;
  background-color: #a1887f;
  font-size: 14px;
  font-weight: normal;
  line-height: 28px;
  padding: 0 18px 3px;
  margin: 0;
  &__header {
    display: inline-block;
    font-size: 1.2em;
  }
}
.pencil-link::before {
  content: "✏";
}
.pencil-link-active::before {
  content: "✎";
}
::v-deep {
  .picture-box a {
    color: white !important;
    font-weight: normal;
  }
}
</style>
