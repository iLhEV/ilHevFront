<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="750"
    overlay-color="var(--v-overlay-base)"
    overlay-opacity="0.3"
    persistent
  >
    <v-form ref="form">
      <v-card class="pb-3">
        <v-card-title>
          {{
            id
              ? showLang("titles.meetings.edit")
              : showLang("titles.meetings.add")
          }}
        </v-card-title>
        <v-card-text class="pt-2">
          <v-form>
            <v-select
              v-model="customer"
              :items="customers"
              label="Клиент"
              item-text="name"
              item-value="id"
              style="width: 400px"
              outlined
              dense
            />
            <div v-if="selectedCustomer && selectedCustomer.price">
              Стоимость встречи:
              <span style="color: black"
                >{{ selectedCustomer.price.amount }}
                {{ selectedCustomer.price.currency }}</span
              >
            </div>
            <div v-else-if="selectedCustomer" class="mt-n4">
              Стоимость: <span style="color: black">не определена</span>
            </div>
            <v-btn
              @click="addTime()"
              color="success"
              class="mt-4 mb-1"
              small
              depressed
              >Добавить время</v-btn
            >
            <div class="mt-4" v-if="meetingTimes.length">
              <div
                v-for="item in meetingTimes"
                :key="item.dayOfWeek"
                class="d-flex"
              >
                <v-select
                  v-model="item.dayOfWeek"
                  :items="daysOfWeek"
                  item-text="rusName"
                  item-value="name"
                  label="День недели"
                  class="mr-2"
                  style="max-width: 170px"
                  outlined
                  dense
                />
                <v-select
                  v-model="item.hour"
                  :items="meetingHours"
                  item-text="rusName"
                  item-value="name"
                  label="Часы"
                  class="mr-2"
                  style="max-width: 100px"
                  outlined
                  dense
                />
                <v-select
                  v-model="item.minute"
                  :items="meetingMinutes"
                  item-text="rusName"
                  item-value="name"
                  label="Минуты"
                  class="mr-2"
                  style="max-width: 120px"
                  outlined
                  dense
                />
                <v-btn @click="deleteTime(item.timestamp)" icon
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </div>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pr-6">
          <v-btn depressed small class="mr-5" @click="close">
            {{ showLang("buttons.close") }}
          </v-btn>
          <v-btn @click="save" color="primary" depressed small>{{
            showLang("buttons.save")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
import { daysOfWeek, meetingHours, meetingMinutes } from "@/settings/dates";
export default {
  name: "MeetingCard",
  components: {},
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      showLang,
      text: "",
      customer: "",
      daysOfWeek,
      meetingHours,
      meetingMinutes,
      newDayOfWeek: "",
      newHour: "",
      newMinute: "",
      meetingTimes: [],
      emptyItem: {
        daysOfWeek: "",
        hour: "",
        minute: "",
      },
    };
  },
  computed: {
    customers() {
      return [
        {
          id: 1,
          name: "Ольга Ивановна",
          price: {
            amount: 4000,
            currency: "rub",
          },
        },
        {
          id: 2,
          name: "Андрей Петрович",
        },
      ];
    },
    selectedCustomer() {
      return this.customers.find((el) => el.id === this.customer);
    },
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getArticle(newVal);
        this.$emit("input", true);
      }
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.clean();
      this.$emit("update:id", null);
    },
    async save() {
      const res = await apiRequest({
        path: API_ROUTES.ARTICLE,
        method: "post",
        data: {
          id: this.id,
          text: this.text,
        },
      });
      if (res.success) {
        this.$emit("updateList");
        toastSuccess(
          this.id
            ? showLang("alerts.meetings.editSuccess")
            : showLang("alerts.meetings.addSuccess")
        );
        this.close();
      }
    },
    clean() {
      this.text = "";
    },
    async getArticle() {
      const res = await apiRequest({
        path: `${API_ROUTES.ARTICLE}/${this.id}`,
      });
      if (res.success) {
        this.text = res.data.text;
      } else {
        toastError(showLang("errors.unknown"));
      }
    },
    async addTime() {
      this.meetingTimes.push({ ...this.emptyItem, timestamp: Date.now() });
      console.log(this.meetingTimes);
    },
    async deleteTime(timestamp) {
      this.meetingTimes = this.meetingTimes.filter(
        (el) => el.timestamp !== timestamp
      );
    },
  },
};
</script>

<style>
/*noinspection CssUnusedSymbol*/
.ql-syntax {
  background: lightslategray;
  padding: 15px 0 20px 15px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
