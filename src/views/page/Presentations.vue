<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex justify-between overflow-hidden">
          <div class="flex">
            <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="search" placeholder="Search..." class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-400 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
          </div>
          <div class="flex mt-4 mr-4">
            <create-presentation />
            <upload-c-s-v />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Start Time
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                End Time
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Location
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Speaker
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Presentation
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">

              </th>
            </tr>
            </thead>
            <tbody>
              <tr class="border-b" v-for="presentation in presentationStore.getPresentations" :key="presentation.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ new Date(presentation.time).getMonth() +1 }}/{{ new Date(presentation.time).getDate() }}/{{ new Date(presentation.time).getFullYear() }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ new Date(presentation.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ new Date(presentation.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ presentation.location }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ presentation.title }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ presentation.speaker }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <span v-if="presentation['powerpoint']">{{ presentation.powerpoint }}</span>
                  <span v-else><upload-presentation :id="presentation.id" /></span>
                </td>
                <td>
                  <edit-presentation :presentation="presentation" />
                  <delete-presentation :id="presentation.id" />
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

import UploadCSV from '@/components/modals/uploadCSV.vue';
import EditPresentation from "@/components/modals/EditPresentation.vue";
import CreatePresentation from "@/components/modals/CreatePresentation.vue";
import DeletePresentation from "@/components/modals/DeletePresentation.vue";
import UploadPresentation from "@/components/modals/UploadPresentation.vue";

// STORES
import { usePresentationStore } from '@/stores/presentations.js';

const presentationStore = usePresentationStore();
presentationStore.updateDB()

// presentationStore.getters.getPresentations()

</script>

<style scoped>

</style>