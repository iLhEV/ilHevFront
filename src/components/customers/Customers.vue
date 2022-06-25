<template>
  <v-card width="750" class="customers-list mx-auto" min-height="700">
    <v-card-title>{{ lang.TITLE_CUSTOMERS }} </v-card-title>
    <v-card-text>
      <v-btn @click="addCustomer" small depressed color="#C5E1A5" class="px-4"
        >Добавить</v-btn
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
        <template v-if="customers.length">
          <v-list-item v-for="item in customers" :key="item.id">
            <v-list-item-avatar>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content v-html="item.text" />
            <v-list-item-action class="d-inline-block">
              <v-btn @click="editCustomer(item)" icon>
                <v-icon size="20">mdi-pencil</v-icon>
              </v-btn>
              <v-btn @click="deleteCustomer(item)" icon>
                <v-icon size="20">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
        <div v-else class="pt-3">
          {{ showLang("errors.noCustomers") }}
        </div>
      </v-list>
    </v-card-text>
    <CustomerCard
      v-model="customerDialog"
      :id.sync="editId"
      @updateList="updateList"
    />
    <CustomerDelete v-model="customerToDelete" @updateList="updateList" />
  </v-card>
</template>

<script>
import CustomerDelete from "@/components/customers/CustomerDelete";
import { lang, showLang } from "@/settings/lang";
import { apiRequest } from "@/api/api";
import { API_ROUTES } from "@/settings/api";
import { toastError, toastSuccess } from "@/helpers/toasts";
import CustomerCard from "@/components/customers/CustomerCard";

export default {
  name: "CustomersList",
  components: { CustomerCard, CustomerDelete },
  data() {
    return {
      customerDialog: false,
      customers: [],
      editId: null,
      customerToDelete: null,
      lang,
      showLang,
    };
  },
  async mounted() {
    await this.getCustomers();
  },
  methods: {
    addCustomer() {
      this.customerDialog = true;
    },
    async getCustomers() {
      const res = await apiRequest({ path: API_ROUTES.ARTICLES });
      if (res.success) {
        this.customers = res.data;
      } else {
        toastError(lang.GET_DATA_ERROR);
      }
    },
    updateList() {
      this.getCustomers();
    },
    updateListManually() {
      this.updateList();
      toastSuccess(lang.ARTICLES_LIST_UPDATED);
    },
    async editCustomer(item) {
      this.editId = item.id;
    },
    async deleteCustomer(item) {
      this.customerToDelete = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.customers-list {
  margin-top: 70px;
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
