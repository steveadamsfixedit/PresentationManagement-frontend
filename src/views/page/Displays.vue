<template>
  <div v-if="selectedLocation != null">
    <div class="bg-gray-300 p-10">
      <h1 class="text-6xl">Event Title</h1>
      <h2 class="text-2xl">Location</h2>
    </div>
    <div class="bg-gray-200 p-8 pb-2">
      <div v-for="presentation in presentations">
        <font-awesome-icon :icon="['far', 'calendar']" class="w-5 h-5 mr-2 text-gray-600" />
        <span class=" ml-2text-gray-600">{{ presentation.date }}: {{ presentation.time }} - {{ presentation.endtime }}</span>
        <h1 class="ml-8 text-4xl">{{ presentation.title }}</h1>
        <h2 class="ml-8 text-lg text-gray-600">Presented by: {{ presentation.speaker }}</h2>
<!--        {{ presentation }}-->
      </div>
    </div>
  </div>
  <div class="m-10" v-else>
    <h1 class="text-2xl">Select which location this display is at:</h1>
    <br>
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

let presentations = computed(() => presentationStore.getPresentationsAt(selectedLocation))

</script>

<style scoped>
li{
  cursor: pointer;
}
</style>