<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="home-page mx-auto">
    <AuthDialog :show="showAuthDialog" @close="closeAuthDialog" />
    <v-card dark flat>
      <v-card-title class="pa-2 red lighten-1">
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
          <span class="title-box__middle">~ ~ ~ ilHeV ~ ~ ~</span>
        </h1>
        <v-avatar @click="openAuthDialog" class="login-avatar">
          <v-img
            src="https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheType=BlazerShirt&eyeType=Squint&eyebrowType=Default&facialHairColor=Brown&facialHairType=BeardLight&hairColor=BlondeGolden&mouthType=Smile&skinColor=Light&topType=ShortHairShortCurly"
          ></v-img>
        </v-avatar>
      </v-card-title>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
        <v-container class="picture-box fill-height">
          <div class="stack-box">
            <div class="stack-box__backend">Front / Back</div>
          </div>
          <div class="js-box">
            JS
            <div class="js-box__cross">+</div>
          </div>
          <div class="vue-box">Vue.js</div>
          <div class="react-box">React.js</div>
        </v-container>
      </v-img>
    </v-card>
    <v-card>
      <v-card-text class="py-0">
        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(item, index) in workPlaces"
            :key="index"
            :color="index % 2 === 1 ? 'teal lighten-3' : 'pink'"
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
  background: red;
}
.title-box {
  font-size: 0.65em;
  color: #eee;
  &__middle {
    font-size: 1.1em;
    font-weight: 400;
  }
}

.login-avatar {
  cursor: pointer;
}
.picture-box {
  position: relative;
}
.stack-box {
  position: absolute;
  margin-left: 41.8%;
  top: 60px;
  color: #ddd;
  &__backend {
    font-size: 0.95em;
    padding-left: 13px;
  }
}
.js-box {
  position: absolute;
  font-size: 2em;
  top: 120px;
  color: #ccc !important;
  &__cross {
    position: absolute;
    top: 30px;
    left: 38px;
    font-size: 15px;
  }
}
.vue-box {
  position: absolute;
  top: 143px;
  left: 60px;
  color: #ddd !important;
}
.react-box {
  position: absolute;
  top: 163px;
  left: 35px;
  color: #ddd !important;
}
</style>
