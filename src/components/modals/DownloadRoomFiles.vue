<template>
  <button
      @click="openModal"
      class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 ml-2 m-2 mr-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200"
      type="button"
  >
    Download Files
  </button>
  <div
      v-show="isOpen"
      class="
      absolute
      inset-0
      flex
      items-center
      justify-center
      bg-gray-700 bg-opacity-50
    "
  >
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 w-1/3">
      <div class="relative p-4 w-full h-full md:h-auto">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="isOpen = false">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="flex flex-wrap">
          <label for="room" class="text-white">Selection which location you want to download files for</label>
          <select id="room" name="room" v-model="selectedLocation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option v-for="location in locations" :id="location.id" :value="location">{{ location }}</option>
          </select>
        </div>

        <button type="submit" class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200 " @click="downloadFiles">Download</button>
      </div>
    </div>
  </div>
</template>
<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
library.add(faPencil);

//MISC
import { ref } from 'vue';
let isOpen = ref(false);


// STORES
import { usePresentationStore } from '@/stores/presentations.js';
import {computed} from "@vue/reactivity";
const presentationStore = usePresentationStore();

let locations = computed(() => presentationStore.getLocation);
let presentations = computed(() => presentationStore.getPresentations);

let selectedLocation = ref(null)

function openModal(){
  isOpen.value = true;
  window.scrollTo(0,0);
}
import axios from 'axios';
import {notify} from "@kyvg/vue3-notification";
function downloadFiles(){
  notify({
    title: "Compressing presentation files.",
  });
  axios.post(`${import.meta.env.VITE_API_URL}/presentation/pp/`, { location: selectedLocation.value}, { responseType: 'blob',  })
      .then(response => {
        notify({
          title: "Finished Compressing. Downloading zip file...",
        });
        const blob = new Blob([response.data], { type: 'application/zip' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = selectedLocation.value+".zip"
        link.click()
        notify({
          type: "success",
          title: "Done!",
        });
        URL.revokeObjectURL(link.href)
      }).catch((err) => {
        notify({
          type: 'error',
          title: `Error Code: ${err.response.status}`,
          text: err.response.data.error
        });
      })
      .finally(() => {
        isOpen.value = false;
      })
}
</script>