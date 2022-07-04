<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="550"
    overlay-color="var(--v-overlay-base)"
    overlay-opacity="0.3"
    persistent
  >
    <v-form ref="cardForm" v-model="formValid">
      <v-card class="pb-3">
        <v-card-title>
          {{
            id
              ? showLang("titles.customers.edit")
              : showLang("titles.customers.add")
          }}
        </v-card-title>
        <v-card-text class="pt-2">
          <v-text-field
            v-model="customer.name"
            label="Имя клиента"
            :rules="[RULES.name]"
            outlined
            dense
          />
          <div class="d-flex justify-space-between">
            <v-text-field
              v-model.number="customer.price"
              label="Стоимость встречи"
              :rules="[RULES.price]"
              outlined
              dense
              style="max-width: 250px; margin-right: 16px"
            />
            <v-select
              v-model="customer.currency"
              :items="currencies"
              label="Валюта"
              item-text="name"
              item-value="id"
              :rules="[RULES.currency]"
              style="max-width: 100px"
              outlined
              dense
            />
          </div>
          <v-btn @click="addTime()" class="mb-1" depressed
            >Добавить время</v-btn
          >
          <div class="mt-4" v-if="customerTimeSlots.length">
            <div
              v-for="item in customerTimeSlots"
              :key="item.timestamp"
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
        </v-card-text>
        <v-card-actions class="d-flex justify-end pr-6">
          <v-btn depressed class="mr-5" @click="close">
            {{ showLang("buttons.close") }}
          </v-btn>
          <v-btn @click="save" color="primary" depressed>{{
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
import { RULES } from "@/settings/rules";
const customerSample = () => {
  return { name: null, price: null, currency: null, timeSlots: null };
};

export default {
  name: "CustomerCard",
  components: {},
  props: {
    value: Boolean,
    id: Number,
  },
  data() {
    return {
      RULES,
      showLang,
      customer: customerSample(),
      formValid: false,
      daysOfWeek,
      meetingHours,
      meetingMinutes,
      newDayOfWeek: "",
      newHour: "",
      newMinute: "",
      customerTimeSlots: [],
      emptyItem: {
        dayOfWeek: "",
        hour: "",
        minute: "",
      },
      customerName: "",
      customerCost: "",
      customerCurrency: "",
      currencies: ["GEL", "RUB", "USD", "EUR"],
    };
  },
  watch: {
    id(newVal) {
      if (newVal) {
        this.getCustomer(newVal);
        this.$emit("input", true);
      }
    },
  },
  methods: {
    close() {
      this.$refs.cardForm.resetValidation();
      this.$emit("input", false);
      this.clean();
      this.$emit("update:id", null);
    },
    async save() {
      this.$refs.cardForm.validate();
      if (!this.formValid) {
        toastError(showLang("errors.plsCheckFormInput"));
        return;
      }

      this.customer.timeSlots = JSON.stringify(this.customerTimeSlots);

      const res = await apiRequest({
        path: API_ROUTES.CUSTOMER,
        method: "post",
        data: {
          id: this.id,
          ...this.customer,
        },
      });

      if (res.success) {
        this.$emit("updateList");
        toastSuccess(
          this.id
            ? showLang("alerts.customers.editSuccess")
            : showLang("alerts.customers.addSuccess")
        );
        this.close();
      }
    },

    clean() {
      this.customer = customerSample();
    },

    async getCustomer() {
      const res = await apiRequest({
        path: `${API_ROUTES.CUSTOMER}/${this.id}`,
      });
      if (res.success) {
        this.customer = res.data;
        if (res.data.time_slots && res.data.time_slots.length) {
          this.customerTimeSlots = res.data.time_slots;
        }
      } else {
        toastError(showLang("errors.unknown"));
      }
    },

    async addTime() {
      this.customerTimeSlots.push({
        ...this.emptyItem,
        timestamp: Date.now(),
      });
    },

    async deleteTime(timestamp) {
      this.customerTimeSlots = this.customerTimeSlots.filter(
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
