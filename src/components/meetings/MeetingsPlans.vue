<template>
  <v-card width="750" class="meetings-plans" min-height="700">
    <v-card-title>{{ showLang("titles.meetings.list") }} </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="mt-4">
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
        </v-col>
        <v-col>
          <v-select
            v-model="periodVariant"
            :items="periodVariants"
            item-value="value"
            item-text="text"
            class="ml-1"
            label="Период"
          />
        </v-col>
      </v-row>
      <v-list>
        <template v-if="meetingsPlans.length">
          <v-list-item v-for="item in meetingsPlans" :key="item.id">
            <v-list-item-content>
              {{ item.dateFormatted }}
              <div class="day-content text-center">
                <div v-if="item.slots.length < 1">записей нет</div>
                <div
                  v-for="slot in item.slots"
                  :key="slot.timestamp"
                  class="time-slot"
                >
                  <div class="time-slot__time">
                    <span class="text-no-wrap"
                      >{{ slot.hour }}-{{ slot.minute }}</span
                    >
                  </div>
                  <div class="time-slot__customer">
                    {{ slot.customer.name }}
                  </div>
                  <div class="time-slot__type">
                    <span v-if="slot.regular"> регулярная запись</span>
                  </div>
                </div>
              </div>
            </v-list-item-content>
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
import { addDays, format, getDay } from "date-fns";
import { ru } from "date-fns/locale";

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
              customer: this.getCustomer(el.id),
              regular: true,
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
        days.push({
          date: current,
          dateFormatted: format(current, "d MMMM: EEEE", { locale: ru }),
          slots,
        });
        iterator++;
      }
      this.meetingsPlans = days;
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
    getCustomer(id) {
      return this.customers.find((el) => el.id === id);
    },
  },
};
</script>

<style lang="scss" scoped>
.meetings-plans {
  margin-right: auto;
  margin-left: auto;
}
.v-list-item {
  border: 3px solid #e8eaf6;
  border-radius: 12px;
  margin-bottom: 20px;
}
.day-content {
  border-top: 1px solid #cfd8dc;
  margin-top: 7px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.time-slot {
  border: 1px dashed #aaa;
  border-radius: 12px;
  padding: 4px 20px;
  margin-bottom: 17px;
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  justify-content: space-between;
  &__time {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20px;
    border-right: 1px dashed #d7ccc8;
  }
  &__customer {
    padding: 20px;
    border-right: 1px dashed #d7ccc8;
  }
  &__type {
    display: flex;
    padding-left: 25px;
    align-items: center;
  }
}
.time-slot:last-child {
  margin-bottom: 0;
}
.v-list-item:first-child {
  //border-top: 1px dashed #aaa;
  margin-top: 20px;
}
.v-list-item:last-child {
  //border-bottom: 1px dashed #ddd;
  margin-top: 20px;
}
</style>
