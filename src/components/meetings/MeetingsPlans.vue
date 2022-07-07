<template>
  <v-card width="750" class="meetings-plans" min-height="700">
    <v-card-title>{{ showLang("titles.meetings.list") }} </v-card-title>
    {{ customers }}
    <v-card-text>
      <div class="d-flex">
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
        <v-select
          v-model="periodVariant"
          :items="periodVariants"
          item-value="value"
          item-text="text"
          class="ml-5 mt-n2"
          label="Период"
        />
      </div>
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
import { showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
import MeetingCard from "@/components/meetings/MeetingCard";
import { defaultPeriodVariant, periodVariants } from "@/settings/dates";
import { addDays, getDay } from "date-fns";

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
      period: [],
      periodVariants,
      periodVariant: defaultPeriodVariant,
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
      const regularSlots = [];
      // Get list of customer's regular slots.
      this.customers.forEach((el) => {
        if (el.time_slots && el.time_slots.length) {
          el.time_slots.forEach((slot) => {
            regularSlots.push({
              ...slot,
              fromCustomerId: el.id,
            });
          });
        }
      });
      // Get time period.
      const today = new Date();
      let iterator = 1;
      const periodLengthDays = this.periodVariant.value;
      const days = [];
      let slots = [];
      let current = today;
      let day = null;
      console.log(2, periodLengthDays);
      while (iterator <= periodLengthDays) {
        current = addDays(today, iterator);
        day = getDay(current);
        slots = regularSlots.filter((el) => {
          return el.dayOfWeek === day;
        });
        days.push({ date: current, slots });
        iterator++;
      }
      console.log(days);
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
