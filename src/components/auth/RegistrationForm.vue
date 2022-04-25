<template>
  <div>
    <v-card-text>
      <v-list class="pt-0">
        <ol>
          <li>
            Add our
            <a href="http://t.me/AuthorizeMySiteBot" target="_blank"
              >telegram bot</a
            >
          </li>
          <li>
            Approve confirmation to open telegram.<br />Then click
            <b>"Start"</b> in the opened telegram window.
          </li>
          <li>
            Bot will send you <b>code</b>.<br />Pass this code in the field
            below and click "Register".
          </li>
        </ol>
        <div class="pt-3">
          <b>Note:</b>To login you will get codes from the same bot.
        </div>
      </v-list>
    </v-card-text>
    <v-card-actions class="justify-end pb-5">
      <v-btn
        @click="closeDialog"
        class="mr-5"
        color="gray"
        width="100"
        depressed
        small
      >
        {{ $lang.BUTTON_CLOSE }}
      </v-btn>
      <v-btn
        :disabled="!valid || !isPassphraseSent"
        color="success"
        class="mr-4"
        @click="checkPassphrase"
        width="100"
        depressed
        small
      >
        {{ $lang.BUTTON_REGISTER }}
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped></style>
