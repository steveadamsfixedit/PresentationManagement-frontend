<template>
  <button
      @click="openModal"
      class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 ml-2 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200"
      type="button"
  >
    Upload CSV
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
        <div class="py-6 px-6 lg:px-8 text-left">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">Upload CSV</h3>
          <form class="space-y-6">
            <div class="flex justify-center items-center w-full mt-2 mb-2">
              <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span></p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Upload CSV File</p>
                </div>
<!--                <input id="dropzone-file" type="file" ref="file" class="hidden" multiple v-on:change="handleCSVUpload()" accept="text/csv" />-->
                <input id="dropzone-file" type="file" ref="file" class="hidden" multiple accept="text/csv" />
              </label>
            </div>
          </form>
        </div>
        <label for="timezone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a timezone</label>
        <select id="timezone" name="timezone" v-model="timezone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected value="Z">Zulu</option>
          <option value="-04">GMT-04:00</option>
          <option value="-05">GMT-05:00</option>
          <option value="-06">GMT-06:00</option>
          <option value="-07">GMT-07:00</option>
          <option value="-08">GMT-08:00</option>
        </select>
        <div class="text-center m-5 mt-10">
          <button type="button" @click="isOpen = false" class="w-1/3 text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-800 mr-10">Cancel</button>
          <button type="button" @click="handleCSVUpload" class="w-1/3 text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-400 dark:hover:bg-emerald-500 dark:focus:ring-emerald-800">Upload</button>
        </div>
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
const presentationStore = usePresentationStore();

const file = ref(null);
const timezone = ref(null);

function openModal(){
  isOpen.value = true;
  window.scrollTo(0,0);
}

import Papa from 'papaparse';
const handleCSVUpload = async() => {
  Papa.parse(file.value.files[0], {
    complete: async function (results) {
      results.data = results.data.slice(1);
      // console.log(results.data);
      for (const item of results.data) {
        let presentation = {
          session_id: item[0].trim(),
          time: item[4].trim() + "T" + item[5].trim() + timezone.value + ":00",
          endtime: item[4].trim() + "T" + item[6].trim() + timezone.value + ":00",
          location: item[3].trim(),
          title: item[1].trim(),
          description: item[2].trim(),
          speaker: item[7].trim() + " " + item[8].trim()
        };

        for(let i = 10; i <= 19; i+= 3)
        if(item[i].trim() !== ""){
          presentation.speaker += " & " + item[i].trim() + " " + item[i].trim()
        }


        // console.log(presentation);
        await new Promise(resolve => setTimeout(resolve, 20));
        await presentationStore.createPresentation(presentation);
      }
    }
  });

  isOpen.value = false
};
</script>