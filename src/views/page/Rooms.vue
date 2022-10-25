<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex  overflow-hidden">
          <div class="flex">
            <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="search" placeholder="Search..." v-model="search" class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-400 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
            <label for="room" class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <select id="room" name="room" v-model="selectedLocation" class="pr-3 mt-1 block w-full px-3 py-2 bg-zinc-400 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500">
                <option v-for="location in locations" :id="location.id" :value="location">{{ location }}</option>
              </select>
            </label>
          </div>
          <div class="flex mt-4 mr-4">
            <download-room-files />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex">
    <div class="w-screen sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block w-screen sm:px-6 lg:px-8">
        <div class="w-screen">
          <table class="table-fixed">
            <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Session ID
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Start Time
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                End Time
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Location
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Title
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Speaker
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">
                Presentation
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-4 py-2 text-left">

              </th>
            </tr>
            </thead>
            <tbody>
              <tr class="border-b" v-for="presentation in filteredPresentations" :key="presentation.session_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {{ presentation.session_id }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ new Date(presentation.time).getMonth() +1 }}/{{ new Date(presentation.time).getDate() }}/{{ new Date(presentation.time).getFullYear() }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ presentation.location }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ presentation.title }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  {{ presentation.speaker }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span v-if="presentation['powerpoint']">
                    <a
                        class="text-lg"
                        :href="`${api_url}/images/${presentation.powerpoint}`"
                      >
                      {{ presentation.powerpoint }}
                    </a>
                  </span>
                  <span v-else>
                    <upload-presentation :session_id="presentation.session_id" />
                  </span>
                </td>
                <td>
                  <info-presentation :presentation="presentation" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ICONS
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass);

// COMPONENTS
import InfoPresentation from "@/components/modals/InfoPresentation.vue";
import UploadPresentation from "@/components/modals/UploadPresentation.vue";
import DownloadRoomFiles from "@/components/modals/DownloadRoomFiles.vue";


// STORES
import { usePresentationStore } from '@/stores/presentations.js';

const presentationStore = usePresentationStore();
presentationStore.updateDB()

import {ref} from "vue";
import {computed} from "@vue/reactivity";
const api_url = ref(import.meta.env.VITE_API_URL || "");

const timer = setInterval(() => {
  presentationStore.updateDB()
}, 15000)

const search = ref("")
const selectedLocation = ref("")

let presentations = computed(() => presentationStore.getPresentations);
let locations = computed(() => presentationStore.getLocation);

const presentationsInRoom = computed(() => {
  return presentations.value.filter(row => {
    const room = row.location.toLowerCase();
    const roomTerm = selectedLocation.value.toLowerCase();

    return room === roomTerm;
  })
})

const filteredPresentations = computed(() => {
  return presentationsInRoom.value.filter(row => {
    const title = row.title.toLowerCase();
    const speaker = row.speaker.toLowerCase();
    const searchTerm = search.value.toLowerCase();

    return title.includes(searchTerm) ||
        speaker.includes(searchTerm);
  });
})

// presentationStore.getters.getPresentations()

</script>

<style scoped>

</style>