<template>
  <div class="flex flex-col">
    <div class="">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex justify-between overflow-hidden">
          <div class="flex">
            <label class="ml-4 block relative flex items-center text-zinc-300 focus-within:text-emerald-400">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="w-5 h-5 absolute ml-3 mt-1 pointer-events-none" />
              <input type="search" v-model="search" placeholder="Search..." class="pl-10 pr-3 mt-1 block w-full px-3 py-2 bg-zinc-400 border border-zinc-600 rounded-md text-sm text-zinc-300 shadow-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"/>
            </label>
          </div>
          <div class="flex mt-4 mr-4">
            <button
                type="button"
                class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 ml-2 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200"
                @click="downloadCSV"
            >Download CSV</button>
            <download-room-files />
            <upload-sponsors />
            <create-presentation />
            <upload-c-s-v />
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
                Presentation ID
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
                <td class="text-sm text-gray-900 font-light px-6 py-4">
                  <span v-if="presentation['powerpoint']">
                    <a
                        class="text-lg"
                        :href="`${api_url}/images/${presentation.powerpoint}`"
                    >
                      {{ presentation.powerpoint }}
                    </a>
                    <delete-powerpoint :id="presentation.id" />
                  </span>
                  <svg v-else-if="uploading.includes(presentation.id)" class="inline ml-4 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white"/>
                  </svg>
                  <span v-else>
                    <upload-presentation :presentation="presentation" />
                  </span>
                </td>
                <td class="whitespace-nowrap pr-6">
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

// COMPONENTS
import UploadCSV from '@/components/modals/UploadCSV.vue';
import EditPresentation from "@/components/modals/EditPresentation.vue";
import CreatePresentation from "@/components/modals/CreatePresentation.vue";
import DeletePresentation from "@/components/modals/DeletePresentation.vue";
import UploadPresentation from "@/components/modals/UploadPresentation.vue";
import UploadSponsors from "@/components/modals/UploadSponsors.vue";
import DownloadRoomFiles from "@/components/modals/DownloadRoomFiles.vue";
import DeletePowerpoint from "@/components/modals/DeletePowerpoint.vue";


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

let presentations = computed(() => presentationStore.getPresentations);
let uploading = computed(() => presentationStore.getUploading);

function downloadCSV(){
  let csv = 'Presentation ID, Date, Start Time, End Time, Location, Title, Speaker, Presentation\n';
  presentations.value.forEach((pres) => {
    csv += (pres.session_id + ",");
    csv += (`${new Date(pres.time).getMonth() +1 }/${ new Date(pres.time).getDate() }/${ new Date(pres.time).getFullYear()}` + ",");
    csv += (`${ new Date(pres.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }` + ",");
    csv += (`${ new Date(pres.endtime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }` + ",");
    csv += (`"${pres.location}"` + ",");
    csv += (`"${pres.title.replace(`"`, `""`)}"` + ",");
    csv += (`"${pres.speaker.replace(`"`, `""`)}"` + ",");
    csv += ((pres.powerpoint ?? 'N/A') + ",");

    csv += "\n";
  });

  csv.slice(0, -2);
  // console.log(csv);
  const anchor = document.createElement('a');
  anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  anchor.target = '_blank';
  anchor.download = 'Presentations.csv';
  anchor.click();
}


const filteredPresentations = computed(() => {
  return presentations.value.filter(row => {
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