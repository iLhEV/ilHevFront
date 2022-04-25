<template>
  <div>
    <v-card-text class="pt-2">
      <v-form>
        <v-list class="pt-0">
          <ol v-if="!isStarted">
            <li>
              Add our
              <a href="http://t.me/AuthorizeMySiteBot" target="_blank">
                telegram bot
              </a>
              to your telegram.
            </li>
            <li>Approve confirmation to open telegram app/desktop.</li>
            <li>
              Then click
              <b>"Start"</b>
              in the opened telegram window.
            </li>
          </ol>
          <v-btn
            @click="startBot"
            class="mt-4 mb-1"
            :class="isStarted ? 'd-none' : ''"
            color="primary"
            small
            depressed
          >
            {{ $lang.BUTTON_ENTER_REGISTRATION_CODE }}
          </v-btn>
          <ol v-if="isStarted">
            <li>After you clicked "Start", bot sended you a <b>code</b>.</li>
            <li>Pass this code in the field below and click "Register".</li>
          </ol>
          <v-text-field
            v-if="isStarted"
            v-model="regCode"
            maxlength="30"
            :rules="[rules.passPhrase]"
            label="Registration code"
            class="pt-4 mt-0"
            single-line
            required
          ></v-text-field>
          <div v-if="isStarted" class="pt-3">
            <b>Note:</b> To login you will get codes from the same bot.
          </div>
        </v-list>
      </v-form>
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
import RULES from "@/settings/rules";

export default {
  name: "RegistrationForm",
  data() {
    return {
      regCode: "",
      rules: RULES,
      isStarted: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    startBot() {
      this.isStarted = true;
    },
  },
};
</script>

<style scoped></style>
