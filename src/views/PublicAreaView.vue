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
          <span v-if="showName">iL</span>
          <span class="title-box__small">
            <span v-if="showRestOfName">[ia]</span>
            <span v-if="showRestOfSurname">[Domys]</span>
          </span>
          <span v-if="isAnimationFinished">'</span>
          <span v-if="showSurname">hEV</span>
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
      <ForestBlock />
    </v-card>
    <v-card>
      <v-card-text class="py-0">
        <WorkPlacesTab v-if="tab === tabs.workPlaces" />
        <ArticlesTab v-if="tab === tabs.articles" />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import AuthDialog from "@/components/auth/AuthDialog";
import { isAuth } from "@/helpers/auth";
import { ROUTES } from "@/settings/routes";
import { defaultTab, tabs } from "@/settings/tabs";
import WorkPlacesTab from "@/components/tabs/WorkPlacesTab";
import ArticlesTab from "@/components/tabs/ArticlesTab";
import ForestBlock from "@/components/ForestBlock";

const ANIMATION_DELAY_BEFORE_START = 200;
const ANIMATION_TIMEOUT = 700;
const ANIMATION_RUN_NUMBER = 1;

export default {
  name: "PublicAreaView",
  components: { ForestBlock, ArticlesTab, AuthDialog, WorkPlacesTab },
  data() {
    return {
      menuItems: [{ title: "Articles", name: "articles" }],
      showAuthDialog: false,
      avatarShift: false,
      showName: true,
      showSurname: false,
      showRestOfName: false,
      showRestOfSurname: false,
      isAnimationFinished: false,
      animationRunNumber: 0,
      tabs,
      tab: defaultTab,
      ROUTES,
    };
  },
  beforeMount() {
    const currentRouteName = this.$router.currentRoute.name;
    if (Object.keys(this.tabs).find((el) => el === currentRouteName)) {
      this.tab = currentRouteName;
    }
  },
  mounted() {
    setTimeout(() => {
      this.runAnimation(ANIMATION_RUN_NUMBER);
    }, ANIMATION_DELAY_BEFORE_START);
  },
  watch: {
    $route(to) {
      if (to.name !== this.tab) {
        this.tab = to.name;
      }
    },
  },
  methods: {
    runAnimation(runNumber) {
      if (!runNumber) {
        return;
      }
      setTimeout(() => {
        this.isAnimationFinished = false;
        this.showRestOfName = true;
      }, ANIMATION_TIMEOUT);
      setTimeout(() => {
        this.showRestOfSurname = true;
      }, ANIMATION_TIMEOUT * 2);
      setTimeout(() => {
        this.showSurname = true;
      }, ANIMATION_TIMEOUT * 3);
      setTimeout(() => {
        this.showRestOfName = false;
        this.showRestOfSurname = false;
        this.isAnimationFinished = true;
      }, ANIMATION_TIMEOUT * 12);
      setTimeout(() => {
        this.runAnimation(runNumber - 1);
      }, ANIMATION_TIMEOUT * 4.5);
    },
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
    showArticles() {
      this.$router.push(ROUTES.ARTICLES);
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
  font-size: 1.25em;
  color: #eee;
  font-weight: 400;

  &__small {
    font-size: 0.8em;
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
.top-bar {
  background-color: var(--v-chocolate-base);
  height: 56px;
}
</style>
