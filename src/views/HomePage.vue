<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home-page mx-auto">
    <AuthDialog :show="showAuthDialog" @close="closeAuthDialog" />
    <v-card dark flat>
      <v-card-title class="pa-2 top-bar">
        <v-menu offset-y>
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

        <h1 class="title-box font-weight-light text-center grow">
          <span class="title-box__middle">~ ~ ~ ilheV ~ ~ ~</span>
        </h1>
        <v-avatar @click="openAuthDialog" size="38" class="login-avatar">
          <v-img src="@/assets/avatar-volf.png"></v-img>
        </v-avatar>
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

export default {
  name: "HomePage",
  components: { AuthDialog },
  data() {
    return {
      menuItems: [{ title: "Binance Emulator", name: "binanceEmulator" }],
      showAuthDialog: false,
      workPlaces: WORK_PLACES,
    };
  },
  mounted() {},
  methods: {
    processMenuAction(name) {
      console.log(name);
    },
    closeAuthDialog() {
      console.log("close2");
      this.showAuthDialog = false;
    },
    openAuthDialog() {
      this.showAuthDialog = true;
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
}
.picture-box {
  position: relative;
}
.stack-frontend {
  position: absolute;
  top: 26px;
  left: 183px;
  color: #ddd;
  font-size: 0.97em;
  line-height: 0.95em;
  border-bottom: 1px dashed #ddd;
}
.stack-backend {
  position: absolute;
  top: 32px;
  left: 21px;
  color: #ddd;
  font-size: 0.9em;
  line-height: 0.95em;
  border-bottom: 1px dashed #ddd;
}
.languages-box {
  position: absolute;
  top: 93px;
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
  background-color: #8d6e63;
}
</style>
