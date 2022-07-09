<template>
  <div>
    <v-card width="750" class="top-menu" outlined>
      <v-card-text class="d-flex justify-space-between navigation-area">
        <v-row>
          <v-col cols="1">
            <v-menu bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn
                      :to="ROUTES.HOME"
                      small
                      elevation="1"
                      color="primary"
                      >{{ showLang("menus._private.top.publicArea") }}</v-btn
                    >
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <v-btn
                      @click="logout"
                      color="red lighten-3"
                      small
                      elevation="1"
                      >{{ showLang("menus._private.top.logout") }}</v-btn
                    >
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="11">
            <v-row class="text-right">
              <v-col v-if="false">
                <v-btn
                  :to="PRIVATE_ROUTES.ARTICLES"
                  small
                  elevation="1"
                  color="#EFEBE9"
                  >{{ showLang("menus._private.top.articles") }}</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  :to="PRIVATE_ROUTES.MEETINGS"
                  small
                  elevation="1"
                  color="#EFEBE9"
                  >{{ showLang("menus._private.top.meetings") }}</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  :to="PRIVATE_ROUTES.CUSTOMERS"
                  small
                  elevation="1"
                  color="#EFEBE9"
                  >{{ showLang("menus._private.top.customers") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <ArticleList v-if="tab === privateTabs.articles" />
    <MeetingsPrivate v-if="tab === privateTabs.meetings" />
    <Customers v-if="tab === privateTabs.customers" />
  </div>
</template>

<script>
import ArticleList from "@/components/articles/ArticleList";
import { mapGetters } from "vuex";
import { PRIVATE_ROUTES, ROUTES } from "@/settings/routes";
import { LOCAL_STORAGE_TOKEN_FIELD } from "@/settings/auth";
import { toastSuccess } from "@/helpers/toasts";
import { showLang } from "@/settings/lang";
import { privateDefaultTab, privateTabs } from "@/settings/tabs";
import MeetingsPrivate from "@/components/meetings/MeetingsPlans";
import Customers from "@/components/customers/Customers";
export default {
  name: "PrivateAreaView",
  components: { Customers, MeetingsPrivate, ArticleList },
  data() {
    return {
      privateTabs,
      tab: privateDefaultTab,
      PRIVATE_ROUTES,
      ROUTES,
      showLang,
    };
  },
  computed: {
    ...mapGetters("auth", ["token"]),
  },
  watch: {
    $route(to) {
      this.tab = to.name;
    },
  },
  beforeMount() {
    const currentRouteName = this.$router.currentRoute.name;
    if (
      Object.keys(this.privateTabs).find(
        (el) => this.privateTabs[el] === currentRouteName
      )
    ) {
      this.tab = currentRouteName;
    }
  },
  mounted() {},
  methods: {
    goToPublicArea() {
      this.$router.push(ROUTES.HOME);
    },
    logout() {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_FIELD);
      this.$router.push(ROUTES.HOME);
      toastSuccess(showLang("alerts.auth.logoutSuccess"));
    },
  },
};
</script>

<style lang="scss" scoped>
.cabinet-page {
  margin-top: 100px;
}
.navigation-area {
  min-height: 55px;
}
a {
  text-decoration: none !important;
}
.top-menu {
  margin: 5px auto 10px;
}
</style>
