<template>
  <div v-if="selectedLocation != null">
    <div class="bg-gray-300 p-10">
      <h1 class="text-6xl">Event Title</h1>
      <h2 class="text-2xl">Location</h2>
    </div>
    <div class="bg-gray-200 p-10">
      <div v-for="presentation in presentations">
        {{ presentation }}
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
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass);

import UploadCSV from '@/components/modals/uploadCSV.vue';
import EditPresentation from "@/components/modals/EditPresentation.vue";
import CreatePresentation from "@/components/modals/CreatePresentation.vue";
import DeletePresentation from "@/components/modals/DeletePresentation.vue";
import UploadPresentation from "@/components/modals/UploadPresentation.vue";

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