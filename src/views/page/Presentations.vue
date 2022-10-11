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
          <div class="flex mt-4 w-50 mr-4">
            <button
                @click=""
                class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200 mr-4"
                type="button"
            >
              Create Entry
            </button>
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
                Time
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
            <tr class="border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">8/10/20</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                9:20
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Ballroom 1
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Introduction to VueJS
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Raaj Patel
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Missing!
              </td>
              <td>
                <button
                    @click=""
                    class="text-white font-light focus:ring-4 focus:ring-zinc-800 font-medium rounded-md text-sm px-5 py-2.5 m-2 mx-auto bg-zinc-500 hover:text-emerald-500 hover:bg-zinc-800 hover:border-emerald-500 transition duration-200"
                    type="button"
                >
                  Edit
                </button>
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Jacob
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Thornton
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @fat
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Larry
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Wild
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                @twitter
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

</script>

<style scoped>

</style>