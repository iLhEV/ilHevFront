<template>
  <v-timeline align-top dense>
    <v-timeline-item
      v-for="(item, index) in workPlaces"
      :key="index"
      :color="index % 2 === 1 ? '#546E7A' : '#BCAAA4'"
      small
    >
      <v-row class="pt-1">
        <v-col cols="3">
          <strong>{{ item.date }}</strong>
        </v-col>
        <v-col>
          <strong
            ><a :href="item.link" target="blank">{{ item.name }}</a></strong
          >
          <div class="text-caption">
            {{ item.text }}
          </div>
        </v-col>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import WORK_PLACES from "@/settings/workPlaces";

export default {
  name: "WorkPlacesTab",
  data() {
    return {
      workPlaces: WORK_PLACES,
    };
  },
};
</script>

<style scoped></style>
