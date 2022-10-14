<template>
  <div v-if="selectedLocation != null" class="bg-zinc-800 h-screen">
    <div class="grid grid-cols-6 gap-4 mb-16">
      <div class="mt-16 text-white text-right col-span-2 pt-4">
        <h1 class="text-6xl font-light">{{ date.toLocaleTimeString() }}</h1>
        <h2 class="text-4xl font-light text-gray-300 underline">{{ day }}, {{ month }} {{ date.getDate() }}</h2>
      </div>
      <div class="mt-16 text-white text-left col-span-4">
        <h2 class="text-9xl">{{ selectedLocation }}</h2>
      </div>
    </div>
    <div class="mt-8 grid grid-cols-6 gap-x-6 grid-rows-auto" v-for="presentation in presentations" >
      <div class="text-white text-right col-span-2">
        <div class="pt-3" v-if="new Date(presentation.time) < date && new Date(presentation.endtime) > date">
          <h2 class="text-3xl text-emerald-400">In Progress</h2>
          <h3 class="text-2xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
        <div class="pt-3" v-else-if="new Date(presentation.endtime) < date">
          <h2 class="text-3xl text-sky-500">Completed</h2>
          <h3 class="text-2xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
        <div class="pt-6" v-else>
          <h3 class="text-3xl">{{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }} - {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</h3>
        </div>
      </div>
      <div class="text-white text-left col-span-4">
        <h2 class="text-5xl">{{ presentation.title }}</h2>
        <h2 class="text-3xl text-gray-300 font-normal">Presented by: {{ presentation.speaker }}</h2>
      </div>
    </div>
  </div>
  <div class="m-10" v-else>
    <h1 class="text-2xl">Select which location this display is at:</h1>
    <br>
<!--    https://stackoverflow.com/questions/33816596/how-to-make-a-select-image-in-form-->
    <ul>
      <li v-for="location in locations" :id="location.id" class="mt-5 text-xl text-blue-500 underline transition duration-200 hover:-translate-y-2" @click="selectedLocation = location">{{ location }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";

// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
library.add(faCalendar);

// STORES
import { usePresentationStore } from '@/stores/presentations.js';

const presentationStore = usePresentationStore();
presentationStore.updateDB()

let locations = computed(() => presentationStore.getLocation);

import { ref } from 'vue';
let selectedLocation = ref(null)

const date = ref(new Date());
const month = ref(null);
const day = ref(null);

let presentations = computed(() => presentationStore.getPresentationsAt(selectedLocation))


const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}

const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
}


setInterval(() => {
  date.value = new Date()
  day.value = days[date.value.getDay()]
  month.value = months[date.value.getMonth()]
}, 1000)

</script>

<style scoped>
li{
  cursor: pointer;
}
</style>