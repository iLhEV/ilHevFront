<template>
  <v-card width="750" class="meetings-plans" min-height="700">
    <v-card-title>{{ showLang("titles.meetings.list") }} </v-card-title>
    {{ customers }}
    <v-card-text>
      <v-btn
        @click="addMeetingPlan"
        small
        depressed
        color="#C5E1A5"
        class="px-4"
        >Запланировать</v-btn
      >
      <v-btn
        small
        depressed
        color="#EFEBE9"
        class="ml-5 px-0"
        @click="updateListManually"
        ><v-icon small>mdi-cached</v-icon></v-btn
      >
      <v-list>
        <template v-if="meetingsPlans.length">
          <v-list-item v-for="item in meetingsPlans" :key="item.id">
            <v-list-item-avatar>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content
              >{{ item.dayOfWeek }}_{{ item.hour }}_{{
                item.minute
              }}</v-list-item-content
            >
            <v-list-item-action class="d-inline-block">
              <v-btn @click="editMeetingPlan(item)" icon>
                <v-icon size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteMeetingPlan(item)" icon>
                <v-icon size="20">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <div v-else class="pt-3">
          {{ showLang("errors.noMeetings") }}
        </div>
      </v-list>
    </v-card-text>
    <MeetingCard
      v-model="meetingPlanDialog"
      :id.sync="editId"
      @updateList="updateList"
    />
    <ArticleDelete v-model="meetingPlanDelete" @updateList="updateList" />
    {{ meetingsPlans }}
  </v-card>
</template>

<script>
import ArticleDelete from "@/components/articles/ArticleDelete";
import { lang, showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
import MeetingCard from "@/components/meetings/MeetingCard";

export default {
  name: "MeetingsPlans",
  components: { MeetingCard, ArticleDelete },
  data() {
    return {
      meetingPlanDialog: false,
      meetingsPlans: [],
      editId: null,
      meetingPlanDelete: null,
      customers: [],
      lang,
      showLang,
    };
  },

  async beforeMount() {
    await this.getCustomers();
    this.createMeetingsPlans();
  },
  methods: {
    addMeetingPlan() {
      this.meetingPlanDialog = true;
    },
    updateList() {
      this.createMeetingsPlans();
    },
    createMeetingsPlans() {
      this.customers.forEach((el) => {
        if (el.time_slots && el.time_slots.length) {
          el.time_slots.forEach((slot) => {
            this.meetingsPlans.push({
              ...slot,
              fromCustomer: true,
              customerId: el.id,
            });
          });
          console.log(el.name);
        }
      });
    },
    async getCustomers() {
      const res = await apiRequest({ path: API_ROUTES.CUSTOMERS });
      if (res.success) {
        this.customers = res.data;
      } else {
        toastError(showLang("errors.getData"));
      }
    },
    updateListManually() {
      this.updateList();
      toastSuccess(showLang("alerts.meetings.listUpdateSuccess"));
    },
    async editMeetingPlan(item) {
      this.editId = item.id;
    },
    async deleteMeetingPlan(item) {
      this.meetingPlanDelete = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.meetings-plans {
  margin-top: 70px;
  margin-right: auto;
  margin-left: auto;
}
.v-list-item {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
}
.v-list-item:first-child {
  border-top: 1px dashed #ddd;
  margin-top: 20px;
}
.v-list-item:last-child {
  border-bottom: 1px dashed #ddd;
  margin-top: 20px;
}
</style>
