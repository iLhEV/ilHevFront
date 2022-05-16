<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home-page mx-auto">
    <AuthDialog :show="showAuthDialog" @close="closeAuthDialog" />
    <v-card dark flat>
      <v-card-title class="pa-2 top-bar">
        <v-menu offset-y v-if="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" icon>
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in menuItems"
              :key="index"
              @click="processMenuAction(item.name)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <h1 class="title-box font-weight-light text-left grow pl-3">
          <span class="title-box__middle">iLhEV</span>
        </h1>
        <v-avatar
          @click="avatarAction"
          @mouseover="bounceAvatar"
          @mouseout="deBounceAvatar"
          :size="avatarShift ? 40 : 38"
          class="login-avatar mr-2"
          :class="avatarShift ? 'login-avatar-bounced' : ''"
        >
          <v-img src="@/assets/avatar-volf.png" />
        </v-avatar>
      </v-card-title>
      <v-card-title class="links-area">
        <span
          :class="articlesLinkActive ? 'pencil-link' : 'pencil-link-active'"
        ></span>
        <span
          class="links-area-element"
          @mouseover="articlesLinkActive = true"
          @mouseout="articlesLinkActive = false"
          >Articles</span
        >
      </v-card-title>
      <v-img
        src="@/assets/forest1.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container class="picture-box fill-height">
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
    </v-card>
    <v-card>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(item, index) in workPlaces"
            :key="index"
            :color="index % 2 === 1 ? '#546E7A' : '#BCAAA4'"
            small
          >
            <v-row class="pt-1">
              <v-col cols="3">
                <strong>{{ item.date }}</strong>
              </v-col>
              <v-col>
                <strong
                  ><a :href="item.link" target="blank">{{
                    item.name
                  }}</a></strong
                >
                <div class="text-caption">
                  {{ item.text }}
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import WORK_PLACES from "@/settings/workPlaces";
import AuthDialog from "@/components/auth/AuthDialog";
import { isAuth } from "@/helpers/auth";
import { ROUTES } from "@/settings/routes";

export default {
  name: "HomePage",
  components: { AuthDialog },
  data() {
    return {
      menuItems: [{ title: "Articles", name: "articles" }],
      showAuthDialog: false,
      workPlaces: WORK_PLACES,
      avatarShift: false,
      articlesLinkActive: false,
    };
  },
  mounted() {},
  methods: {
    processMenuAction(name) {
      console.log(name);
    },
    closeAuthDialog() {
      this.showAuthDialog = false;
    },
    avatarAction() {
      if (isAuth()) {
        this.$router.push(ROUTES.PRIVATE_ZONE);
      } else {
        this.showAuthDialog = true;
      }
    },
    bounceAvatar() {
      this.avatarShift = true;
    },
    deBounceAvatar() {
      this.avatarShift = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  max-width: 450px;
  background: #42a5f5;
}
.title-box {
  padding-top: 3px;
  font-size: 0.65em;
  color: #eee;
  &__middle {
    font-size: 1.4em;
    font-weight: 400;
  }
}
.login-avatar {
  cursor: pointer;
  margin-left: 1px;
  margin-right: 1px;
}
/*test commit*/
.login-avatar-bounced {
  margin-left: 0;
  margin-right: 0;
}
.picture-box {
  position: relative;
}
.stack-frontend:hover,
.stack-backend:hover {
  border-bottom: 0;
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
.top-bar {
  background-color: var(--v-chocolate-base);
  height: 56px;
}
.links-area {
  display: block;
  text-align: center;
  background-color: #a1887f;
  font-size: 14px;
  font-weight: normal;
  line-height: 28px;
  padding: 0 18px;
  margin: 0;
}
.pencil-link::before {
  content: "✏";
}
.pencil-link-active::before {
  content: "✎";
}
.links-area-element {
  padding-left: 8px;
  cursor: pointer;
}
</style>
