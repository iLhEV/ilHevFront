<template>
  <v-dialog
    v-model="dialog"
    @input="$emit('input', $event)"
    max-width="450"
    overlay-color="var(--v-overlay-base)"
    overlay-opacity="0.3"
    persistent
  >
    <v-card v-if="customer">
      <v-card-title>
        {{ showLang("titles.customers.delete") }}
      </v-card-title>
      <v-card-text>
        <div class="highlighted-black">
          Are you sure you want to delete customer with id = {{ customer.id }}?
        </div>
        <v-expansion-panels v-model="showText" class="mt-5" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>Article text</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-html="customer.text" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions class="d-flex justify-end pr-6 pb-4">
        <v-btn depressed small class="mr-5" @click="close">{{
          showLang("buttons.close")
        }}</v-btn>
        <v-btn @click="deleteCustomer" color="error" depressed small>{{
          showLang("buttons.delete")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastSuccess } from "@/helpers/toasts";

export default {
  name: "CustomerDelete",
  data() {
    return {
      showLang,
      dialog: false,
      showText: [0],
    };
  },
  model: {
    prop: "customer",
  },
  props: {
    customer: Object,
  },
  watch: {
    customer(newVal) {
      if (newVal) {
        this.dialog = true;
      }
    },
  },
  methods: {
    close() {
      this.$emit("input", null);
      this.dialog = false;
    },
    async deleteCustomer() {
      const res = await apiRequest({
        path: `${API_ROUTES.CUSTOMER}/${this.customer.id}`,
        method: "delete",
      });
      if (res.success) {
        this.$emit("updateList");
        toastSuccess(showLang("alerts.customers.deleteSuccess"));
        this.close();
      }
    },
  },
};
</script>

<style scoped>
.highlighted-black {
  color: black;
}
</style>
